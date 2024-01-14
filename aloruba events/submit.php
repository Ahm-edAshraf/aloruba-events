<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form values
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $dob = $_POST["dob"];
    $gender = $_POST["gender"];
    $event = $_POST["event"];
    $specialNumber = $_POST["specialNumber"];

    // Save data to a file or database (for demonstration purposes, saving to a file)
    $data = "Name: $firstName $lastName\nEmail: $email\nDOB: $dob\nGender: $gender\nEvent: $event\nSpecial Number: $specialNumber\n\n";
    file_put_contents("registrations.txt", $data, FILE_APPEND);
}
?>
