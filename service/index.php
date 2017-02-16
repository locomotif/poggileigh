<?php
if(!isset($_SERVER['HTTP_ORIGIN'])){
    sendError();
}
/**
 * Provide CORS to localhost:8010 during development
 */
header('Access-Control-Allow-Origin: ' .  $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$development = false;
$allow = [
    'http://localhost:8010',
    'http://localhost:4200',
    'http://resume.poggileigh.com:4200',
    'http://resume.poggileigh.com:81',
    'http://resume.poggileigh.com'
];

if($_SERVER['REQUEST_METHOD'] === 'POST' && in_array(strtolower($_SERVER['HTTP_ORIGIN']), $allow)) {
    $post = json_decode(getHttpRawPostData());

    $from = $post->email;
    $message = $post->message;
    $name = $post->name;


    $headers = "From: webmaster@poggileigh.com\r\n" .
        'Reply-To: ' . $from . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $to = 'bpoggi@yahoo.com';

    if(!$development) {
        $sent = mail(
            $from,
            $to,
            $message,
            $headers
        );
        if ($sent) {
            echo json_encode([
                "code"=>200, 
                "msg"=> "Ok", 
                "description"=>"Ok" 
                ]);
        } else {
            header("HTTP/1.0 500 Not Found");
            echo json_encode([
                "code"=>500, 
                "msg"=> "Server Error", 
                "description"=>"Unable to send email at this moment." 
                ]);
        }
    } else {
        echo json_encode([
            "code"=>200, 
            "msg"=> "Ok", 
            "description"=>"Ok" 
            ]);
    }

} else if($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && in_array(strtolower($_SERVER['HTTP_ORIGIN']), $allow)) {
} else {
    sendError();
}


function getHttpRawPostData()
{
    $input = fopen('php://input',"r");
    $data = stream_get_contents($input);
    fclose($input);
    return $data;
}

function sendError() {
    header("HTTP/1.0 404 Not Found");
    echo json_encode([ 
        "code"=>403, 
        "msg"=> "Forbidden", 
        "description"=>"Resource is forbidden." 
    ]);
    exit;
}
