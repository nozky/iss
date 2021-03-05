'user strict';
const latLabel = document.querySelector('.lat');
const lngLabel = document.querySelector('.lng');

// international space station location api
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

// https://www.openstreetmap.org/
// attribution per document instruction 
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

// tile url 
const tileUrl ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// tiles 
const tiles = L.tileLayer(tileUrl,{ attribution })

// marker
const marker = L.marker([0, 0]);


// init. getting data using fetch
const getData =()=>{
  fetch(api_url)
    .then( res => res.json())
    .then( data =>  initMap(data.latitude, data.longitude))
    .catch(err => console.log(err))
}


// marker handle
const markerHandle =(lat,lng)=>{
  marker.setLatLng([lat, lng])
  latLabel.textContent = `Latitude: ${lat}`;
  lngLabel.textContent = `Longitude: ${lng}`;
}


// setMarker, change marker location and display lat lng
const setMarker = ()=>{
  fetch(api_url)
  .then( res => res.json())
  .then( data => markerHandle(data.latitude, data.longitude))
  .catch(err => console.log(err))
  
}


// init map
const initMap = (latitude, longitude)=>{
  const issMap= L.map('map').setView([latitude,longitude], 2);
  tiles.addTo(issMap);
  marker.addTo(issMap);
}


// init
getData();

// set Marker 2ms interval
setInterval(()=>{setMarker()},2000)