$(document).ready(function () {

    // Post pour s'inscrire
    $("#formInscription").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/signup",
            data: $("#formInscription").serialize(),
            dataType: "json",
            encode: true,
            success: function (data) {
                $("#responseInscription").text("Connection réussie pour " + data.email);
            },
            error: function (data) {
                $("#responseInscription").text(data.responseText);
            }
        })
    });

    //Post pour se connecter
    $("#formLogin").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/authenticate",
            data: $("#formLogin").serialize(),
            dataType: "json",
            async: false,
            success: function(data){
                window.location="/a";
                window.localStorage.setItem("token", data.access_token);
                window.localStorage.setItem("albumRoot", data.email);
            },
            error: function(data) {
                alert("Votre mot de passe ou votre email est incorrect.");
            }
        })
    });
});