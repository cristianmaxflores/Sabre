import React from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Form, Header, Table } from 'semantic-ui-react'
import PlayerListprops from '../../PlayerList'
const { selectors, actions, constants } = PlayerListprops

class PlayerList extends React.Component {

  constructor() {
    super()
    this.state = { playername: "", position: "", age: "" }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleFetch = () => {
    const { playername, position, age } = this.state
    const { dispatch, loading } = this.props
    const functionGetAge = this.getAge
    const params = { playername, position, age, functionGetAge }
    console.log("fetching!")
    if (!loading)
      dispatch(actions.fetchPlayers(params))
    else
      console.log("still fetching!")
  }

  getAge = (dateOfBirth) => {
    let today = new Date()
    let player = new Date(dateOfBirth)
    let age = today.getUTCFullYear() - player.getUTCFullYear()
    if (today.getUTCMonth() > player.getUTCMonth())
      return age
    else if (today.getUTCMonth() < player.getUTCMonth())
      return age - 1
    else if (today.getUTCDate() >= player.getUTCDate())
      return age
    else
      return age - 1
  }

  render() {
    const { error, loading, fetchedPlayers } = this.props
    const { playername, age } = this.state
    return (
      <Container>
        <Segment>
          <Header>Football Player Finder</Header>
          <Form onSubmit={this.handleFetch}>
            <Form.Group widths='equal' inline>
              <Form.Input name="playername" value={playername} onChange={this.handleChange} pattern="[ A-Za-z]+" title="Invalid Characters." fluid placeholder='Player Name' />
              <Form.Select name="position" onChange={this.handleChange} fluid options={constants.FormPlayersPositions} placeholder='Position' />
              <Form.Input name="age" value={age} onChange={this.handleChange} type="number" min="18" max="40" fluid placeholder='Age' />
              <Form.Button loading={loading} type='submit'>Search</Form.Button>
            </Form.Group>
          </Form>
          <Table celled striped>
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell colSpan='4'>Player List</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell content='Player' />
                <Table.HeaderCell content='Position' />
                <Table.HeaderCell content='Nationality' />
                <Table.HeaderCell content='Age' />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {error && <Table.Cell error colSpan='4'>Error Fetching Players!</Table.Cell>}
              {fetchedPlayers.map((player, index) =>
                <Table.Row key={index} >
                  <Table.Cell content={player.name} />
                  <Table.Cell content={player.position} />
                  <Table.Cell content={player.nationality} />
                  <Table.Cell content={this.getAge(player.dateOfBirth)} />
                </Table.Row >
              )}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    )
  }
}

function mapStateToProps(store) {
  return {
    fetchedPlayers: selectors.getPlayersState(store),
    error: selectors.getErrorState(store),
    loading: selectors.getLoadingState(store)
  };
}
const connectedPlayerList = connect(mapStateToProps)(PlayerList);
export { connectedPlayerList as PlayerList };