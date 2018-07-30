import React from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Form, Header, Table } from 'semantic-ui-react'
import { playerListActions } from '../playerList.actions'
import { getPlayersState, getStatusState, getLoadingState } from '../playerList.reducer'

const options = [
  { key: '0', text: 'Position', value: '' },
  { key: '1', text: 'Attacking Midfield', value: 'Attacking Midfield' },
  { key: '2', text: 'Central Midfield', value: 'Central Midfield' },
  { key: '3', text: 'Centre-Back', value: 'Centre-Back' },
  { key: '4', text: 'Centre-Forward', value: 'Centre-Forward' },
  { key: '5', text: 'Defensive Midfield', value: 'Defensive Midfield' },
  { key: '6', text: 'Keeper', value: 'Keeper' },
  { key: '7', text: 'Left Midfield', value: 'Left Midfield' },
  { key: '8', text: 'Left Wing', value: 'Left Wing' },
  { key: '9', text: 'Left-Back', value: 'Left-Back' },
  { key: '10', text: 'Right-Back', value: 'Right-Back' },
]

class PlayerList extends React.Component {

  constructor() {
    super()
    this.state = { playername: "", position: "", age: "" }//, arrayOfPlayers: [] }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleFetch = () => {
    const { playername, position, age } = this.state
    const { dispatch, loading } = this.props
    const functionGetAge = this.getAge
    const params = { playername, position, age, functionGetAge }
    console.log("fetching!")
    if (!loading)
      dispatch(playerListActions.fetchPlayers(params))
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

  // handleSubmit = () => {
  //   //return console.log(this.props)
  //   const { playername, position, age } = this.state
  //   const { fetchedPlayers } = this.props
  //   if (age === "" && position === "" && playername === "") {
  //     console.log("wrong values! getting all players!")
  //     return this.setState({ arrayOfPlayers: fetchedPlayers })
  //   }
  //   var newArrayOfPlayers = fetchedPlayers
  //   if (age !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (this.getAge(player.dateOfBirth).toString() === age)) }
  //   if (position !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (player.position === position)) }
  //   if (playername !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (player.name.includes(playername))) }
  //   this.setState({ arrayOfPlayers: newArrayOfPlayers })
  //   return console.log(newArrayOfPlayers)
  // }

  // fetchPlayers = () => {
  //   const { dispatch } = this.props;
  //   console.log("fetching!")
  //   dispatch(playerListActions.fetchPlayers())
  // }

  // componentWillMount() {
  //   this.fetchPlayers()
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log("nextProps")
  //   console.log(nextProps)
  //   if (nextProps.fetchedPlayers.length !== 0 && this.props.fetchedPlayers.length === 0) {
  //     console.log("updating players")
  //     this.setState({ arrayOfPlayers: nextProps.fetchedPlayers })
  //   }
  // }

  render() {
    const { status, loading, fetchedPlayers } = this.props
    const { playername, age } = this.state
    return (
      <Container>
        <Segment>
          <Header>Football Player Finder</Header>
          <Form onSubmit={this.handleFetch}>
            <Form.Group widths='equal' inline>
              <Form.Input name="playername" value={playername} onChange={this.handleChange} pattern="[ A-Za-z]+" title="Invalid Characters." fluid placeholder='Player Name' />
              <Form.Select name="position" onChange={this.handleChange} fluid options={options} placeholder='Position' />
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
              {status && <Table.Cell error colSpan='4'>Error Fetching Players!</Table.Cell>}
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
    fetchedPlayers: getPlayersState(store),
    status: getStatusState(store),
    loading: getLoadingState(store)
  };
}
const connectedPlayerList = connect(mapStateToProps)(PlayerList);
export { connectedPlayerList as PlayerList };