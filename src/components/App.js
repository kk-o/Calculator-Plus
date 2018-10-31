import React, { Component } from 'react';
import Display from './Display';
import ButtonContainer from './ButtonPanel';
import calculate from '../methods/calculate';
import './App.css';

/** Calculator+
 * - Main app -
 * + Calculator Display
 * + Button Container
 */

class App extends Component {
  constructor(props) {
    super(props);
    // setup initial state
    this.state = {
      total: null,
      next: null,
      operation: null,
    };
}

  // handle button presses and adds them to the state
  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };
  
  // Display: outputs the result of operations performed by the user 
  // ButtonContainer: receives numbers and operations from user
  render() {
    return (
      <div className="app">
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonContainer clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
