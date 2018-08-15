import React from 'react';

const Joke = (props) => {
  return (
    <div>
       <div>
          <p>{props.joke.title}</p>
          <p>{props.joke.description}</p>
        </div>
    </div>
  );
};

export default Joke;