$(document).ready(function () {

    var token = window.localStorage.getItem("token");
    var idAlbumRoot = window.localStorage.getItem("albumRoot");

    var idAlbumRootLeVrai = idAlbumRoot;

    $('#breadcrumb').children().last().attr('id', idAlbumRoot);

    getAlbumsFriends();

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
        $("#breadcrumb").append( '<li id="' + idAlbumRoot + '" class="active">' + $(this).text() + '</li>');

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

        if (folderName != null) {

            var folderId = "folderId";

            var sendInfo = {
                nom: folderName,
                private: true,
                parentAlbum: idAlbumRoot
            };

            $.ajax({
                type: "POST",
                url: "/albums?access_token=" + token,
                data: sendInfo,
                dataType: "json",
                encode: true,
                success: function (data) {

                    folderId = data._id;

                    $("#foldersRow").prepend( '<div id="' + folderId + '" class="col-xs-6 col-md-2 album dropzone draggable drag-drop yes-drop">' +
                        '<a href="onvera.com">' +
                        '<i class="fa fa-folder fa-lg"></i><br/>' + folderName +
                        '</a>' +
                        '</div>' );

                },
                error: function (data) {
                    alert("Impossible de se connecter");
                }
            })

        }

    });

    function getAlbumsFriends() {
        $.ajax({
                type: "GET",
                url: "/profile/partage"  + '?access_token='+ token,
                dataType: "json",
                encode: true
            })
            .success(function (data) {

                $.each(data.albums, function (index, item) {

                    var lienAlbumEnfant = item.uri;

                    $("#foldersRow").append( '<div id="' + item._id + '" class="col-xs-6 col-md-2 album dropzone draggable drag-drop yes-drop">' +
                        '<a href="#"> ' +
                        '<i class="fa fa-folder fa-lg"></i><br/>' + item.nom +
                        '</a>' +
                        '</div>')
                });
            })
            .error(function (data) {
                alert("Error, impossible de se connecter");
            });
    }

    function getAlbums() {

        if(idAlbumRoot == idAlbumRootLeVrai) {
            getAlbumsFriends();
        } else {

            $.ajax({
                    type: "GET",
                    url: "/albums/" + idAlbumRoot + '/content?access_token=' + token,
                    dataType: "json",
                    encode: true
                })
                .success(function (data) {


                    $("#inom").val(data.current.nom);
                    $("#idescription").val(data.current.description);


                    $.each(data.albums, function (index, item) {

                        var lienAlbumEnfant = item.uri;

                        $("#foldersRow").append('<div id="' + item._id + '" class="col-xs-6 col-md-2 album dropzone draggable drag-drop yes-drop">' +
                            '<a href="#"> ' +
                            '<i class="fa fa-folder fa-lg"></i><br/>' + item.nom +
                            '</a>' +
                            '</div>')


                    });

                    $.each(data.photos, function (index, item) {

                        var imageId = item._id;

                        var lienImage = item.url;

                        $("#imagesRow").append('<div id="' + imageId + '" class="col-xs-6 col-md-2 draggable drag-drop yes-drop">' +
                            '<a href="' + lienImage + '" data-gallery > ' +
                            '<img src="' + lienImage + '" class="img-responsive"/>' +
                            '</a>' +
                            '</div>')

                    });


                    var lienParent = data.current.parentAlbum;

                    if (lienParent) {
                        $("#foldersRow").prepend('<div id="' + lienParent + '" class="col-xs-6 col-md-2 albumParent dropzone draggable drag-drop yes-drop">' +
                            '<a href="onvera.com">' +
                            '<i class="fa fa-folder fa-lg"></i><br/>' + '..' +
                            '</a>' +
                            '</div>');
                    }


                })
                .error(function (data) {
                    alert("Error, impossible de se connecter");
                });
        }
    }
});


