var zipinput = document.getElementById('zipinput');
var weatherButton = document.getElementById('weatherButton');
var output = document.getElementById('output');
var cityText = document.getElementById('cityText');
var temp = document.getElementById('temp');
var weatherConditions = document.getElementById('weatherConditions');
var weatherIcon = document.getElementById('weatherIcon');
var defaultTemp = document.getElementById('defaultTemp');
var celsius = document.getElementById('celsius');
var kelvin = document.getElementById('kelvin');
var submitZip = document.getElementById('submitZip');
var icon = document.getElementById('image');
var fahr = document.getElementById('fahr');


document.onreadystatechange = function () {
	if (document.readyState == "interactive") {
		weatherButton.onclick = getWeather;
	}
};


function getWeather() {
	var url = "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=58e92c763df5499a2c9ae20da806e2dc";
	  url = url.replace("<zipCode>",zipinput.value );
	  console.log(url);
	  apiRequest = new XMLHttpRequest();
	  apiRequest.onload = catchResponse;
	  apiRequest.onerror = httpRequestOnError;
	  apiRequest.open('get', url, true);
	  apiRequest.send();
};

function catchResponse () {
	console.dir(apiRequest);
	$('#output').hide();
	$('#error').hide();
	if (apiRequest.statusText == 'OK') {
		parseResults();
	} else {
		httpRequestOnError();
	}
	
};

function httpRequestOnError() {
	$('#error').hide();
	console.log('getWeather failed');

};

function parseResults(results) {
	$('#output').show();
	var results = JSON.parse(apiRequest.response);
	if (apiRequest.statusText == 'OK'){
		console.log('This was a good request');
		var apiData = apiRequest.response;
		var iconUrl = "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png";
    	var img = document.createElement('img');
    	img.src = iconUrl;
		cityText.innerHTML = results.name;
		// weatherConditions.innerHTML = results.weather[0].main;
		// weatherIcon.innerHTML = results.weather[0].icon;
		defaultTemp.innerHTML = Math.round(results.main.temp*9/5-459.67) + '&#176 F';
		fahr = Math.round(results.main.temp*9/5-459.67) + '&#176 F';
    	celsius = Math.round(results.main.temp - 273.15) + '&#176 C';
    	kelvin = Math.round(results.main.temp) + 'K';
    	weatherConditions.innerHTML = `<p>${results.weather[0].description.toUpperCase()}</p>`;
   		icon.src = iconUrl;
   	 

	} 
	else {
		console.log("This was a bad request")};
};

// Temperature button clicking options // 
celsius.onclick = function celsiusClick() {
		defaultTemp.innerHTML = Math.round(JSON.parse(apiRequest.response).main.temp-273.15) + '&#176 C';
};

fahr.onclick = function fahrClick() {
		defaultTemp.innerHTML = Math.round(JSON.parse(apiRequest.response).main.temp*9/5-459.67) + '&#176 F';
};

kelvin.onclick = function kelvinClick() {
		defaultTemp.innerHTML = Math.round(JSON.parse(apiRequest.response).main.temp) + ' K';
};





