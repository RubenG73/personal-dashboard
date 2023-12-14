//12 hour format clock
function getCurrentTime(){
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', {timeStyle: 'short'});
    document.getElementById('time').innerHTML = `${formattedTime}`
}

setInterval(getCurrentTime, 1000)


// GETS BACKGROUND IMAGE FROM UNSPLASH API
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=natural')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const backgroundImgUrl = data.urls.full
        document.body.style.backgroundImage = `url("${backgroundImgUrl}")`

        //get author name
        document.getElementById('img-author').textContent = `By: ${data.user.name}`
    })

    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1502790671504-542ad42d5189?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE3MzAwMTd8&ixlib=rb-4.0.3&q=8)`
    })


    fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
        .then(res => {
            if(!res.ok){
                throw Error('Something went wrong!')    
            }
            return res.json()})

        .then(data => {
            document.getElementById('crypto-top').innerHTML = `
                <img src=${data.image.small} alt='Bitcoin image'>
                <span>${data.name}</span>
            `

            document.getElementById('crypto-bottom').innerHTML = `
                <p> 🎯: $${data.market_data.current_price.usd}</p>
                <p> 👆: $${data.market_data.high_24h.usd}</p>
                <p> 👇: $${data.market_data.low_24h.usd}</p>
            `

            
        })

        .catch(err => {
            document.getElementById('crypto-info').textContent = 'Crypto info not available'
        })


//GET LOCATION TO GET WEATHER
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if(!res.ok) {
                throw Error('Weather data not available')
            }
            return res.json()
        })

        .then(data => {
            document.getElementById('weather').innerHTML= `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                <p>${Math.round(data.main.temp)}°C</p>
            `
            document.getElementById('weather-container').innerHTML += `
                <p>${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});