const wrapper = document.querySelector(".wrapper")
inputPart = document.querySelector(".input-part")
infoTxt = document.querySelector(".info-txt")
inputField = document.querySelector("input")
locationBtn = document.querySelector("button")

let api;

inputField.addEventListener("keyup", e =>{
    // If user pressed enter btn and input value is valid
    if(e.key === "Enter" && inputField.value != " "){
        requestApi(inputField.value)
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){ //If browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser do not supportgeolocation api");
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords; //getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_Key}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}




function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`;
    fetchData()
}

function fetchData(){
    infoTxt.innerText = "Getting Weather Details...";
    infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
        infoTxt.classList.replace("pending", "error");
    }else{
        // gettind reqired properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        // passing these values to a particular html element
        document.querySelector(".temp .numb").innerText = Math.floor(temp);
        document.querySelector(".weather").innerText = description;
        document.querySelector(".location span").innerText = `${city}, ${country}`;
        document.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        document.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info)
    }
    
}