var token = window.localStorage.getItem("token");

/*var rechercher = function () {
    if($("#rechercheAmi").val() || $("#rechercheMot").val()){
        $.ajax({
            type: "GET",
            url: "/search/users?access_token=" + token + "&email=" + $("#rechercheAmi").val(),
            dataType: "json",
            encode: true,
            success: function(data){
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
                            $.each(data, function(index, item) {
                                nbr += 1;

                                $("#links").append('<a href="' + item.url + '" title="" data-gallery=""> \n' +
                                    '<img width="75" height="75" src="' + item.url +'">\n</a>');
                            });
                        }
                    });
                });
            },
            error:function (data) {
                alert("Error, impossible de se connecter");
            }
        });
    } else {
        $("#photos").empty();
    }
};*/

var rechercher = function () {
    if($("#rechercheAmi").val() != null){
        if ($("#rechercheMot").val() != null){
            $.ajax({
                type: "GET",
                url: "/search/users?access_token=" + token + "&email=" + $("#rechercheAmi").val(),
                dataType: "json",
                encode: true,
                success: function(data){
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

                                $.each(data, function(index, item) {
                                    nbr += 1;

                                    $("#links").append('<a href="' + item.url + '" title="" data-gallery=""> \n' +
                                        '<img width="75" height="75" src="' + item.url +'">\n</a>');
                                });
                            }
                        });
                    });
                },
                error:function (data) {
                    alert("Error, impossible de se connecter");
                }
            });
        } else {
            $("#photos").empty();
        }
    } else if ($("#rechercheMot").val() != null){
        $.ajax({
            type: "GET",
            url: "/search/photos?&tag=" +  $("#rechercheMot").val() + "&access_token=" + token,
            dataType: "json",
            encode: true,
            success: function(data) {

                $("#links").empty();
                //$("#photos").val("");

                $.each(data, function(index, item) {
                    nbr += 1;

                    $("#links").append('<a href="' + item.url + '" title="" data-gallery=""> \n' +
                        '<img width="75" height="75" src="' + item.url +'">\n</a>');
                });
            }
        });
    }
};

$("#rechercheAmi").keyup(rechercher());

$("#rechercheMot").keyup(rechercher());