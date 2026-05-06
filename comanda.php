<?php
header('Content-Type: text/html; charset=utf-8');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mirea_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if (!empty($input['produse'])) {
    $total = 0;
    foreach ($input['produse'] as $item) {
        $nume_produs = $conn->real_escape_string($item['name']);
        $pret_produs = intval($item['price']);
        $total += $pret_produs;

        $sql = "INSERT INTO comenzi (produs, pret) VALUES ('$nume_produs', '$pret_produs')";
        $conn->query($sql);
    }
    
    echo "<div style='background: #f4f1ee; padding: 20px; border: 1px solid #4A4A4A; text-align: center;'>";
    echo "<h3>MULȚUMIM PENTRU COMANDĂ!</h3>";
    echo "<p>Total de plată: <strong>$total MDL</strong></p>";
    echo "<p>Datele au fost salvate în localhost/mirea_db.</p>";
    echo "</div>";
} else {
    http_response_code(400);
    echo "Eroare: Coșul este gol.";
}

$conn->close();
?>
