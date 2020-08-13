import numeral from "numeral"

export const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1:1))
  }
  
export const prettyPrintStat = (stat) =>
stat ? `+${numeral(stat).format("0.0a")}` : "+0";


export const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#3c89e8", 
    multiplier: 1200,
  },
  deaths: {
    hex: "#464646",
    multiplier: 2000,
  },
  }
