<?php
/**
 * Created by PhpStorm.
 * User: Alex Flores
 * Date: 13/09/2017
 * Time: 12:42 AM
 */

$strNombre = !empty($_REQUEST["name"])?$_REQUEST["name"]:"";
$strTelefono = !empty($_REQUEST["phone"])?$_REQUEST["phone"]:"";
$strCorreo = !empty($_REQUEST["email"])?$_REQUEST["email"]:"";
$strAsunto = !empty($_REQUEST["subject"])?$_REQUEST["subject"]:"Información";
$strMensaje = !empty($_REQUEST["message"])?$_REQUEST["message"]:"";


$headers = "MIME-Version: 1.0";
$headers .= "\r\n"."Content-type:text/html;charset=UTF-8";
$headers .= "\r\n"."From: noreplay@bsalazar.com.gt";
/*if(!empty($strCorreo))$headers .= "\r\n"."Cc: {$strCorreo}";
$headers .= "\r\n"."Bcc: bitcoude@gmail.com";*/


$message = "";
$message .= <<<EOD
        <p>
            <i>
            Gracias por su correo electrónico.<br> 
            En breve estaré contestando su correo.<br>
            Para obtener asistencia inmediata, por favor póngase en contacto conmigo a mi teléfono celular.
            </i>
        </p>

        <table>
            <tr>
                <td>Nombre:</td>
                <td>{$strNombre}</td>
            </tr>
            <tr>
                <td>Teléfono:</td>
                <td>{$strTelefono}</td>
            </tr>
            <tr>
                <td>Correo:</td>
                <td>{$strCorreo}</td>
            </tr>
            <tr>
                <td>Mensaje:</td>
                <td>{$strMensaje}</td>
            </tr>
        </table>
EOD;

if(@mail("bitcoude@gmail.com",$strAsunto,$message,$headers)){
    $data["valido"] = 1;
    $data["msj"] = "Correo enviado correctamente";
}
else{
    $data["valido"] = 0;
    $data["msj"] = "En este momento no se puede enviar su correo, intente mas tarde.";
}
header('Content-Type: application/json');
echo json_encode($data);