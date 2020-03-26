<?php 

                $current_data = file_get_contents('../json/users.json');  
                $array_data = json_decode($current_data, true);
                print_r($_REQUEST["data3"]);
                if($_REQUEST["data3"]['userid'] != '')
               {
                    for($i=0;$i<count($array_data);$i++){
                    if ($array_data[$i]['id'] == $_REQUEST["data3"]['userid']) {
                    $array_data[$i]['username'] = $_REQUEST["data3"]["username"];
                    $array_data[$i]['address'] = $_REQUEST["data3"]["address"];
                    $array_data[$i]['email'] = $_REQUEST["data3"]["email"];
                    $array_data[$i]['number'] = $_REQUEST["data3"]["number"];
                    }
                    }
                      file_put_contents('../json/users.json', json_encode($array_data));
               }
else
{
                $array_data[] = $_REQUEST["data3"];  
                $final_data = json_encode($array_data);
                   file_put_contents('../json/users.json', $final_data);
                }  
             
             echo json_encode('done');
                 
          
    ?>

    