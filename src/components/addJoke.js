import React, { Component } from 'react';

class addJoke extends Component {
  state = {
    error: ''
  }

  onFormSubmit  = (event) => {
    event.preventDefault();
  
    const title = event.target.elements.title.value.trim();
    const description = event.target.elements.description.value.trim();
    const error = this.props.addJoke(title);
    this.setState(() => ({error}));
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onFormSubmit}>
          <input type="text" name="title" onChange={this.props.changeName} />
          <input type="text" name="description" onChange={this.props.changeDescription} />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

export default addJoke;