import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import endpoint from './endpoint';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterList from './CharacterList';
import dummyData from './dummy-data';
import './styles.scss';

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // we can't make this function in useEffect async
  React.useEffect(() => {
    // settings all the states
    setLoading(true);
    setResponse(null);
    setError(null);

    const fetchUrl = async () => {
      try {
        const reponse = await fetch(url);
        const data = await reponse.json();
        setResponse(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // calling the function
    fetchUrl();

    // fetch(endpoint + '/characters')
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setLoading(false);
    //     setResponse(response);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     setError(error);
    //   });
  }, []);

  return [response, loading, error];
};

const Application = () => {
  const [response, loading, error] = useFetch(endpoint + '/characters');

  const characters = (response && response.characters) || [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className="error">{error.message} </p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
