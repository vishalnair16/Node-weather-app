const request = require('request')

const geoCode = (address,callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmlzaGFsbmFpcjE2IiwiYSI6ImNsNHdiMWF4cDBwazUzYnFleW5xZnpkMGoifQ.3HwUWriAni2cJGJ4sRUDXA'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect location service',undefined)
        }else if(body.features.length == 0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude :body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
    return request.latitude
}

module.exports =geoCode