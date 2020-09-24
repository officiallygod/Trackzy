const request = require('request');

// Function to Find the Related Track Names
const searchTrack = (trackQuery, callback ) => {

    const url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+ encodeURIComponent(trackQuery) +'&api_key=849dcc242abb6a48b3e965fb0a1242e4&format=json'


    request({ url, json: true }, (error, reponse) => {

        if(error){

            callback('Unable to Find the Track', undefined)
        }else if (reponse.body.results.trackmatches.track.length === 0){

            callback('Unable to Find the Track', undefined)
        } else{

            callback(undefined, {
                name: reponse.body.results.trackmatches.track[0].name,
                artist: reponse.body.results.trackmatches.track[0].artist,
            })

        }

    } )

}

module.exports = searchTrack