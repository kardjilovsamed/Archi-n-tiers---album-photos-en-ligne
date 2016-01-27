$(document).ready(function() {
    var login = $("#login").val();
    var password = $("#password").val();

    var param = {login: login, password: password};

    $("#connexion").on("click", function() {
        $.post("/login", param, function(data) {
            alert( "Data Loaded: " + data );
        });
    });

});


