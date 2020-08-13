import React, {useState, useEffect} from 'react'
import numeral from "numeral"
import {MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import {sortData, prettyPrintStat} from './util'
import './Styles/App.css'
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([])
  const [country, setInputCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(2)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases");

  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          const sortedData = sortData(data)
          setMapCountries(data)
          setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async(e) =>{
    const countryCode = e.target.value;
    setInputCountry(countryCode)
    const url = countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url) 
    .then(response => response.json())
    .then(data => {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4)
      setInputCountry(countryCode)
      setCountryInfo(data)
    })
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1> COVID-19 Worldwide</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
            isRed
            onClick={e => setCasesType('cases')}
            active={casesType === 'cases'}
            title="COVID-19 cases" 
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={numeral(countryInfo.cases).format("0,0")}/>
          <InfoBox 
            isBlue
            onClick={e => setCasesType('recovered')}
            active={casesType === 'recovered'} 
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={numeral(countryInfo.recovered).format("0,0")}/>
          <InfoBox
            isBlack 
            onClick={e => setCasesType('deaths')} 
            active={casesType === 'deaths'} 
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={numeral(countryInfo.deaths).format("0,0")}/>
        </div>
        <Map 
          casesType={casesType}
          countries={mapCountries} 
          center={mapCenter} 
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App
