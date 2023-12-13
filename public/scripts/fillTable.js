async function fillTable() {
    try {
        const response = await fetch('/data');
        const data = await response.json();

        const tableBody = document.querySelector("#table");

        //i = 4, omdat de eerste drie data items uit de database afwijken van de rest.
        for (let i = 4; i < data.length; i++) {
            let row = tableBody.insertRow(i - 3);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.textContent = data[i].id;
            cell2.textContent = data[i].location;
            cell3.textContent = data[i].coordinates;
        }

    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

document.addEventListener('DOMContentLoaded', fillTable);