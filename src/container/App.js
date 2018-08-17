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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          rows: 4,
          placeholder: 'Your Joke'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      }
    },
    formIsValid: false
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

  deleteJoke = (jokeToDelete) => {
    this.setState((prevState) => ({
      jokes: prevState.jokes.filter((joke) => {
        return jokeToDelete !== joke;
      })
    }))
  }

  deleteAllJokes = () => {
    this.setState(() => ({ jokes: [] }))
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
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedJokeForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedJokeForm) {
      // if both are true, the
      formIsValid = updatedJokeForm[inputIdentifier].valid && formIsValid;
      // console.log(updatedJokeForm);
    }

    this.setState(() => ({
      jokesForm: updatedJokeForm,
      formIsValid: formIsValid
    }));
    
  }

  checkValidity = (value, rules) => {

    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("jokes");
      const jokes = JSON.parse(json);

      if(jokes) {
        this.setState(() => ({ jokes }));
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jokes.length !== this.state.jokes.length) {
      const json = JSON.stringify(this.state.jokes);
      localStorage.setItem('jokes', json);
      prevState.jokes.title = '';
   }
  }

  render() {
    const jokes = [...this.state.jokes]
    const viewJokes = jokes.map((joke) => {
      return (
        <div key={joke.title}>
          <div>
            <p>{joke.title}</p>
            <p>{joke.description}</p>
            <button onClick={() => this.deleteJoke(joke)}>Delete Joke</button>
          </div>
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
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
      <Button btnType="Success" disabled={!this.state.formIsValid}> Add Joke </Button>
      </form>;
    return (
      <div className={classes.FormData}>
        {form}
        {viewJokes}
        <button onClick={this.deleteAllJokes}>Delete All Jokes</button>
      </div>
    );
  }
}

export default App;
