var token = window.localStorage.getItem("token");

//pour les photos
//http://localhost:3000/search/photos?owner= &tag= &access_token=

var rechercher = function () {

    if($("#rechercheAmi").val() || $("#rechercheMot").val()){

        $.ajax({
            type: "GET",
            url: "/search/users?access_token=" + token + "&email=" + $("#rechercheAmi").val(),
            dataType: "json",
            encode: true,
            success: function(data){
                //$("#suggestionsAmi").empty();
                var nb = 0;
                var nbr = 0;
                $("#links").empty();


                $.each(data, function(index, item) {
                    nb = nb + 1;
                    var idTrouve = item._id;

                    $.ajax({
                        type: "GET",
                        url: "/search/photos?owner="+ idTrouve + "&tag=" +  $("#rechercheMot").val() + "&access_token=" + token,
                        dataType: "json",
                        encode: true,
                        success: function(data) {

                            $("#photos").val("");

                            $.each(data, function(index, item) {
                                nbr += 1;
                                /*var img = document.createElement("img");
                                 img.setAttribute("src", item.url);
                                 $("#photos").append(img);*/

                                $("#links").append('<a href="' + item.url + '" title="" data-gallery=""> \n' +
                                    '<img width="75" height="75" src="' + item.url +'">\n</a>');

                            });
                        }
                    });
                });

                /*if(nb==0){
                 $("#photos").append('<p>Aucun résultat trouvé</p>')
                 } else if(nbr==0){
                 $("#photos").append('<p>Aucun résultat trouvé</p>')
                 }*/

            },
            error:function (data) {
                alert("Error, impossible de se connecter");
            }
        });
    } else {
        $("#photos").empty();
    }
};

$("#rechercheAmi").keyup(rechercher);

$("#rechercheMot").keyup(rechercher);

/*$("#rechercheMot").keyup(function () {

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
                    var tagTrouve = item.tags;

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
});*/