var XLSX = require("xlsx");
const axios = require('axios')
const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2MTk3MTUzNywiZXhwIjoxNjYxOTc1MTM3fQ.neqVeeug3_dlBu2wizFckNH4M0EIHPGoatijQT6r97ro7Rktqt_pH3SqSmMb0_-TQhyXmX4D9cI1S6FgvD9UcrxlYJdrI-46810NiA1jcweTvAFYu-DRo1VbavvmpyfINfK7nU6ZxOjfrOS0UiFpBqo65FT4dhQ8D1I4HRLRzIOPs93pGAqNI1bTJ7WybMM9OPZVRMawY99h3hJ3TPgvreFDiFOtjz6bu43uB_W06UTTT4jVYVVzcgq9FbKTzY8ewqjsSth4yIwIHSzqURrwOPRgEDAL5lZPpAKs9_e0f2oEuQ2b9cOGoVZM8NjEN9rKB-2aq7ypPqyOwws8AqYGlQ"
const BaseURL = "https://api.v1.interbet.app"



insertGames("BF_1B_2022.xlsx")




function getDate(day, hour){
  return new Date(`${day.slice(3, 5)}/${day.slice(0, 2)}/2022 ${hour}${hour.length < 4 ? '00': ''}`)
}

function insertGames(filename){
var workbook = XLSX.readFile(filename);
var games = XLSX.utils.sheet_to_json(workbook.Sheets['Table 1']);
  games.forEach(game => {
    axios.post(BaseURL + '/games/history', {
      event: "intermed",
          teamA: game['EQUIPE Mandante'],
          teamB: game['EQUIPE Visitante'],
          scoreA: game.__EMPTY,
          scoreB: game.__EMPTY_1,
          ref_table: filename.replace('.xlsx', ''),
          date: getDate(game['DIA'], game['HORÁRIO'].replace('h', ':').replace('min', '')),
    }, {headers: {Authorization: token}}).then(res => {
      console.log(res.data)
    }).catch(err => console.error(err))
  
  })
}


function deleteGame(id){
  axios.delete(BaseURL + `/games/history/${id}`, {headers: {Authorization: token}}).then(res => {
    console.log(res.data)
  }).catch(err => console.error(err))
}

function getAllGames(){
  axios.get(BaseURL + `/games/history`, {headers: {Authorization: token}}).then(res => {
    console.log(res.data)
  }).catch(err => console.error(err))
}
