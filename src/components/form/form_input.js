import React, { Component } from 'react';

export class FormInput extends Component {
  render() {
    const props = this.props;
    return (
      <div className={`form-group ${ props.touched && props.invalid ? 'has-error' : ''}`}>
        <label>{this.props.label}</label>
        <input type='text' className='form-control' {...props} />
        <div className='help-block'>
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
      <div className={`form-group ${ props.touched && props.invalid ? 'has-error' : ''}`}>
        <label>{this.props.label}</label>
        <textarea className='form-control' {...props} />
        <div className='help-block'>
          { props.touched ? props.error : '' }
        </div>
      </div>
    )
  }
}