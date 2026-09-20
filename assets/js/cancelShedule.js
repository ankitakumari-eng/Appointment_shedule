// ==========================================
// CANCEL SCHEDULE / APPOINTMENT
// ==========================================


// Appointment select
const appointmentSelect =
    document.getElementById("appointmentSelect");


// Appointment details
const appointmentDetails =
    document.getElementById("appointmentDetails");


// Cancel button
const cancelBtn =
    document.getElementById("cancelBtn");


// Confirmation modal
const confirmModal =
    document.getElementById("confirmModal");


// No button
const noBtn =
    document.getElementById("noBtn");


// Yes button
const yesBtn =
    document.getElementById("yesBtn");


// Success message
const successMessage =
    document.getElementById("successMessage");



// ==========================================
// 1. SELECT APPOINTMENT
// ==========================================

appointmentSelect.addEventListener("change", function () {

    const selectedOption =
        this.options[this.selectedIndex];


    // Agar appointment select nahi hai
    if (this.value === "") {

        appointmentDetails.style.display = "none";

        return;
    }


    // Patient
    document.getElementById("detailPatient").textContent =
        selectedOption.dataset.patient;


    // Doctor
    document.getElementById("detailDoctor").textContent =
        selectedOption.dataset.doctor;


    // Date
    document.getElementById("detailDate").textContent =
        selectedOption.dataset.date;


    // Time
    document.getElementById("detailTime").textContent =
        selectedOption.dataset.time;


    // Department
    document.getElementById("detailDepartment").textContent =
        selectedOption.dataset.department;


    // Appointment ID
    document.getElementById("detailId").textContent =
        selectedOption.value;


    // Details show karo
    appointmentDetails.style.display = "block";

});



// ==========================================
// 2. CANCEL APPOINTMENT BUTTON
// ==========================================

cancelBtn.addEventListener("click", function () {


    // Pehle appointment select hona chahiye

    if (appointmentSelect.value === "") {

        alert("Please select an appointment first.");

        return;
    }


    const selectedOption =
        appointmentSelect.options[
            appointmentSelect.selectedIndex
        ];



    // Confirmation popup mein selected data show karo


    document.getElementById("confirmPatient").textContent =
        selectedOption.dataset.patient;


    document.getElementById("confirmDoctor").textContent =
        selectedOption.dataset.doctor;


    document.getElementById("confirmDate").textContent =
        selectedOption.dataset.date;


    document.getElementById("confirmTime").textContent =
        selectedOption.dataset.time;



    // Confirmation popup show karo

    confirmModal.classList.add("show");

});



// ==========================================
// 3. NO - KEEP APPOINTMENT
// ==========================================

noBtn.addEventListener("click", function () {

    confirmModal.classList.remove("show");

});



// ==========================================
// 4. YES - CANCEL APPOINTMENT
// ==========================================

yesBtn.addEventListener("click", function () {


    // Popup close
    confirmModal.classList.remove("show");


    // Success message show
    successMessage.style.display = "block";


    // Appointment disable
    appointmentSelect.disabled = true;


    // Cancel button disable
    cancelBtn.disabled = true;

});