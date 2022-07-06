const request = require('request')
const geoCode = require('./geocode')



const forCast = (latitude,longitude,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=103101ace76e1a935bf03d6e1c06abe0&query='+longitude+','+latitude+''

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to server')
        }else if(body.error){
            callback('unable to find location')
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". The current temperature now here is: "+body.current.temperature+'Feels Like:'+body.current.feelslike)
            // console.log(body.location.name)
        }
    })
}

module.exports = forCast