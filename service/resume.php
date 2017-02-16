<?php
$file = './BPLresume_June2017.pdf';
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

