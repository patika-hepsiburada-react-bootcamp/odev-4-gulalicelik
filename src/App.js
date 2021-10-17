import './App.css';
import Home from './Pages/Home/';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import video from './1.mp4';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://graphql-weather-api.herokuapp.com/',
  });

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <div className="bg">
          <video autoPlay muted loop id="bgVideo">
            <source src={video} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div className="layout">
          <Home />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
