function generateFields() {
    const departments = document.getElementById("departments").value;
    const departmentFields = document.getElementById("departmentFields");

    departmentFields.innerHTML = "";

    for (let i = 0; i < departments; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
            <label for="hostsDepartment${i + 1}">Number of Hosts in Department ${i + 1}:</label>
            <input type="number" id="hostsDepartment${i + 1}" min="1"><br>
        `;
        departmentFields.appendChild(div);
    }
}

function allocateIP() {
    const departments = parseInt(document.getElementById("departments").value);
    const ipTableBody = document.getElementById("ipTableBody");
    ipTableBody.innerHTML = ""; // Clear the table to avoid displaying previous data

    // Initialize variables for IP address allocation
    let remainingHosts = 256;
    let currentNetworkAddress = 0;

    // Loop through each department
    for (let i = 0; i < departments; i++) {
        // Calculate the required number of hosts for this department
        const hostsNeeded = parseInt(document.getElementById(`hostsDepartment${i + 1}`).value);
        const power = Math.ceil(Math.log2(hostsNeeded)); // Calculate the power of 2 for the required hosts
        const subnetMask = 32 - power; // Calculate the subnet mask based on the required hosts

        // Calculate the network address
        const networkAddress = `192.168.1.${currentNetworkAddress}/${subnetMask}`;

        // Create a row for this department in the table
        const row = ipTableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = `Department ${i + 1}`;
        cell2.textContent = `${networkAddress}`;

        // Allocate IP addresses for this department
        for (let j = 1; j <= hostsNeeded; j++) {
            const newRow = ipTableBody.insertRow();
            const newCell1 = newRow.insertCell(0);
            const newCell2 = newRow.insertCell(1);
            newCell1.textContent = `Host ${j}`;
            newCell2.textContent = `192.168.1.${currentNetworkAddress + j}`;
        }

        // Add an empty row for spacing
        ipTableBody.insertRow();

        // Update variables for the next department
        remainingHosts -= hostsNeeded;
        currentNetworkAddress += hostsNeeded;
    }

    // Add the Subnet Mask to the last row of the table
    const lastRowIndex = ipTableBody.rows.length - 1; // Get the index of the last row
    const lastRow = ipTableBody.rows[lastRowIndex]; // Get the last row element

    const subnetMaskCell = lastRow.insertCell(2); // Insert a cell for the Subnet Mask value
    subnetMaskCell.textContent = "255.255.255.0"; // Set the Subnet Mask value, you can calculate this based on your subnetting logic
}

