// Initialize and add the map
let map;

async function initMap() {

  const response = await fetch('/data/route');
  const data = await response.json();
  console.log(data)

  let coordinaten = [];

  for (let i = 0; i < data.length; i++) {
    coordinaten.push(data[i].coordinaten)
}

let coordinaten2 = [];

coordinaten.forEach(coordinate => {
    const [lat, lng] = coordinate; // Destructure the latitude and longitude from the list
    coordinaten2.push({ lat, lng }); // Push the object into the flightPlanCoordinates array
  });
  
  console.log(coordinaten2);
  
  
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: coordinaten2[0],
    mapId: "DEMO_MAP_ID",
  });

  const route = new google.maps.Polyline({
    path: coordinaten2,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  route.setMap(map);

}

document.addEventListener('DOMContentLoaded', initMap);