<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Configuración del correo
    $to = "colmenares.proyecto@gmail.com"; // Cambia esto por tu dirección de correo electrónico
    $subject = "Nuevo mensaje de contacto";
    $body = "Nombre: $name\nCorreo: $email\nMensaje:\n$message";
    $headers = "From: $email";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje. Intenta de nuevo más tarde.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>