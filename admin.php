<?php
// 1. Conectarea la baza de date
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mirea_db"; // Numele bazei tale de date

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificăm conexiunea
if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

// 2. Interogarea SQL - Am folosit 'produs' în loc de 'nume_produs' pentru a evita eroarea
$sql = "SELECT id, produs, pret, data_comanda FROM comenzi ORDER BY data_comanda DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>MIRÉA | Panou Administrare</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body { font-family: 'Arial', sans-serif; background-color: #f9f9f9; margin: 0; }
        .admin-container { padding: 100px 10%; max-width: 1200px; margin: 0 auto; }
        h1 { letter-spacing: 5px; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 30px; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
        th { background-color: #000; color: #fff; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }
        tr:hover { background-color: #fcfcfc; }
        
        .status-badge { background: #e0f2f1; color: #00897b; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; }
        .btn-back { display: inline-block; margin-top: 20px; color: #000; text-decoration: none; font-weight: bold; border-bottom: 1px solid #000; }
    </style>
</head>
<body>

    <nav style="padding: 20px 10%; background: #fff; border-bottom: 1px solid #eee;">
        <div class="logo" style="font-size: 1.5rem; letter-spacing: 5px; font-weight: bold;">MIRÉA <span style="font-size: 0.8rem; opacity: 0.5;">ADMIN</span></div>
    </nav>

    <div class="admin-container">
        <h1>Comenzi Primite</h1>
        <p>Mai jos sunt datele extrase din baza de date MySQL (Demonstrație Laborator):</p>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Produs</th>
                    <th>Preț (MDL)</th>
                    <th>Data Comandă</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if ($result && $result->num_rows > 0) {
                    // Afișăm fiecare rând extras
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>#" . $row["id"] . "</td>
                                <td>" . $row["produs"] . "</td>
                                <td>" . $row["pret"] . "</td>
                                <td>" . $row["data_comanda"] . "</td>
                                <td><span class='status-badge'>Primită</span></td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='5' style='text-align:center; padding: 50px; opacity: 0.5;'>Nu există comenzi înregistrate în baza de date.</td></tr>";
                }
                ?>
            </tbody>
        </table>

        <a href="index.html" class="btn-back">← ÎNAPOI LA SITE</a>
    </div>

</body>
</html>

<?php 
// Închidem conexiunea
$conn->close(); 
?>
