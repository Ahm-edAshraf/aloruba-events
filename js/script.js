const firebaseConfig = {
    apiKey: "AIzaSyDIUBHmpkX63X1mnlRle3KPBNJ5Rou56pk",
    authDomain: "al-oruba-events-database.firebaseapp.com",
    databaseURL: "https://al-oruba-events-database-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "al-oruba-events-database",
    storageBucket: "al-oruba-events-database.appspot.com",
    messagingSenderId: "196031133240",
    appId: "1:196031133240:web:c2b9cbfbecd9022c8418cd",
    measurementId: "G-6PX78CXP0S"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  function isValidName(name) {
    // Allow only letters and spaces in names
    return /^[a-zA-Z\s]+$/.test(name);
}

function isValidDateOfBirth(dob) {
    // Calculate age from the provided date of birth
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Ensure the user is less than or equal to 70 years old
    return age <= 70;
}

function validateForm() {
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;

    // Perform validation
    if (!isValidName(firstName)) {
        alert('Invalid first name. Please use only letters and spaces.');
        return false;
    }

    if (!isValidName(lastName)) {
        alert('Invalid last name. Please use only letters and spaces.');
        return false;
    }

    if (!isValidDateOfBirth(dob)) {
        alert('Invalid date of birth. Age must be 70 years or less.');
        return false;
    }

    // Additional validations for other fields can be added here

    // If all validations pass, return true
    return true;
}


function validateAndGenerateTicket() {
     // Check if a submission cookie is present
     if (document.cookie.includes('formSubmitted=true')) {
        alert('You have already submitted the form. Multiple submissions are not allowed.');
        return;
    }
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const genderSelect = document.getElementById('gender');
    const event = document.getElementById('event').value;
    const paymentCheck = document.getElementById('paymentCheck').checked;

    // Check if any required fields are empty
    if (!firstName || !lastName || !email || !dob || !genderSelect.value || !event) {
        alert("Please fill in all required fields.");
        return;
    }

    // Perform validation
    if (!isValidName(firstName) || !isValidName(lastName)) {
        alert('Invalid first name or last name. Please use only letters and spaces.');
        return;
    }

    if (!isValidDateOfBirth(dob)) {
        alert('Invalid date of birth. Age must be 70 years or less.');
        return;
    }

    // Check if the checkbox is checked
    if (!paymentCheck) {
        alert("Please accept the terms by checking the checkbox.");
        return;
    }

    // Check gender selection
    const selectedGender = genderSelect.options[genderSelect.selectedIndex].value;
    if (selectedGender !== 'male' && selectedGender !== 'female') {
        alert("Please choose a valid gender (Male or Female).");
        return;
    }

    // Generate 7-digit random number
    const specialNumber = Math.floor(1000000 + Math.random() * 9000000);

    // Log user information to Firebase Realtime Database
    const database = firebase.database();
    const userRef = database.ref('users').push();
    userRef.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        gender: selectedGender,
        event: event,
        paymentCheck: paymentCheck,
        specialNumber: specialNumber,
    });

    // Display a pop-up message to the user
    const message = `Thank you for registering to ${event}. If you are accepted, an email will soon be sent to you containing the steps to pay and receive your ticket.`;
    alert(message);
}

