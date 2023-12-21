let map;

async function initMap() {
  const response = await fetch('/data/route');
  const data = await response.json();
  console.log(data);

  let coordinaten = [];
  let dictionary = {};

  for (let i = 0; i < data.length; i++) {
    let coordinaten2 = data[i].coordinaten;
    dictionary[coordinaten2] = data[i].toerental_per_minuut;

    coordinaten.push(coordinaten2);
  }

  console.log(dictionary)

  let route = [];

  coordinaten.forEach(coordinate => {
    const [lat, lng] = coordinate;
    route.push({ lat, lng });
  });

  const { Map } = await google.maps.importLibrary("maps");

  let bounds = new google.maps.LatLngBounds();
  route.forEach(coord => {
    bounds.extend(coord);
  });
  let center = bounds.getCenter();

  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: center,
  });

  const routeLine = new google.maps.Polyline({
    path: route,
    geodesic: true,
    strokeColor: "#1C6EA4",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  routeLine.setMap(map);

  route.forEach(coord => {
    const key = `${coord.lat},${coord.lng}`;

    const infowindow = new google.maps.InfoWindow({
      content: "Toerental: " + dictionary[key], 
    });

    console.log(coord)

    const marker = new google.maps.Marker({
      position: coord,
      map: map,
      opacity: 0,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  });
}

document.addEventListener('DOMContentLoaded', initMap);