<?php
header('Content-Type: text/html; charset=utf-8');

// 1. Datele de conexiune la baza de date
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mirea_db"; // Numele baze de date din imaginea ta

// Creăm conexiunea
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificăm conexiunea
if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

// 2. Citim datele trimise prin JSON de către script.js
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// Verificăm dacă există produse în coș
if (!empty($input['produse'])) {
    $total = 0;

    // 3. Introducem fiecare produs în tabelul 'comenzi'
    foreach ($input['produse'] as $item) {
        $nume_produs = $conn->real_escape_string($item['name']);
        $pret_produs = intval($item['price']);
        $total += $pret_produs;

        // SQL-ul folosește coloanele 'produs' și 'pret' identificate în phpmyadmin
        $sql = "INSERT INTO comenzi (produs, pret) VALUES ('$nume_produs', '$pret_produs')";
        $conn->query($sql);
    }
    
    // 4. Afișăm mesajul de succes către utilizator
    echo "<div style='background: #f4f1ee; padding: 20px; border: 1px solid #4A4A4A; margin-top: 20px; text-align: center;'>";
    echo "<h3>MULȚUMIM PENTRU COMANDĂ!</h3>";
    echo "<p>Total de plată: <strong>$total MDL</strong></p>";
    echo "<p>Comanda a fost salvată în baza de date. Vei fi contactată în cel mai scurt timp.</p>";
    echo "</div>";

} else {
    echo "<p style='color: red; text-align: center;'>Eroare: Coșul este gol.</p>";
}

// Închidem conexiunea
$conn->close();
?>
