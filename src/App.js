import React, { useState, useEffect } from 'react';
import "./App.css"
import {
  FormControl, MenuItem, Select, Card, CardContent
} from "@material-ui/core";
import Infobox from "./Infobox"
import Table from './Table';
import { sortData } from "./util";
import LineGraph from "./LineGraph"
import Map from "./Map.js"


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,

          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);

        })
    }

    getCountriesData();
  }, [])




  const onCountryChange = async (event) => {
    const value = event.target.value;

    const url = value === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${value}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {

        setCountry(value);

        setCountryInfo(data)

        setMapCenter([data.countryInfo.lat, data.countryInfo.long])

      }
      )
  }

  return (
    <div className="app">
      <div className="app__left">

        <div className="app__header">

          <h1>Covid-19 Tracker </h1>
          <FormControl className="app__dropdown">
            <Select className="app_header"
              variant="outlined"
              value={country}
              onChange={onCountryChange}

            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">

          <Infobox onClick={e => setCasesType("cases")} title="CoronaVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></Infobox>
          <Infobox onClick={e => setCasesType("recovered")} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></Infobox>
          <Infobox onClick={e => setCasesType("deaths")} title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></Infobox>
        </div>
        <div>
          <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={4} />
        </div>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h1>total cases</h1>
            <Table data={tableData} />
            <h1>WorldWide cases</h1>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>






      </div>



    </div>



  );
}

export default App;
