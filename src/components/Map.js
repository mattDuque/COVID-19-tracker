import React from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import {Card} from '@material-ui/core'
import './Styles/Map.css'
import numeral from "numeral"
import { Circle, Popup } from "react-leaflet"
import {casesTypeColors} from '../util'

function Map({countries, casesType, center, zoom}) {

	const showDataOnMap = (data, casesType = 'cases') =>(
		data.map(country =>(
		  <Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			color={casesTypeColors[casesType].hex}
			fillColor={casesTypeColors[casesType].hex}
			fillOpacity={0.4}
			radius={
			  Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
			}
		  >
			<Popup>
			  <div>
			  	<div className="info-name">{country.country}</div>
				<div
				  className="info-flag"
				  style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
				/>
				<br/>
				<div className="info-confirmed">
				  Cases: {numeral(country.cases).format("0,0")}
				</div>
				<div className="info-recovered">
				  Recovered: {numeral(country.recovered).format("0,0")}
				</div>
				<div className="info-deaths">
				  Deaths: {numeral(country.deaths).format("0,0")}
				</div>
			  </div>
			</Popup>
		  </Circle>
		))
	  )

	return (
		<Card className="map">
			<LeafletMap center={center} zoom={zoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'>
				</TileLayer>
				{showDataOnMap(countries, casesType)}
			</LeafletMap>
		</Card>
	)
}
export default Map