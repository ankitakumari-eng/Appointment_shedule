document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       DEMO APPOINTMENT DATA
       Backend aane ke baad yahi data API se aayega
    ===================================================== */

    const appointments = [
        {
            id: "APT001",
            patient: "Rahul Sharma",
            doctor: "Dr. Singh",
            date: "2026-08-19",
            time: "09:30 AM",
            department: "Cardiology",
            status: "Completed"
        },
        {
            id: "APT002",
            patient: "Priya Kumari",
            doctor: "Dr. Singh",
            date: "2026-08-19",
            time: "10:30 AM",
            department: "Neurology",
            status: "Pending"
        },
        {
            id: "APT003",
            patient: "Aman Kumar",
            doctor: "Dr. Singh",
            date: "2026-08-19",
            time: "11:30 AM",
            department: "Orthopedics",
            status: "Upcoming"
        },
        {
            id: "APT004",
            patient: "Neha Singh",
            doctor: "Dr. Singh",
            date: "2026-08-19",
            time: "01:00 PM",
            department: "Dermatology",
            status: "Cancelled"
        },

        {
            id: "APT005",
            patient: "Riya Verma",
            doctor: "Dr. Singh",
            date: "2026-08-20",
            time: "09:00 AM",
            department: "Cardiology",
            status: "Pending"
        },
        {
            id: "APT006",
            patient: "Arjun Singh",
            doctor: "Dr. Singh",
            date: "2026-08-20",
            time: "11:00 AM",
            department: "Neurology",
            status: "Upcoming"
        },

        {
            id: "APT007",
            patient: "Sneha Kumari",
            doctor: "Dr. Singh",
            date: "2026-08-23",
            time: "10:00 AM",
            department: "Pediatrics",
            status: "Completed"
        },
        {
            id: "APT008",
            patient: "Vikas Kumar",
            doctor: "Dr. Singh",
            date: "2026-08-23",
            time: "12:00 PM",
            department: "General Medicine",
            status: "Pending"
        },

        {
            id: "APT009",
            patient: "Anjali Sharma",
            doctor: "Dr. Singh",
            date: "2026-08-27",
            time: "09:30 AM",
            department: "Cardiology",
            status: "Upcoming"
        },
        {
            id: "APT010",
            patient: "Rohit Kumar",
            doctor: "Dr. Singh",
            date: "2026-08-27",
            time: "02:00 PM",
            department: "Orthopedics",
            status: "Completed"
        }
    ];


    /* =====================================================
       CALENDAR VARIABLES
    ===================================================== */

    let currentDate = new Date(2026, 7, 1);
    let selectedDate = formatDate(new Date(2026, 7, 19));


    const calendarMonth = document.getElementById("calendarMonth");
    const calendarBody = document.querySelector(".calendar-body");

    const previousMonth = document.getElementById("previousMonth");
    const nextMonth = document.getElementById("nextMonth");


    /* =====================================================
       DATE FORMAT
    ===================================================== */

    function formatDate(date) {

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    /* =====================================================
       CALENDAR GENERATE
    ===================================================== */

    function generateCalendar() {

        if (!calendarBody) {
            console.error("Calendar body not found.");
            return;
        }


        const year = currentDate.getFullYear();

        const month = currentDate.getMonth();


        const monthName = currentDate.toLocaleString("default", {
            month: "long"
        });


        if (calendarMonth) {
            calendarMonth.textContent = `${monthName} ${year}`;
        }


        /*
           Calendar ke andar purana date content remove
           karke complete calendar create karenge.
        */

        let oldCalendar = calendarBody.querySelector(".calendar-grid");

        if (oldCalendar) {
            oldCalendar.remove();
        }


        const calendarGrid = document.createElement("div");

        calendarGrid.className = "calendar-grid";


        /* Week days */

        const weekDays = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];


        weekDays.forEach(day => {

            const dayHeader = document.createElement("div");

            dayHeader.className = "calendar-weekday";

            dayHeader.textContent = day;

            calendarGrid.appendChild(dayHeader);

        });


        /*
           Month ka first day
        */

        const firstDay = new Date(year, month, 1);

        const startingDay = firstDay.getDay();


        /*
           Month mein kitne days hain
        */

        const totalDays = new Date(
            year,
            month + 1,
            0
        ).getDate();


        /*
           Previous month ke blank cells
        */

        for (let i = 0; i < startingDay; i++) {

            const blank = document.createElement("div");

            blank.className = "calendar-date empty";

            calendarGrid.appendChild(blank);

        }


        /*
           Actual dates
        */

        for (let day = 1; day <= totalDays; day++) {

            const date = new Date(
                year,
                month,
                day
            );

            const dateString = formatDate(date);


            const dateButton = document.createElement("button");

            dateButton.type = "button";

            dateButton.className = "calendar-date";

            dateButton.textContent = day;


            /*
               Selected date
            */

            if (dateString === selectedDate) {

                dateButton.classList.add("selected");

            }


            /*
               Appointment wale dates
            */

            const dayAppointments = appointments.filter(
                appointment => appointment.date === dateString
            );


            if (dayAppointments.length > 0) {

                dateButton.classList.add("has-appointments");


                const dot = document.createElement("span");

                dot.className = "appointment-dot";

                dateButton.appendChild(dot);

            }


            /*
               Date click
            */

            dateButton.addEventListener("click", function () {

                selectedDate = dateString;

                generateCalendar();

                showSelectedDateData();

            });


            calendarGrid.appendChild(dateButton);

        }


        calendarBody.appendChild(calendarGrid);

    }


    /* =====================================================
       SELECTED DATE DATA
    ===================================================== */

    function showSelectedDateData() {

        const dateAppointments = appointments.filter(
            appointment => appointment.date === selectedDate
        );


        updateDashboardCards(dateAppointments);

        showDateAppointments(dateAppointments);

    }


    /* =====================================================
       DASHBOARD CARDS UPDATE
    ===================================================== */

    function updateDashboardCards(data) {

        const totalPatients = data.length;

        const totalAppointments = data.length;

        const pending = data.filter(
            item => item.status === "Pending"
        ).length;

        const cancelled = data.filter(
            item => item.status === "Cancelled"
        ).length;

        const completed = data.filter(
            item => item.status === "Completed"
        ).length;

        const upcoming = data.filter(
            item => item.status === "Upcoming"
        ).length;


        setText("todayPatients", totalPatients);

        setText("todayAppointments", totalAppointments);

        setText("pendingAppointments", pending);

        setText("cancelledAppointments", cancelled);

        setText("completedAppointments", completed);

        setText("upcomingAppointments", upcoming);

    }


    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {

            element.textContent = value;

        }

    }


    /* =====================================================
       SELECTED DATE APPOINTMENT LIST
    ===================================================== */

    function showDateAppointments(data) {

        const section = document.getElementById(
            "dateAppointments"
        );


        if (!section) {
            return;
        }


        if (data.length === 0) {

            section.innerHTML = `
                <div class="empty-state">
                    <strong>No appointments</strong>
                    <p>No appointment is scheduled for this date.</p>
                </div>
            `;

            return;

        }


        section.innerHTML = "";


        data.forEach(appointment => {

            const card = document.createElement("div");

            card.className = "appointment-card";


            card.innerHTML = `
                <div class="appointment-info">

                    <strong>${appointment.patient}</strong>

                    <span>
                        Appointment ID: ${appointment.id}
                    </span>

                    <span>
                        ${appointment.time} •
                        ${appointment.department}
                    </span>

                    <span>
                        ${appointment.doctor}
                    </span>

                </div>

                <span class="status-badge ${getStatusClass(appointment.status)}">
                    ${appointment.status}
                </span>
            `;


            section.appendChild(card);

        });

    }


    /* =====================================================
       STATUS CLASS
    ===================================================== */

    function getStatusClass(status) {

        switch (status) {

            case "Completed":
                return "status-completed";

            case "Pending":
                return "status-pending";

            case "Cancelled":
                return "status-cancelled";

            case "Upcoming":
                return "status-upcoming";

            default:
                return "";

        }

    }


    /* =====================================================
       PREVIOUS MONTH
    ===================================================== */

    if (previousMonth) {

        previousMonth.addEventListener("click", function () {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            generateCalendar();

        });

    }


    /* =====================================================
       NEXT MONTH
    ===================================================== */

    if (nextMonth) {

        nextMonth.addEventListener("click", function () {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            generateCalendar();

        });

    }


    /* =====================================================
       PATIENT ID SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("patientSearch");

    const searchButton =
        document.getElementById("searchPatientBtn");

    const searchResult =
        document.getElementById("searchResult");


    function searchPatient() {

        if (!searchInput || !searchResult) {
            return;
        }


        const searchValue =
            searchInput.value.trim().toUpperCase();


        if (searchValue === "") {

            searchResult.innerHTML = `
                <p class="search-message">
                    Please enter an Appointment ID.
                </p>
            `;

            return;

        }


        const patient = appointments.find(
            appointment =>
                appointment.id.toUpperCase() === searchValue
        );


        if (!patient) {

            searchResult.innerHTML = `
                <div class="search-not-found">
                    No appointment found for ID:
                    <strong>${searchValue}</strong>
                </div>
            `;

            return;

        }


        searchResult.innerHTML = `

            <div class="search-patient-card">

                <div>
                    <span class="search-label">
                        Appointment ID
                    </span>

                    <strong>
                        ${patient.id}
                    </strong>
                </div>


                <div>
                    <span class="search-label">
                        Patient
                    </span>

                    <strong>
                        ${patient.patient}
                    </strong>
                </div>


                <div>
                    <span class="search-label">
                        Doctor
                    </span>

                    <strong>
                        ${patient.doctor}
                    </strong>
                </div>


                <div>
                    <span class="search-label">
                        Date
                    </span>

                    <strong>
                        ${patient.date}
                    </strong>
                </div>


                <div>
                    <span class="search-label">
                        Time
                    </span>

                    <strong>
                        ${patient.time}
                    </strong>
                </div>


                <div>
                    <span class="search-label">
                        Department
                    </span>

                    <strong>
                        ${patient.department}
                    </strong>
                </div>


                <div>
                    <span class="search-label">
                        Status
                    </span>

                    <span class="status-badge ${getStatusClass(patient.status)}">
                        ${patient.status}
                    </span>
                </div>

            </div>

        `;

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchPatient
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    searchPatient();

                }

            }
        );

    }


    /* =====================================================
       SCHEDULE HISTORY
    ===================================================== */

    const historyBody =
        document.getElementById("scheduleHistoryBody");


    function generateHistory() {

        if (!historyBody) {
            return;
        }


        historyBody.innerHTML = "";


        appointments.forEach(appointment => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${appointment.id}
                </td>

                <td>
                    ${appointment.patient}
                </td>

                <td>
                    ${appointment.doctor}
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
                    <span class="status-badge ${getStatusClass(appointment.status)}">
                        ${appointment.status}
                    </span>
                </td>

            `;


            historyBody.appendChild(row);

        });

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    generateCalendar();

    showSelectedDateData();

    generateHistory();

});