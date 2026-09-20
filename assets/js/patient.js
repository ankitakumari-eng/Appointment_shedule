
let appointments = [];

let editingAppointmentId = null;


function openCreateScheduleModal() {

    const patientName = prompt("Enter Patient Name:");

    if (!patientName) {
        return;
    }

    const doctorName = prompt("Enter Doctor Name:");

    if (!doctorName) {
        return;
    }

    const date = prompt("Enter Appointment Date:");

    if (!date) {
        return;
    }

    const time = prompt("Enter Appointment Time:");

    if (!time) {
        return;
    }

    const department = prompt("Enter Department:");

    if (!department) {
        return;
    }


    /* Create new appointment */

    const appointment = {

        id: "APT-" + Date.now(),

        patientName: patientName,

        doctorName: doctorName,

        date: date,

        time: time,

        department: department,

        status: "Upcoming"

    };


    /* Add appointment */

    appointments.push(appointment);


    /* Update table */

    renderAppointments();


    alert("Appointment created successfully!");

}



/* =========================================
   EDIT APPOINTMENT
========================================= */

function openEditScheduleModal() {

    if (appointments.length === 0) {

        alert("No appointments available to edit.");

        return;
    }


    const appointmentId = prompt(
        "Enter Appointment ID to edit:\n\n" +
        appointments.map(function (appointment) {

            return appointment.id +
                " - " +
                appointment.patientName;

        }).join("\n")
    );


    if (!appointmentId) {
        return;
    }


    const appointment = appointments.find(function (item) {

        return item.id === appointmentId;

    });


    if (!appointment) {

        alert("Appointment not found.");

        return;
    }


    /* Get updated values */

    const patientName = prompt(
        "Enter Patient Name:",
        appointment.patientName
    );

    if (!patientName) {
        return;
    }


    const doctorName = prompt(
        "Enter Doctor Name:",
        appointment.doctorName
    );

    if (!doctorName) {
        return;
    }


    const date = prompt(
        "Enter Appointment Date:",
        appointment.date
    );

    if (!date) {
        return;
    }


    const time = prompt(
        "Enter Appointment Time:",
        appointment.time
    );

    if (!time) {
        return;
    }


    const department = prompt(
        "Enter Department:",
        appointment.department
    );

    if (!department) {
        return;
    }


    /* Update appointment */

    appointment.patientName = patientName;

    appointment.doctorName = doctorName;

    appointment.date = date;

    appointment.time = time;

    appointment.department = department;


    /* Update table */

    renderAppointments();


    alert("Appointment updated successfully!");

}



/* =========================================
   CANCEL APPOINTMENT
========================================= */

function cancelScheduleModal() {

    if (appointments.length === 0) {

        alert("No appointments available to cancel.");

        return;
    }


    const appointmentId = prompt(
        "Enter Appointment ID to cancel:\n\n" +
        appointments.map(function (appointment) {

            return appointment.id +
                " - " +
                appointment.patientName;

        }).join("\n")
    );


    if (!appointmentId) {
        return;
    }


    const appointment = appointments.find(function (item) {

        return item.id === appointmentId;

    });


    if (!appointment) {

        alert("Appointment not found.");

        return;
    }


    const confirmCancel = confirm(
        "Are you sure you want to cancel appointment " +
        appointment.id +
        "?"
    );


    if (!confirmCancel) {
        return;
    }


    /* Change status */

    appointment.status = "Cancelled";


    /* Update table */

    renderAppointments();


    alert("Appointment cancelled successfully!");

}



/* =========================================
   DISPLAY APPOINTMENTS IN TABLE
========================================= */

