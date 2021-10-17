import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../../graphql/Queries';
import { cities } from '../../cities';
import slugify from 'slugify';
import '../../App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import kelvinToCelsius from 'kelvin-to-celsius';

function Home() {
  const [first, setfirst] = useState(true);
  const [citySearched, setCitySearched] = useState('malatya');
  const [getWeather, { data, error, loading }] = useLazyQuery(
    GET_WEATHER_QUERY,
    {
      variables: { name: citySearched },
    }
  );

  if (error) return <h1> Error found</h1>;

  const handleChange = e => {
    setfirst(false);
    console.log(e.target.value);
    setCitySearched(slugify(e.target.value));
    getWeather();
  };
  console.log(data);

  return (
    <div className="home">
      <div className="content">
        <h1 className="title">Weather App</h1>
        <div class="select">
          <select id="cities" name="cities" onChange={handleChange}>
            <option value="">Select city</option>
            {cities.map(city => {
              return (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="weather">
          {loading ? (
            <Loader
              type="ThreeDots"
              color="#212121"
              height={100}
              width={100}
              timeout={1000}
            />
          ) : first ? (
            'Hey Siri! Bu gün hava nasıl olacak ? Dur orası burası değildi. '
          ) : (
            <div className="result">
              <div className="top">
                <h2 className="city-name"> {data.getCityByName.name} </h2>
                <img
                  src={`http://openweathermap.org/img/wn/${data.getCityByName.weather.summary.icon}@2x.png`}
                  alt=""
                />
              </div>

              <div className="temp fl">
                <h2 className="city-temp">Heat :</h2>
                <h2 className="rs">
                  {kelvinToCelsius(
                    data.getCityByName.weather.temperature.actual
                  ).toFixed(1)}
                  <span>&#8451;</span>
                </h2>
              </div>
              <div className="dsc fl">
                <h2>Description :</h2>
                <h2 className="rs">
                  {' '}
                  {data.getCityByName.weather.summary.description.toUpperCase()}
                </h2>
              </div>
              <div className="wnd fl">
                <h2>Wind Speed : </h2>
                <h2 className="rs">{data.getCityByName.weather.wind.speed}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
