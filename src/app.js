const path = require('path')
const express = require('express')
const hbs = require('hbs')
const searchResults = require('./utils/searchresults');
const trackInfo = require('./utils/trackinfo');

const app = express()

// Paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handle Bar Setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Root Route Static
app.use(express.static(publicPath))

// Main Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Trackzy',
        name: 'Allen Benny'
    })
})

// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

// Music API Page
app.get('/music', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'Please provide a valid Song Name !'
        })
    }

    searchResults(req.query.search, (error, { name, artist } = {}) => {
        if (error !== undefined) {

            console.log(error)
            return res.send({
                error: 'Please provide a valid Song Name !'
            })
        } else {

            trackInfo(name, artist, (error, { name, url, artistName, albumName, albumTitle, albumImage, albumInfo } = {}) => {
                if (error !== undefined) {

                    console.log(error)
                } else {

                    res.send({
                        name: name,
                        url: url,
                        artistName: artistName,
                        albumName: albumName,
                        albumTitle: albumTitle,
                        albumImage: albumImage,
                        albumInfo: albumInfo
                    })
                }
            })
        }
    })


})

// 404 Error Page
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page'
    })
})


//Start Server on Port 3000
app.listen(3000, () => {

    console.log('Server Started...');
})