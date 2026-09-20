document.addEventListener("DOMContentLoaded", function () {

    const departmentSelect = document.getElementById("department");
    const doctorSelect = document.getElementById("doctorName");

    const doctorsByDepartment = {

        Cardiology: [
            "Dr. Rajesh Sharma",
            "Dr. Priya Verma",
            "Dr. Amit Singh"
        ],

        Neurology: [
            "Dr. Neha Gupta",
            "Dr. Rahul Mehta"
        ],

        Orthopedics: [
            "Dr. Vikash Kumar",
            "Dr. Rohan Singh"
        ],

        "General Medicine": [
            "Dr. Ankit Kumar",
            "Dr. Sneha Gupta"
        ],

        Dermatology: [
            "Dr. Riya Singh",
            "Dr. Kavita Sharma"
        ],

        Pediatrics: [
            "Dr. Nisha Kumar",
            "Dr. Aman Gupta"
        ]
    };


    departmentSelect.addEventListener("change", function () {

        const selectedDepartment = this.value;

        doctorSelect.innerHTML =
            '<option value="">Select Doctor</option>';

        if (selectedDepartment === "") {
            doctorSelect.innerHTML =
                '<option value="">Select Department First</option>';
            return;
        }

        const doctors = doctorsByDepartment[selectedDepartment];

        doctors.forEach(function (doctor) {

            const option = document.createElement("option");

            option.value = doctor;
            option.textContent = doctor;

            doctorSelect.appendChild(option);

        });

    });

});