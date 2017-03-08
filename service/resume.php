<?php
$file = './Bernardo_P_Leigh_Resume.pdf';
$filesize = filesize($file);
$alias = "BernardoPoggiLeigh_Resume.pdf";

header("Cache-Control: private");
header("Pragma: none");
header("Content-Type: application/octet-stream; ");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ". $filesize);
header("Content-Disposition: attachment; filename=" . $alias);

$fp = fopen($file, 'rb');
fpassthru($fp);

