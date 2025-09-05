<?php
class Controller
{
    private $requestMethod;

    function login() {
        echo "I am login";
    }

    function register() {
        $first_name = $this->validate("firstname");
        $last_name = $this->validate("lastname");
        $username= $this->validate("username");
        $email = $this->validate("email");
        $password = $this->validate("password");

        $this->validate($_POST["firstname"]);

        $sql = "INSERT INTO user_data (first_name, last_name, username, email, password)
                VALUES (?, ?, ?, ?, ?)";

        $stmt = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($stmt, $sql)) {
            die(mysqli_error($conn));
        }

        mysqli_stmt_bind_param($stmt, "sssss",
                            $first_name,
                            $last_name,
                            $username,
                            $email,
                            $password);

        mysqli_stmt_execute($stmt);
    }
    

    function validate($input, $mandatory=false) {
        if ($mandatory == true && $input == '') {
            throw new Exception($input.' is mandatory.');
        }

        return htmlspecialchars(stripcslashes($_POST[$input])); // https://www.php.net/manual/en/function.stripslashes.php
    }

    public function getRequestMethod() {
        return $this->requestMethod;
    }

    public function setRequestMethod(string $methodName) {
        if ($methodName === '') {
            throw new Exception('RequestMethod cannot be empty.');
        }

        $this->requestMethod = $methodName;
    }
}