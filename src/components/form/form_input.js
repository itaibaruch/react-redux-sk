import React, { Component } from 'react';

export class FormInput extends Component {
  render() {
    const props = this.props;
    return (
      <div className={`form-group ${ props.touched && props.invalid ? 'has-danger' : ''}`}>
        <label>{this.props.label}</label>
        <input type='text' className='form-control' {...props} />
        <div className='text-help'>
          { props.touched ? props.error : '' }
        </div>
      </div>
    )
  }
}

export class FormTextarea extends Component {
  render() {
    const props = this.props;
    return (
      <div className={`form-group ${ props.touched && props.invalid ? 'has-danger' : ''}`}>
        <label>{this.props.label}</label>
        <textarea className='form-control' {...props} />
        <div className='text-help'>
          { props.touched ? props.error : '' }
        </div>
      </div>
    )
  }
}