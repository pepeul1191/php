<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="<?php echo Configuration::get('base_url');?>public/bower_components/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<?php echo Configuration::get('base_url');?>public/bower_components/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="<?php echo Configuration::get('base_url');?>public/assets/login.css" />
</head>
<body>
    <div class="login-page">
        <div class="form">
            <form class="login-form">
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button>login</button>
                <p class="message">Not registered? <a href="#">Create an account</a></p>
            </form>
        </div>
    </div>
    <script type="text/javascript" src="<?php echo Configuration::get('base_url');?>public/bower_components/jquery/dist/jquery.min.js"></script>
</body>
</html>
