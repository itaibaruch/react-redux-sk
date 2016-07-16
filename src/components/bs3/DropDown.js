import React, { Component } from 'react';

export class DropDownBtn extends Component {
  render() {
    return <button onClick={this.props.whenClicked} className={'btn ' + this.props.className} type='button'>
      {this.props.title}
      <span className={this.props.subTitleClassName} style={{marginLeft: 5}}>{this.props.subTitle}</span>
    </button>
  }
};

export class DropDownItem extends Component{
  handleClick() {
    this.props.whenItemClicked(this.props.item);
  }
  render() {
    return <li className={this.props.className}>
      <a onClick={this.handleClick.bind(this)}>{this.props.item}</a>
    </li>
  }
};

export class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      itemTitle: ''
    }
    this.renderDropDownItem = this.renderDropDownItem.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({open: !this.state.open});
  }
  handleItemClick(item) {
    this.setState({
      open: false,
      itemTitle: item
    });
  }
  renderDropDownItem(item, index) {
    return (
      <DropDownItem
        key={index}
        item={item}
        whenItemClicked={this.handleItemClick}
        className={this.state.itemTitle === item ? 'active' : '' }
        />
    )
  }
  render() {
    const list = this.props.items.map(this.renderDropDownItem);

    return (
      <div className='dropdown'>
        <DropDownBtn
          whenClicked={this.handleClick}
          className='btn-default'
          title={this.state.itemTitle || this.props.title}
          subTitleClassName='caret'
          />
        <ul className={'dropdown-menu ' + (this.state.open ? 'show' : '') }>
          {list}
        </ul>
      </div>
    )
  }
}
