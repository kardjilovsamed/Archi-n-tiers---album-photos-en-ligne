$(document).ready(function () {

    var token = window.localStorage.getItem("token");
    var idAlbumRoot = window.localStorage.getItem("albumRoot");

    getAlbums();

    $(document).on('click', '.breadcrumb li', function(){
        idAlbumRoot = $(this).attr('id');
        $("#foldersRow").empty();
        $("#imagesRow").empty();
        getAlbums();
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

        $("#foldersRow").empty();
        $("#imagesRow").empty();

        getAlbums();

        return false;
    });

    $(document).on('click', '.albumParent', function(){

        idAlbumRoot = $(this).attr('id');

        $('#breadcrumb').children().last().remove();
        var foldernameFormer = $('#breadcrumb').children().last().text();
        var folderIdFormer = $('#breadcrumb').children().last().attr('id');
        $('#breadcrumb').children().last().remove();
        $("#breadcrumb").append( '<li id="' + folderIdFormer + '" class="active">' + foldernameFormer + '</li>');


        $("#foldersRow").empty();
        $("#imagesRow").empty();
        getAlbums();


        return false;
    });

    $("#addButton").click(function(){

        var folderName = prompt("Nom du nouveau dossier", "Nom");

        var folderId = "folderId";

        if (folderName != null) {
            $("#foldersRow").prepend( '<div id="' + folderId + '" class="col-xs-6 col-md-2 album dropzone draggable drag-drop yes-drop">' +
                                           '<a href="onvera.com">' +
                                                '<i class="fa fa-folder fa-lg"></i><br/>' + folderName +
                                            '</a>' +
                                        '</div>' );
        }


    });

    function getAlbums() {
        $.ajax({
                type: "GET",
                url: "/albums/" + idAlbumRoot + '/content?access_token='+ token,
                dataType: "json",
                encode: true
            })
            .success(function (data) {

                $.each(data.albums, function (index, item) {

                    var lienAlbumEnfant = item.uri;

                    $("#foldersRow").append( '<div class="col-xs-6 col-md-2">' +
                                                    '<a href="' + item._id + '" id="' + item._id + '" class="album"> ' +
                                                        '<i class="fa fa-folder fa-lg"></i><br/>' + item.nom +
                                                    '</a>' +
                                                '</div>')

                });

                var lienParent = data.parentAlbum._id;

                if(lienParent){
                    $("#explorateur").prepend(  '<div id="' + data.parentAlbum._id + '" class="col-xs-6 col-md-2 albumParent dropzone draggable drag-drop yes-drop">' +
                                                    '<a href="onvera.com">' +
                                                        '<i class="fa fa-folder fa-lg"></i><br/>' + data.parentAlbum.name +
                                                    '</a>' +
                                                '</div>' );
                }

                getImages();

            })
            .error(function (data) {
                alert("Error, impossible de se connecter");
            });
    }

    function getImages() {

        $.ajax({
                type: "GET",
                url: '/albums/' + idAlbumRoot + '/content?access_token=' + token,
                dataType: "json",
                encode: true
            })
            .success(function (data) {
                alert("Success");

                $.each(data.images, function (index, item) {

                    var lienImageGrand = item.uri;
                    var lienImage = item.uri;

                    $("#imagesRow").append( '<div class="col-xs-6 col-md-2">' +
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

