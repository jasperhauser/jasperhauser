<?php
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // + Added input sanitizing to prevent injection
    // + Added hidden form input to check for spam bots

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
                
        // Honeypot spam trap
        $first_name = $_POST['first_name'];

        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Set the recipient email address.
        $recipient = "info@jasperhauser.nl";

        // Set the email subject.
        $email_time = date('d/m/Y');
        $subject = "Email through website from"." ".$name." ".$email_time;
        // $subject = "New contact from $name";

        // Build the email content.
        $email_content = "$message \n\n";
        $email_content .= "$name \n $email";
        
        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
       
        // Check that data was sent to the mailer.
        if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            // http_response_code(400);
            echo "Oops! Please properly complete form!";
            exit;
        } elseif ($first_name){
            // honeypot spam trap
            echo "Ehm, don't try again.";
            exit; // and stop doing stuff
        } else {
            if (mail($recipient, $subject, $email_content, $email_headers)) {
                // Set a 200 (okay) response code.
                // http_response_code(200);
                echo "Thank You! Mail was sent.";
            } else {
                // Set a 500 (internal server error) response code.
                // http_response_code(500);
                echo "Oops Error! We couldn't send your Mail.";
            }
        }
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        // http_response_code(403);
        echo "Oops! Please try again.";
    }
?>