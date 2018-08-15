import React, { Component } from 'react';
import './App.css';
import AddJoke from '../components/addJoke';

class App extends Component {
  state = {
    jokes: [
      {id: 1, title: 'Blonde in desert', description: 'A blonde, a redhead, and a brunette were all lost in the desert. They found a lamp and rubbed it. A genie popped out and granted them each one wish. The redhead wished to be back home. Poof! She was back home. The brunette wished to be at home with her family. Poof! She was back home with her family. The blonde said, "Awwww, I wish my friends were here."'},
      {id: 2, title: 'Blonde seller', description: 'A robber comes into the store & steals a TV. A blonde runs after him and says, "Wait, you forgot the remote!"'}
    ]
  }

  addJoke = (joke) => {
    console.log('joke', joke);
   if(!joke) {
     return 'Enter valid value!'
   }
   this.setState((prevState) => ({jokes: prevState.jokes.concat(joke)}))
  };
  
  render() {
    const jokes = [...this.state.jokes]
    const viewJokes = jokes.map((joke) => {
      return (
       
      )
    })
    return (
      <div className="App">
        {viewJokes}
        <AddJoke addJoke={this.addJoke} />
      </div>
    );
  }
}

export default App;
