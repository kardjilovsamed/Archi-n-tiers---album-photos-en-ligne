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
                window.localStorage.setItem("token", data.access_token);
                $.get("/profile?access_token="+data.access_token).success(function(data){
                    window.localStorage.setItem("albumRoot", data.albumRoot);
                    window.location="/a";
                });
            },
            error: function(data) {
                alert("Votre mot de passe ou votre email est incorrect.");
            }
        })
    });
});

$(document).ready(function () {
    $("#formDeco").submit(function (event) {
        event.preventDefault();
        $.ajax({
            success: function(data){
                window.localStorage.clear();
                window.location="/";
            },
            error: function (data) {
                alert("error");
            }
        })
    });
});
