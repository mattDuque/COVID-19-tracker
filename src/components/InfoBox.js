import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './Styles/InfoBox.css'

function InfoBox({title, cases, total, active, isRed, isBlue, isBlack, ...props}) {
	const textColor = () =>{
		if(active){
			if(isRed) return "infoBox_cases--red"	
			if(isBlue) return "infoBox_cases--blue"	
			if(isBlack) return "infoBox_cases--black"		
		}
	}
  return (
	<Card onClick={props.onClick} 
	className={`infoBox 
		${active && 'infoBox--selected'} 
		${isBlue && 'infoBox--blue'} 
		${isBlack && 'infoBox--black'}`}>
			<CardContent>
				<Typography className="infoBox_title" color="textSecondary">{title}</Typography>
				<h2 className={`infoBox_cases ${textColor()}`}>{cases} <span>Today</span></h2>
				<Typography className="infoBox_total" color="textSecondary">{total} Total </Typography>
			</CardContent>
		</Card>
  )
}

export default InfoBox

