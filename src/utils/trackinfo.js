const request = require('request');

// Function to Find the Related Track Names
const trackInfo = (nameQuery, artistQuery, callback) => {

    const url = 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=849dcc242abb6a48b3e965fb0a1242e4&artist=' + encodeURIComponent(artistQuery) + '&track=' + encodeURIComponent(nameQuery) + '&format=json'


    request({ url, json: true }, (error, reponse) => {

        if (error) {

            callback('Unable to Find the Track', undefined)
        } else if (reponse.body.error !== undefined) {

            callback('Unable to Find the Track', undefined)
        } else {

            var name, url, artistName, albumName, albumTitle, albumImage, albumInfo

            if (reponse.body.track !== undefined){

                if (reponse.body.track.name !== undefined){
                    name = reponse.body.track.name 
                }

                if (reponse.body.track.url !== undefined){
                    url = reponse.body.track.url 
                }

                if (reponse.body.track.artist.name !== undefined) {
                    artistName = reponse.body.track.artist.name
                }

                if (reponse.body.track.album !== undefined) {
                    albumName = reponse.body.track.album.artist
                    albumTitle = reponse.body.track.album.title
                }

                
                if (reponse.body.track.album !== undefined) {
                    albumImage = reponse.body.track.album.image[3]
                    albumImage = albumImage["#text"]
                }

                if (reponse.body.track.wiki !== undefined) {
                    albumInfo = reponse.body.track.wiki.summary
                }

                callback(undefined, {
                    name,
                    url,
                    artistName,
                    albumName,
                    albumTitle,
                    albumImage,
                    albumInfo
                })
            }

        }

    })

}

module.exports = trackInfo