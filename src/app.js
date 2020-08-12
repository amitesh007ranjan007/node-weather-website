const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express() // Express has created express application
const staticPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewPath)


app.use(express.static(staticPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amitesh Ranjan'
    })
})      

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about me',
        name: 'Amitesh Ranjan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        name: 'Amitesh Ranjan',
        message: 'Hello I am enjoying express'
    })
})

app.get('/weather', (req, res) => { //Weather page
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {

        if (error) {
    
            return res.send({
                error: 'Unable to fetch the weather for this location'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error) {
                return res.send({
                    error: 'Unable to fetch the weather for this location'
                })
            } 
            res.send({
                location,
                forecast: forecastData
            })
 
          })
    })

})

app.get('/help/*', (req, res) => {
    res.render('errors',{
        title: 'Help 404',
        errorMessage: 'Help article not found',
        name: 'Amitesh Ranjan'

    })
})

app.get('*', (req, res) => { //Do 
    res.render('errors',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Amitesh Ranjan'

    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
}) //Server started and is listening is at port 3000
