<?php
// 1. Datele de conexiune (Standard pentru XAMPP)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mirea_db"; // Numele bazei tale de date

// Creăm conexiunea cu MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificăm dacă s-a conectat corect
if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 2. Preluăm datele și le curățăm pentru securitate
    $nume = $conn->real_escape_string($_POST['nume']);
    $email = $conn->real_escape_string($_POST['email']);
    $mesaj = $conn->real_escape_string($_POST['mesaj']);

    if (!empty($nume) && !empty($email) && !empty($mesaj)) {
        
        // 3. Inserăm datele în tabelul creat de tine
        $sql = "INSERT INTO contact_messages (nume, email, mesaj) VALUES ('$nume', '$email', '$mesaj')";

        if ($conn->query($sql) === TRUE) {
            echo "Mesaj trimis și salvat cu succes în baza de date!";
        } else {
            echo "Eroare la salvare: " . $conn->error;
        }

    } else {
        echo "Completează toate câmpurile!";
    }
}

// Închidem conexiunea
$conn->close();
?>
