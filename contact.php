<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mirea_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nume = $conn->real_escape_string($_POST['nume']);
    $email = $conn->real_escape_string($_POST['email']);
    $mesaj = $conn->real_escape_string($_POST['mesaj']);

    if (!empty($nume) && !empty($email) && !empty($mesaj)) {
        
        // 1. SALVARE ÎN BAZA DE DATE LOCALĂ
        $sql = "INSERT INTO contact_messages (nume, email, mesaj) VALUES ('$nume', '$email', '$mesaj')";
        $savedLocal = $conn->query($sql);

        // 2. TRIMITERE CĂTRE FORMSPREE (folosind cURL)
        $formspree_url = "https://formspree.io/f/xvzlrrll";
        $ch = curl_init($formspree_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);
        curl_exec($ch);
        curl_close($ch);

        if ($savedLocal) {
            echo "Mesaj trimis cu succes!";
        } else {
            echo "Eroare locală: ";
        }
    } else {
        echo "Te rugăm să completezi toate câmpurile.";
    }
}
$conn->close();
?>
