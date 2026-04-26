<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nume = htmlspecialchars($_POST['nume']);
    $email = htmlspecialchars($_POST['email']);
    $mesaj = htmlspecialchars($_POST['mesaj']);

    if (!empty($nume) && !empty($email) && !empty($mesaj)) {
        echo "Mesaj trimis cu succes!";
    } else {
        echo "Completează toate câmpurile!";
    }
}
?>
