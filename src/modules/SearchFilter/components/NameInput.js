// @flow
import React from 'react'
import {FormControl} from 'react-bootstrap'

type Props = {
  onChange: string => void,
  value: string
}

export default class NameInput extends React.Component<Props> {
  onInputChange = ({target: {value}}: SyntheticInputEvent<*>) => {
    if (/^[A-z ]*$/.test(value)) this.props.onChange(value)
  }

  render() {
    return <FormControl {...this.props} type='text' onChange={this.onInputChange}/>
  }
}
