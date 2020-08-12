console.log('Client side Javascript loaded')

const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

const weatherFinder = (addr) => {
    messageOne.textContent = 'loading....'
    messageTwo.textContent = ''
    fetch(`/weather?address=${addr}`)
.then((response) => {
    response.json()
    .then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent =  ''
            
        }else {

            messageOne.textContent = 'Location: '+data.location
            messageTwo.textContent =  'Forecast: '+data.forecast
        }
       
    })
})

}

const search = document.querySelector('#id02')

document.querySelector('#id01').addEventListener('click', (e) =>
{
    const location = search.value
    weatherFinder(location)
    
    e.preventDefault()
})

