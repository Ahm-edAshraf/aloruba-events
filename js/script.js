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
  
  function validateAndGenerateTicket() {
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const event = document.getElementById('event').value;
    const paymentCheck = document.getElementById('paymentCheck').checked;

    // Check if any required fields are empty
    if (!firstName || !lastName || !email || !dob || !gender || !event || !paymentCheck) {
        alert("Please fill in all required fields.");
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
        gender: gender,
        event: event,
        paymentCheck: paymentCheck,
        specialNumber: specialNumber,
    });

    // Display a pop-up message to the user
    const message = `Thank you for registering to ${event}. Your ticket will be sent via Email/SMS soon. Please take your ticket to the Ticket Office/School Reception and pay the event fees there.`;
    alert(message);
}