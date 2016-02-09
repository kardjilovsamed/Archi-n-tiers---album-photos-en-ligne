var token = window.localStorage.getItem("token");
var personne;

//pour les photos
//http://localhost:3000/search/photos?owner= &tag= &access_token=

$("#rechercheAmi").keyup(function () {

    if($("#rechercheAmi").val()){

        $.ajax({
            type: "GET",
            url: "/search/users?access_token=" + token + "&email=" + $("#rechercheAmi").val(),
            dataType: "json",
            encode: true,
            success: function(data){

                $("#suggestionsAmi").empty();
                var nb = 0;
                $.each(data, function(index, item) {
                    nb = nb + 1;
                    var idTrouve = item._id;
                    var emailTrouve = item.email;

                    $("#suggestionsAmi").append('<div id="' + idTrouve + '" class="alert alert-info alert-link fade in">' +
                        '<a href="#" class="alert-link-ami">' + emailTrouve + '</a>' +
                        '</div>')
                });

                if(nb==0){
                    $("#suggestionsAmi").append('<p>Aucun résultat trouvé</p>')
                }

            },
            error:function (data) {
                alert("Error, impossible de se connecter");
            }
        });
    } else {
        $("#suggestionsAmi" ).empty();
    }
});

$("#rechercheMot").keyup(function () {

    if($("#rechercheMot").val()){

        $.ajax({
            type: "GET",
            url: "/search/photos?access_token=" + token + "&tag=" + $("#rechercheMot").val(),
            dataType: "json",
            encode: true,
            success: function(data){
                $("#suggestionsMot").empty();
                var nb = 0;
                $.each(data, function(index, item) {
                    nb = nb + 1;
                    var idTrouve = item._id;
                    var tagTrouve = item.tag;

                    $("#suggestionsMot").append('<div id="' + idTrouve + '" class="alert alert-info alert-link fade in">' +
                        '<a href="#" class="alert-link-mot">' + tagTrouve + '</a>' +
                        '</div>')
                });

                if(nb==0){
                    $("#suggestionsMot").append('<p>Aucun résultat trouvé</p>')
                }

            },
            error:function (data) {
                alert("Error, impossible de se connecter");
            }
        });
    } else {
        $("#suggestionsMot" ).empty();
    }
});

$(document).on('click', '.alert-link-ami', function(){
    $("#suggestionsAmi" ).empty();
    $("#rechercheAmi").val("");

    var idAAjouter = $(this).parent().attr('id');
    var email = $(this).text();

    if(idAAjouter == undefined){
        alert("Utilisateur non trouvé !");
    } else {

        personne = {
            id : idAAjouter,
            email : email
        };

        $("#rechercheAmi").append('<div class="alert alert-success fade in">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>' + email + '</strong>' +
            '</div>');

        //$("#rechercheAmi").valid(false);

    }

    //return false;
});