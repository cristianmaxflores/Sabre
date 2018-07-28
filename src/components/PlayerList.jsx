import React from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Form, Header, Table } from 'semantic-ui-react'

const options = [
  { key: '0', text: 'Attacking Midfield', value: '0' },
  { key: '1', text: 'Central Midfield', value: '1' },
  { key: '2', text: 'Centre-Back', value: '2' },
  { key: '3', text: 'Centre-Forward', value: '3' },
  { key: '4', text: 'Defensive Midfield', value: '4' },
  { key: '5', text: 'Keeper', value: '5' },
  { key: '6', text: 'Left Midfield', value: '6' },
  { key: '7', text: 'Left Wing', value: '7' },
  { key: '8', text: 'Left-Back', value: '8' },
  { key: '9', text: 'Right-Back', value: '9' },
]

class PlayerList extends React.Component {

  constructor() {
    super()
    this.state = {}
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
    console.log(this.props)
    const { players } = this.props.PlayerComponent
    return (
      <Container>
        <Segment>
          <Header>Football Player Finder</Header>
          <Form>
            <Form.Group widths='equal' inline>
              <Form.Input pattern="[ A-Za-z]+" title="Invalid Characters." fluid placeholder='Player Name' />
              <Form.Select fluid options={options} placeholder='Position' />
              <Form.Input type="number" min="18" max="40" fluid placeholder='Age' />
              <Form.Button>Search</Form.Button>
            </Form.Group>
          </Form>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
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
              {players.map((player, index) =>
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

function mapStateToProps(state) {
  const { PlayerComponent } = state;
  return {
    PlayerComponent
  };
}
const connectedPlayerList = connect(mapStateToProps)(PlayerList);
export { connectedPlayerList as PlayerList };