import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      all_options: [
        {id: 1, value: 'option'},
        {id: 2, value: 'choice'},
        {id: 3, value: 'pick'},
        {id: 4, value: 'draw'},
        {id: 5, value: 'selection'},
      ],
      searched_options: [],
      selected: {},
      display: '',
      search: ''
    };
  }

  toggleOption = () => {
    this.setState({ open: !this.state.open });
  };

  handleClick = (e) => {
    const selected = { ...this.state.selected };
    const id = e.target.id;
    selected[id] ? delete selected[id] : selected[id] = e.target.value
    this.setState({selected});
    this.printOptions(Object.values(selected));
  };

  handleClickAll = (options) => {
    const selected = this.state.selected;
    options.forEach((option) => {
      selected[option.id] = option.value;
    });
    this.printOptions(Object.values(selected));
  };

  clearAll = () => {
    this.setState({ selected: {}, display: '' });
  };

  printOptions = (values) => {
    var temp = values.join(', ');
    this.setState({ display: temp });
  };

  handleChange = (e) => {
    if (e.target.value.trim().length) this.setState({ open: true });
    var searched = [];
    this.state.all_options.map((option) => {
      if (option.value.indexOf(e.target.value) >= 0) {
        searched.push({ id: option.id, value: option.value });
      }
    });
    if (!searched.length) this.setState({ open: false });
    this.setState({ search: e.target.value, searched_options: searched });
  };

  render() {
    const { selected, open } = this.state;
    return (
      <div className='border'>
        <input
          className='search'
          type="text"
          placeholder="Search for options"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <br />
        <div className='display'>
          {Object.keys(selected).length ? this.state.display : 'Select options'}
          <span 
            className='button' 
            onClick={this.toggleOption}
          > 
            &#9662; &nbsp;
          </span>

          {!!Object.keys(selected).length && 
            <span 
              className='button' 
              onClick={this.clearAll}
            > 
              &times; &nbsp;
            </span>
          }
        </div>
        {open && 
          <Option 
            all_options={this.state.all_options}
            searched_options={this.state.searched_options}
            selected={this.state.selected}
            handleClick={this.handleClick.bind(this)}
            handleClickAll={this.handleClickAll.bind(this)}
          />
        }
      </div>
    );
  }
}

class Option extends Component {
  render() {
    const { searched_options, all_options, selected, handleClickAll } = this.props;
    const options = this.props.searched_options.length ? searched_options : all_options

    return (
      <div className='options'>
        {options.map((option, i) => (
          <div className='option'>
            <input 
              type='checkbox' 
              key={i}
              id={option.id}
              value={option.value} 
              onClick={(e) => this.props.handleClick(e)}
              checked={Object.values(selected).indexOf(option.value) >= 0}
            />
            {option.value}
          </div>
        ))}
        <br />
        <div
          className="clickAll"
          onClick={handleClickAll.bind(this, options)}
        >
          Select All
        </div>
      </div>
    );
  }
}
