
const musicForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const artist = document.querySelector('#artist')
const trackImage = document.getElementById('#track-image')

musicForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchQuery = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    artist.textContent = ''

    fetch('http://192.168.0.116:3000/music?search=' + searchQuery).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = ''
                artist.textContent = ''
                messageTwo.textContent = data.error
            } else {

                messageOne.textContent = data.name

                var albumTitle
                
                if (data.albumTitle === undefined){
                    albumTitle = ''
                }else {
                    albumTitle = ' - ' + data.albumTitle
                }

                artist.textContent = data.artistName + albumTitle

                if(data.albumImage !== undefined){

                    document.getElementById('#track-image').src = data.albumImage
                }else {

                    document.getElementById('#track-image').src = './img/place.png'
                }
            }

        })

    })
})