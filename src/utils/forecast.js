const request = require('request')

const forecast = (x, y, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0579317dd12be660f92ae19bd37f3e02&query=${x, y}`

    request({url, json: true}, (err, response) => {
        const {error, current} = response.body
        if (err) {
            callback('Unable to connect', undefined)
        } else if(error) {
            callback('Wrong user input', undefined)
        } else {
            const result = `It is currently ${current.temperature} celsius out. But the temperature feels like ${current.feelslike} celsius.`
            callback(undefined, result )
        }
    })
}

module.exports = forecast