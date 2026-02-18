<?php

// Start a request HTTP to http://localhost:3000/api/course
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "http://localhost:3001/course",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "cache-control: no-cache"
    ],
]);
$courses = curl_exec($curl);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Courses List</title>
</head>
<body>
    <h1>Course</h1>
    <pre>
        <?php
            //loop through the courses and display the name of each course in table format
            $courses = json_decode($courses, true);
            echo "<table border='1'>";
            echo "<tr><th>ID</th><th>Name</th><th>Credits</th></tr>";
            foreach ($courses as $course) {
                echo "<tr>";
                echo "<td>" . $course['_id'] . "</td>";
                echo "<td>" . $course['name'] . "</td>";
                echo "<td>" . $course['credits'] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        ?>
    </pre>
</body>
</html>