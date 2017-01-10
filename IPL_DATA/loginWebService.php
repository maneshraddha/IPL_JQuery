<?php
	
$data = file_get_contents('php://input');
$json = json_decode($data);

$email = $json->{'EmailId'};
$password = $json->{'Password'};

	if(!empty($email) and !empty($password))
	{
   		 $array = array("Status" => "1","Success" => "true");
        	print(json_encode($array));
	
	}
	else
	{
    		$array = array("error" => "Data not recieved.");
    		print( json_encode($array));
	}

?>
