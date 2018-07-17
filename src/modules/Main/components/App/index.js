// @flow
import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import {connect, type MapDispatchToProps} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFutbol} from '@fortawesome/free-solid-svg-icons'
import SearchFilter from '../../../SearchFilter'
import PlayerList from '../../../PlayerList'
import './styles.css'

const {SearchForm} = SearchFilter.components
const {PlayerTable} = PlayerList.components

type Props = {
  playerListFetch: () => any
}

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.playerListFetch()
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h1>
              Football Player Finder <FontAwesomeIcon icon={faFutbol}/>
            </h1>
            <Row>
              <SearchForm/>
            </Row>
            <Row>
              <PlayerTable/>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapDispatchToProps: MapDispatchToProps<*, *, Props> = dispatch =>
  bindActionCreators(
    {
      playerListFetch: PlayerList.actions.playerListFetch
    },
    dispatch
  )
export default connect(
  null,
  mapDispatchToProps
)(App)
