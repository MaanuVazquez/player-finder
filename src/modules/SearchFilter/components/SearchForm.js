// @flow
import React from 'react'
import {connect, type MapDispatchToProps} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormGroup, ControlLabel, FormControl, Col, Button} from 'react-bootstrap'
import NameInput from './NameInput'
import AgeInput from './AgeInput'
import {submitFilter} from '../actions'
import {POSITIONS} from '../constants'
import PlayerList from '../../PlayerList'

type Props = {
  submitFilter: (age: string, position: PlayerList.model.Position, name: string) => any
}

type State = {
  age: string,
  name: string,
  position: PlayerList.model.Position | ''
}

export class SearchForm extends React.Component<Props, State> {
  state = {
    age: '',
    position: '',
    name: ''
  }

  renderPositions = () =>
    POSITIONS.map(position => (
      <option key={position} value={position}>
        {position}
      </option>
    ))

  onFormSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault()
    const {age, position, name} = this.state
    this.props.submitFilter(age, position, name)
  }

  onNameChange = (name: string) => {
    this.setState({name})
  }

  onAgeChange = (age: string) => {
    this.setState({age})
  }

  onPositionChange = (e: SyntheticInputEvent<*>) => {
    const position: PlayerList.model.Position = (e.target.value: any)
    this.setState({position})
  }

  render() {
    const {age, position, name} = this.state
    return (
      <form onSubmit={this.onFormSubmit}>
        <Col sm={12} md={4}>
          <FormGroup controlId='player-name'>
            <ControlLabel>Player Name</ControlLabel>
            <NameInput
              id='player-name'
              name='player-name'
              type='text'
              placeholder='Marcos Rojo'
              value={name}
              onChange={this.onNameChange}/>
          </FormGroup>
        </Col>
        <Col sm={12} md={4}>
          <FormGroup controlId='player-position'>
            <ControlLabel>Player Position</ControlLabel>
            <FormControl componentClass='select' placeholder='select' onChange={this.onPositionChange} value={position}>
              <option value=''>All</option>
              {this.renderPositions()}
            </FormControl>
          </FormGroup>
        </Col>
        <Col sm={8} md={2}>
          <FormGroup controlId='player-age'>
            <ControlLabel>Player Age</ControlLabel>
            <AgeInput
              id='player-age'
              name='player-age'
              placeholder='From 18 to 40'
              minAge='18'
              maxAge='40'
              value={age}
              onChange={this.onAgeChange}
              maxLength='2'/>
          </FormGroup>
        </Col>
        <Col sm={4} md={2}>
          <ControlLabel>Submit search</ControlLabel>
          <Button bsStyle='success' block type='submit'>
            Search
          </Button>
        </Col>
      </form>
    )
  }
}

const mapDispatchToProps: MapDispatchToProps<*, *, *> = dispatch =>
  bindActionCreators(
    {
      submitFilter
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(SearchForm)
