$(document).ready(function () {

    var token = window.localStorage.getItem("token");
    var idAlbumRoot = window.localStorage.getItem("albumRoot");

    var idAlbumRootLeVrai = idAlbumRoot;
    var listMecPermis = [];

    $('#breadcrumb').children().last().attr('id', idAlbumRoot);

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

    function getAlbums() {
        $.ajax({
                type: "GET",
                url: "/albums/" + idAlbumRoot + '/content?access_token='+ token,
                dataType: "json",
                encode: true
            })
            .success(function (data) {


                $("#inom").val(data.current.nom);
                $("#idescription").val(data.current.description);
                $("#itags").val(data.current.tags);

                listMecPermis = data.current.permissions;

                $("#mesPartages" ).empty();

                for (index = 0; index < listMecPermis.length; ++index) {
                    $("#mesPartages").append('<div id="' + listMecPermis[index].id + '" class="alert alert-success fade in">' +
                        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                        '<strong>' + listMecPermis[index].email + '</strong>' +
                        '</div>')
                }


                if(data.current.private){
                    $('#ivisibilite').bootstrapToggle('off');
                } else {
                    $('#ivisibilite').bootstrapToggle('on');
                }



                $.each(data.albums, function (index, item) {

                    var lienAlbumEnfant = item.uri;

                    $("#foldersRow").append( '<div id="' + item._id + '" class="col-xs-6 col-md-2 album dropzone draggable drag-drop yes-drop">' +
                                                    '<a href="#"> ' +
                                                        '<i class="fa fa-folder fa-lg"></i><br/>' + item.nom +
                                                    '</a>' +
                                                '</div>')



                });

                $.each(data.photos, function (index, item) {

                    var imageId = item._id;

                    var lienImage = item.url;

                    $("#imagesRow").append( '<div id="' + imageId + '" class="col-xs-6 col-md-2 draggable drag-drop yes-drop">' +
                        '<a href="' + lienImage + '" data-gallery > ' +
                        '<img src="' + lienImage + '" class="img-responsive"/>' +
                        '</a>' +
                        '</div>')

                });


                var lienParent = data.current.parentAlbum;

                if(lienParent){
                    $("#foldersRow").prepend(  '<div id="' + lienParent + '" class="col-xs-6 col-md-2 albumParent dropzone draggable drag-drop yes-drop">' +
                                                    '<a href="">' +
                                                        '<i class="fa fa-folder fa-lg"></i><br/>' + '..' +
                                                    '</a>' +
                                                '</div>' );
                }


            })
            .error(function (data) {
                alert("Error, impossible de se connecter");
            });

    }

    // Post pour ajouter une image
    $("#addImage").submit(function (event) {
        event.preventDefault();

        $("#imageAlbumRoot").attr("value", idAlbumRoot);

        var $form = $(this);
        var formdata = (window.FormData) ? new FormData($form[0]) : null;
        var data = (formdata !== null) ? formdata : $form.serialize();

        $.ajax({
            url: "/upload?access_token=" + token,
            type: "POST",
            contentType: false, // obligatoire pour de l'upload
            processData: false, // obligatoire pour de l'upload
            dataType: 'json', // selon le retour attendu
            data: data,
            success: function (data) {
                alert("Image ajouté avec succès");

                var imageId = data._id;
                var lienImage = data.url;

                $("#imagesRow").append( '<div id="' + imageId + '" class="col-xs-6 col-md-2 draggable drag-drop yes-drop">' +
                    '<a href="' + lienImage + '" data-gallery > ' +
                    '<img src="' + lienImage + '" class="img-responsive"/>' +
                    '</a>' +
                    '</div>')

            },
            error: function (data) {
                alert("Impossible de se connecter");
            }
        })
    });

    $("#validerInfoAlbum").click(function(){

        var privateBool;

        if($("#ivisibilite").parents('.off').length){
            privateBool = true;
        } else {
            privateBool = false;
        }

        var sendInfo = {
            nom: $("#inom").val(),
            description: $("#idescription").val(),
            private: privateBool,
            tags: $("#itags").val()
        };

        $.ajax({
            type: "PUT",
            url: "/albums/" + idAlbumRoot + '?access_token='+ token,
            data: sendInfo,
            dataType: "json",
            encode: true,
            success: function (data) {

                alert("Paramètres enregistrés");

            },
            error: function (data) {
                alert("Impossible de se connecter");
            }
        })

    });


    $("#searchUser").keyup(function () {

        if($("#searchUser").val()){
            $.ajax({
                    type: "GET",
                    url: "/search/users?access_token=" + token + "&email=" + $("#searchUser").val(),
                    dataType: "json",
                    encode: true
                })
                .success(function (data) {

                    $("#resultatRecherche" ).empty();

                    var nb = 0;

                    $.each(data, function(index, item) {

                        nb = nb + 1;

                        var idTrouve = item._id;
                        var emailTrouve = item.email;

                        $("#resultatRecherche").append('<div id="' + idTrouve + '" class="alert alert-info alert-link fade in">' +
                            '<a href="#" class="alert-link">' + emailTrouve + '</a>' +
                            '</div>')

                    });

                    if(nb==0){
                        $("#resultatRecherche").append('<p>Aucun résultat trouvé</p>')
                    }

                })
                .error(function (data) {
                    alert("Error, impossible de se connecter");
                });
        } else {
            $("#resultatRecherche" ).empty();
        }


    });

    $(document).on('click', '.alert-link', function(){
        $("#resultatRecherche" ).empty();
        $("#searchUser").val("");

        var idAAjouter = $(this).parent().attr('id');
        var email = $(this).text();

        var isPersnneDejaDansLaListe = false;

        for (index = 0; index < listMecPermis.length; ++index) {
            if(listMecPermis[index].id == idAAjouter){
                isPersnneDejaDansLaListe = true;
            }
        }


        if(isPersnneDejaDansLaListe){

            alert("Vous avez déjà partagé ce dossier avec cet utilisateur !");

        } else {

            var personne = {
                id : idAAjouter,
                email : email
            };

            listMecPermis.push(personne);

            var sendInfo = {
                permissions: JSON.stringify(listMecPermis)
            };

            $.ajax({
                    type: "PUT",
                    url: "/albums/" + idAlbumRoot + '?access_token='+ token,
                    data: sendInfo,
                    dataType: "json",
                    encode: true,
                    success: function (data) {

                        $("#mesPartages").append('<div class="alert alert-success fade in">' +
                            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                            '<strong>' + email + '</strong>' +
                            '</div>')

                    }
                })
                .error(function (data) {
                    alert("Error, impossible de se connecter");
                });
        }


        return false;
    });



    $(document).on('close.bs.alert', '.alert', function(){

        var currentID = $(this).attr('id');
        var email = $(this).text();

        for (index = 0; index < listMecPermis.length; ++index) {

            if(listMecPermis[index].id == currentID){
                listMecPermis.splice(index, 1);
                break;
            }
        }

        var sendInfo = {
            permissions: JSON.stringify(listMecPermis)
        };

        $.ajax({
            type: "PUT",
            url: "/albums/" + idAlbumRoot + '?access_token='+ token,
            data: sendInfo,
            dataType: "json",
            encode: true,
            success: function (data) {
            }
        })
        .error(function (data) {
            alert("Error, impossible de se connecter");
        });
    });
});


