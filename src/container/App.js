import React, { Component } from 'react';
import classes from './App.scss';
import Input from "../components/Input";
import Button from '../components/Button';

class App extends Component {
  state = {
    jokes: [
      {title: 'Blonde in desert', description: 'A blonde, a redhead, and a brunette were all lost in the desert. They found a lamp and rubbed it. A genie popped out and granted them each one wish. The redhead wished to be back home. Poof! She was back home. The brunette wished to be at home with her family. Poof! She was back home with her family. The blonde said, "Awwww, I wish my friends were here."'},
      {title: 'Blonde seller', description: 'A robber comes into the store & steals a TV. A blonde runs after him and says, "Wait, you forgot the remote!"'}
    ],
    jokesForm: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Joke Title'
        },
        value: ''
      },
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Joke'
        },
        value: ''
      },
    }
  }

  // addJoke = (joke) => {
  //   console.log('joke', joke);
  //  if(!joke) {
  //    return 'Enter valid value!'
  //  }
  //  this.setState((prevState) => ({jokes: prevState.jokes.concat(joke)}))
  // };

  addJokeHandler = (event) => {
    event.preventDefault();

    // const joke = {
    //   title: this.state.jokesForm.title.value,
    //   description: this.state.jokesForm.description.value
    // }

    const formData = {};
    for (let formElementIdentifier in this.state.jokesForm) {
      formData[formElementIdentifier] = this.state.jokesForm[formElementIdentifier].value;
    }

    this.setState((prevState) => {
      return { jokes: prevState.jokes.concat(formData) }})
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedJokeForm = {
      ...this.state.jokesForm
    }
    const updatedFormElement = {
      // copy deeper, inputIdentifier is key: mane, street, etc
      ...updatedJokeForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedJokeForm[inputIdentifier] = updatedFormElement;

    this.setState(() => ({ jokesForm: updatedJokeForm }));
  }

  render() {
    const jokes = [...this.state.jokes]
    const viewJokes = jokes.map((joke) => {
      return (
        <div key={joke.title}>
          <p>{joke.title}</p>
          <p>{joke.description}</p>
       </div>
      )
    })

    const formElementsArray = [];
    for(let key in this.state.jokesForm) {
      formElementsArray.push({
        id: key,
        config: this.state.jokesForm[key]
      })
    }
    let form = <form onSubmit={this.addJokeHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success"> Add Joke </Button>
      </form>;
    return (
      <div className={classes.FormData}>
        {form}
        {viewJokes}
      </div>
    );
  }
}

export default App;
