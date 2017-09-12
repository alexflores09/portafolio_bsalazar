<?php
/**
 * Created by PhpStorm.
 * User: Alex Flores
 * Date: 11/09/2017
 * Time: 10:07 PM
 */
header("Content-type:application/pdf");
header("Content-Disposition:attachment;filename='Barbara Salazar CV.pdf'");
readfile("docs/cv.pdf");