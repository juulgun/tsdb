async function changeCenter(coordinates){
    let map = document.getElementById("map");
    map.setCenter(coordinates);


}    module.exports = {changeCenter}