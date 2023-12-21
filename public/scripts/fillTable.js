async function fillTable() {
    try {
        const response = await fetch('/data/latest');
        const data = await response.json();
        console.log(data)

        const tableBody = document.querySelector("#table");

        for (let i = 1; i < data.length; i++) {
            let row = tableBody.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.textContent = data[i].id;
            cell2.textContent = data[i].coordinaten;
            cell3.textContent = data[i].toerental_per_minuut;

            cell2.addEventListener('click', function(){
                let map = document.getElementById("map");
                map.setCenter(new google.maps.LatLng(data[i].coordinaten[0], data[i].coordinaten[1]));
            })
        }

    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

document.addEventListener('DOMContentLoaded', fillTable);