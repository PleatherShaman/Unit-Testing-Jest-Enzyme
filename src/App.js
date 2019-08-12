import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: false
    };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    const { counter, error } = this.state;
    if (counter === 0) {
      this.setState({ ...this.state, error: !error });
    } else {
      this.setState({ ...this.state, counter: counter - 1 });
    }
  }

  handleIncrement() {
    const { counter, error } = this.state;
    this.setState({ counter: counter + 1, error: false });
  }

  render() {
    const { counter, error } = this.state;

    return (
      <div data-test="app">
        <h1 data-test="counter-display">The counter is currently {counter} </h1>
        <button data-test="increment-button" onClick={this.handleIncrement}>
          Increment button
        </button>

        <button data-test="decrement-button" onClick={this.handleDecrement}>
          Decrement Button
        </button>

        {error && <p data-test="error-message">There count cannot go past 0</p>}
      </div>
    );
  }
}

export default App;
