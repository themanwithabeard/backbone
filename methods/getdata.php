<?php 

                $current_data = file_get_contents('../json/users.json');  
                $json = json_decode($current_data, true); 
for($i=0;$i<count($json);$i++){
   if($json[$i]['id'] == $_REQUEST['id']){
echo json_encode($json[$i]);
}
}
                 
          
    ?>

    