// @flow
import React from 'react'
import {FormControl} from 'react-bootstrap'

type Props = {
  maxAge: string,
  minAge: string,
  onChange: string => void,
  value: string
}

export default class AgeInput extends React.Component<Props> {
  onAgeInputChange = ({target: {value}}: SyntheticInputEvent<*>) => {
    if (/^[0-9]*$/.test(value)) this.props.onChange(value)
  }

  onAgeInputBlur = () => {
    const {value, onChange, minAge, maxAge} = this.props
    if (!value) return
    if (Number(value > maxAge)) onChange(maxAge)
    if (Number(value < minAge)) onChange(minAge)
  }

  render() {
    // eslint-disable-next-line
    const {maxAge, minAge, ...restProps} = this.props
    return <FormControl {...restProps} type='text' onChange={this.onAgeInputChange} onBlur={this.onAgeInputBlur}/>
  }
}
