$(document).ready(function() {

    $("connexionButton").click(function(){
        var login = $("#login").val();
        var password = $("#password").val();

        var param = {"login" : login, "password" : password};

        $.post("/login", param, function(data){
            alert(data);
        });
    });

    $("inscriptionButton").click(function(){
        var login = $("#login").val();
        var password = $("#password").val();
        //ajouter le champ pour le mail

        var param = {"login" : login, "password" : password};

        $.post("/inscription", param, function(data){
            alert(data);
        });
    })
});