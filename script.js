const wrapper = document.querySelector(".wrapper")
inputPart = document.querySelector(".input-part")
infoTxt = document.querySelector(".info-txt")
inputField = document.querySelector("input")

inputField.addEventListener("keyup", e =>{
    // If user pressed enter btn and input value is valid
    if(e.key === "Enter" && inputField.value != " "){
        requestApi(inputField.value)
    }
});




function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;
    infoTxt.innerText = "Getting Weather Details...";
    infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info){
    console.log(info)
}