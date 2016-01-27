$(document).ready(function () {

   // getAlbums();

    var token = localStorage.getItem("token");
    var idAlbumRoot = localStorage.getItem("idAlbumRoot");

    $('a .album').click(function(){
        alert('ALBUM !!!!!!!!!');
        idAlbumRoot = $(this).attr('href');

        $("#explorateur").empty();
        getAlbums();

    });

    $("#addButton").click(function(){

        var folderName = prompt("Nom du nouveau dossier", "Nom");

        if (folderName != null) {
            $("#explorateur").prepend(  '<div class="col-md-2">' +
                                            '<a href="onvera.com" class="album"> ' +
                                                '<i class="fa fa-folder fa-lg"></i><br/>' + folderName +
                                            '</a>' +
                                        '</div>')
        }


    });


    function getAlbums() {
        $.ajax({
                type: "GET",
                url: "/albums/" + idAlbumRoot,
                dataType: "json",
                encode: true
            })
            .success(function (data) {
                alert("Success");

                $.each(data, function (index, item) {

                    var lienAlbumEnfant = item.uri;


                    $("#explorateur").append( '<div class="col-md-2">' +
                                                    '<a href="' + item.id + '" class="album"> ' +
                                                        '<i class="fa fa-folder fa-lg"></i><br/>' + item.nom +
                                                    '</a>' +
                                                '</div>')

                });

                getImages();

            })
            .error(function (data) {
                alert("Error, impossible de se connecter");
            });
    }

    function getImages() {

        $.ajax({
                type: "GET",
                url: "/photos/test",
                dataType: "json",
                encode: true
            })
            .success(function (data) {
                alert("Success");

                $.each(data, function (index, item) {

                    var lienImageGrand = item.uri;
                    var lienImage = item.uri;

                    $("#explorateur").append( '<div class="col-md-2">' +
                                                    '<a href="' + lienImageGrand + '" > ' +
                                                        '<img src="' + lienImage + '" class="img-responsive"/>' +
                                                    '</a>' +
                                                '</div>')

                });
            })
            .error(function (data) {
                alert("Error, impossible de se connecter");
            });
    }

});

