import React, { useEffect, useState } from 'react';
import classes from './App.module.css';

import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api/index';

import coronaImage from './images/covid-19.png';

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData({ ...fetchedData });
      setLoading(false);
    };
    getData();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setData({ ...fetchedData });
    setCountry(country);
  };

  return (
    <div className={classes.container}>
      <img src={coronaImage} className={classes.image} alt='COVID-19' />
      {!loading ? <Cards data={data} /> : <div>loading...</div>}
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
