// @flow
import React from 'react'
import {connect, type MapStateToProps} from 'react-redux'
import {Table, Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner, faTimesCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import type {Player, State as Props} from '../../model'
import {playerSelector} from '../../selectors'
import {getAge} from '../../../../utils'
import styles from './styles.css'

export class PlayerTable extends React.Component<Props> {
  renderPlayers = () =>
    this.props.playerList.map(({name, position, nationality, dateOfBirth}: Player) => (
      <tr key={name}>
        <td>{name}</td>
        <td>{position}</td>
        <td>{nationality}</td>
        <td>{getAge(dateOfBirth)}</td>
      </tr>
    ))

  renderLoading = () => (
    <div className={styles.messageDiv}>
      <FontAwesomeIcon icon={faSpinner} color='#5cb85c' spin size='10x'/>
      <p>Loading players...</p>
    </div>
  )

  renderError = () => {
    const {errorMessage} = this.props
    return (
      <div className={styles.messageDiv}>
        <FontAwesomeIcon icon={faTimesCircle} color='red' size='10x'/>
        <p>Oops! there was an error {errorMessage}</p>
      </div>
    )
  }

  renderEmpty = () => (
    <div className={styles.messageDiv}>
      <FontAwesomeIcon icon={faExclamationCircle} color='#FFD51D' size='10x'/>
      <p>Nothing found with those filters!</p>
    </div>
  )

  render() {
    const {loading, error, playerList} = this.props

    if (loading) return this.renderLoading()
    if (error) return this.renderError()
    if (!playerList.length) return this.renderEmpty()

    return (
      <Col md={12}>
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers()}</tbody>
        </Table>
      </Col>
    )
  }
}

const mapStateToProps: MapStateToProps<*, *, *> = state => {
  const {error, loading, errorMessage} = state.playerTable
  return {
    loading,
    error,
    playerList: playerSelector(state),
    errorMessage
  }
}

export default connect(mapStateToProps)(PlayerTable)
