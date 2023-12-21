let map;

async function initMap() {

  
  const key = await fetch('/data/key')
  const keydata = await key.json();
  console.log(keydata);
  const response = await fetch('/data/route');
  const data = await response.json();

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: keydata,
    v: "weekly",
  });

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