function renderAppointments() {

    const tableBody = document.getElementById("history-tbody");


    if (!tableBody) {
        return;
    }


    /* Clear existing rows */

    tableBody.innerHTML = "";


    /* No appointments */

    if (appointments.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding:30px;">
                    No appointments found.
                </td>
            </tr>
        `;

        return;
    }


    /* Create rows */

    appointments.forEach(function (appointment) {


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${appointment.id}
            </td>

            <td>
                ${appointment.patientName}
            </td>

            <td>
                ${appointment.doctorName}
            </td>

            <td>
                ${appointment.date}
            </td>

            <td>
                ${appointment.time}
            </td>

            <td>
                ${appointment.department}
            </td>

            <td>
                ${appointment.status}
            </td>

            <td>

                <button
                    class="action-btn"
                    title="Edit Schedule"
                    onclick="editAppointmentFromTable('${appointment.id}')">

                    ✏️

                </button>


                <button
                    class="action-btn"
                    title="Cancel Schedule"
                    onclick="cancelAppointmentFromTable('${appointment.id}')">

                    🗑️

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}



/* =========================================
   EDIT FROM TABLE ICON
========================================= */

function editAppointmentFromTable(appointmentId) {

    const appointment = appointments.find(function (item) {

        return item.id === appointmentId;

    });


    if (!appointment) {

        alert("Appointment not found.");

        return;
    }


    const patientName = prompt(
        "Enter Patient Name:",
        appointment.patientName
    );

    if (!patientName) {
        return;
    }


    const doctorName = prompt(
        "Enter Doctor Name:",
        appointment.doctorName
    );

    if (!doctorName) {
        return;
    }


    const date = prompt(
        "Enter Appointment Date:",
        appointment.date
    );

    if (!date) {
        return;
    }


    const time = prompt(
        "Enter Appointment Time:",
        appointment.time
    );

    if (!time) {
        return;
    }


    const department = prompt(
        "Enter Department:",
        appointment.department
    );

    if (!department) {
        return;
    }


    appointment.patientName = patientName;

    appointment.doctorName = doctorName;

    appointment.date = date;

    appointment.time = time;

    appointment.department = department;


    renderAppointments();


    alert("Appointment updated successfully!");

}



/* =========================================
   CANCEL FROM TABLE ICON
========================================= */

function cancelAppointmentFromTable(appointmentId) {

    const appointment = appointments.find(function (item) {

        return item.id === appointmentId;

    });


    if (!appointment) {

        alert("Appointment not found.");

        return;
    }


    const confirmCancel = confirm(
        "Are you sure you want to cancel " +
        appointment.id +
        "?"
    );


    if (!confirmCancel) {
        return;
    }


    appointment.status = "Cancelled";


    renderAppointments();


    alert("Appointment cancelled successfully!");

}



/* =========================================
   STATUS FILTER
========================================= */

const statusFilter =
    document.getElementById("history-status-select");


if (statusFilter) {

    statusFilter.addEventListener("change", function () {

        filterAppointments();

    });

}



/* =========================================
   DATE FILTER
========================================= */

const dateFilter =
    document.getElementById("history-date-filter");


if (dateFilter) {

    dateFilter.addEventListener("change", function () {

        filterAppointments();

    });

}



/* =========================================
   FILTER APPOINTMENTS
========================================= */

function filterAppointments() {

    const selectedStatus =
        document.getElementById("history-status-select").value;


    const tableBody =
        document.getElementById("history-tbody");


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    let filteredAppointments = appointments;


    /* Status filter */

    if (selectedStatus !== "all") {

        filteredAppointments =
            filteredAppointments.filter(function (appointment) {

                return appointment.status.toLowerCase() ===
                    selectedStatus.toLowerCase();

            });

    }


    /* No results */

    if (filteredAppointments.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding:30px;">
                    No appointments found.
                </td>
            </tr>
        `;

        return;
    }


    /* Display filtered appointments */

    filteredAppointments.forEach(function (appointment) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${appointment.id}</td>

            <td>${appointment.patientName}</td>

            <td>${appointment.doctorName}</td>

            <td>${appointment.date}</td>

            <td>${appointment.time}</td>

            <td>${appointment.department}</td>

            <td>${appointment.status}</td>

            <td>

                <button
                    class="action-btn"
                    title="Edit Schedule"
                    onclick="editAppointmentFromTable('${appointment.id}')">

                    ✏️

                </button>


                <button
                    class="action-btn"
                    title="Cancel Schedule"
                    onclick="cancelAppointmentFromTable('${appointment.id}')">

                    🗑️

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}



/* =========================================
   INITIAL LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    renderAppointments();

});