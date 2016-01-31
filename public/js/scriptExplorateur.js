$(document).ready(function () {

   // getAlbums();

    var token = localStorage.getItem("token");
    var idAlbumRoot = localStorage.getItem("idAlbumRoot");



    var isDragging = false;
    $(".img-responsive")
        .mousedown(function() {
            isDragging = false;
        })
        .mousemove(function() {
            isDragging = true;
        })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            if (!wasDragging) {
                $('#imagepreview').attr('src', $(this).attr('src')); // here asign the image to the modal when the user click the enlarge link
                $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
            }
        });


    $(document).on('click', '.breadcrumb li', function(){

        idAlbumRoot = $(this).attr('id');

        //$("#explorateur").empty();
        //getAlbums();


        while($('#breadcrumb').children().last().attr('id') != $(this).attr('id')){
            $('#breadcrumb').children().last().remove();
        }


        var foldernameFormer = $('#breadcrumb').children().last().text();
        var folderIdFormer = $('#breadcrumb').children().last().attr('id');

        $('#breadcrumb').children().last().remove();
        $("#breadcrumb").append( '<li id="' + folderIdFormer + '" class="active">' + foldernameFormer + '</li>');


    });

    $(document).on('click', '.album', function(){

        idAlbumRoot = $(this).attr('id');


        var foldernameFormer = $('#breadcrumb li.active').text();
        var folderIdFormer = $('#breadcrumb li.active').attr('id');

        $('#breadcrumb li.active').remove();

        $('#breadcrumb').append( '<li id="' + folderIdFormer + '"><a href="#" class="breadcrumbLink">' + foldernameFormer + '</a></li>');

        $("#breadcrumb").append( '<li id="' + idAlbumRoot + '" class="active">' + $(this).find('a:first').text() + '</li>');


        //$("#explorateur").empty();

        //getAlbums();

        return false;
    });


    $("#addButton").click(function(){

        var folderName = prompt("Nom du nouveau dossier", "Nom");

        var folderId = "folderId";

        if (folderName != null) {
            $("#explorateur").prepend( '<div id="' + folderId + '" class="col-md-2 album dropzone draggable drag-drop yes-drop">' +
                                           '<a href="onvera.com">' +
                                                '<i class="fa fa-folder fa-lg"></i><br/>' + folderName +
                                            '</a>' +
                                        '</div>' );
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

