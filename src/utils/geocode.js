const request = require('request')

const geocode = (address, callback) => {

    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW1pdGVzaDAwN3JhbmphbiIsImEiOiJja2RvOHJlYmswcmNwMzBuY20xc2M4dmxuIn0.OhBYjtj8cIeFDtSizdxolw&limit=1`

    request({url, json: true}, (error, response) => {
        
        if(error) {
            callback('Unable to connect', undefined)
        } else if(response.body.features.length === 0) {

            callback('Unable to find location', undefined )

        } else {
            const {center, place_name} = response.body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }

    })

}

module.exports = geocode