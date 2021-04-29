window.addEventListener('load', ()=> {
    let long;
    let lat;
    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone");
    const weatherIcon = document.querySelector(".weather-icon");
    const temperature = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature-span");
    
    
    //Setting User's Position 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `http://api.weatherapi.com/v1/current.json?key=4f2ec400206c4871a54174837212804&q=${lat},${long}`;
                        
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data); 

                const {temp_c} = data.current;
                const {text} = data.current.condition;
                                   
                //Set DOM Elements from the API
                temperatureDegree.textContent =  temp_c;
                temperatureDescription.textContent = text;
                locationTimezone.textContent = data.location.tz_id;
                weatherIcon.innerHTML = `<img src="icon/113.png"/>`;
                
                //Formula to convert celsius to farenheit
                let celsius = (temp_c + 32) * (5 / 9);

                //Change temperature to Farenheit/Celsius 
                temperature.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "°C"){
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = temp_c;
                    }
                });
            });
        });        
    }else{
        h1.textContent = "Hi! To get an accurate location, please enable location."
    }     
});