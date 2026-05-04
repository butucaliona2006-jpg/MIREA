<?php
header('Content-Type: text/html; charset=utf-8');

// Citim datele trimise prin JSON
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if (!empty($input['produse'])) {
    $total = 0;
    foreach ($input['produse'] as $item) {
        $total += $item['price'];
    }
    
    echo "<div style='background: #f4f1ee; padding: 20px; border: 1px solid #4A4A4A; margin-top: 20px; text-align: center;'>";
    echo "<h3>MULȚUMIM PENTRU COMANDĂ!</h3>";
    echo "<p>Total de plată: <strong>$total MDL</strong></p>";
    echo "<p>Vei fi contactată în cel mai scurt timp pentru livrare.</p>";
    echo "</div>";
} else {
    echo "Eroare: Coșul este gol.";
}
?>
