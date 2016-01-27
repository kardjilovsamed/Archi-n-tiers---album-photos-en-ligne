$(document).ready(function () {

    getAlbums();

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

/*
    getEvent();

    function getEvent() {
        $.ajax({
            type: "GET",
            url: "/firstwar/event",
            dataType: "json",
            encode: true
        })
            .success(function (data) {

                $("#tablePastEvent").empty();
                $("#tableFutureEvent").empty();
                $("#tableAdmin").empty();

                var containsAdmin = false;

                //Boucle pour remplir le tableau des évènements futurs
                $.each(data.futureEvents, function (index, item) {

                    var linkDetails = '/firstwar/detail?event=' + item.event.codeEvent;
                    var linkInscription = '/firstwar/eventInscription?event=' + item.event.codeEvent;
                    var linkDeinscription = '/firstwar/unsubscribe?event=' + item.event.codeEvent;
                    var linkRemove = '/firstwar/delete?event=' + item.event.codeEvent;
                    var linkedit = '/firstwar/edit?event=' + item.event.codeEvent;

                    if(item.present) {
                        $("<tr style='background-color: #5cb85c'>").appendTo($("#tableFutureEvent"))
                            .append($("<td>").text(item.event.date))
                            .append($("<td>").text(item.event.subject))
                            .append($("<td>").text(item.event.name))
                            .append('<td><a class="btn btn-default btn-md" href="' + linkDetails + '"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></a>' +
                                '<a class="btn btn-danger btn-md" href="' + linkDeinscription + '"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></a>' +
                                '</td>')
                    } else {
                        $("<tr>").appendTo($("#tableFutureEvent"))
                            .append($("<td>").text(item.event.date))
                            .append($("<td>").text(item.event.subject))
                            .append($("<td>").text(item.event.name))
                            .append('<td><a class="btn btn-default btn-md" href="' + linkDetails + '"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></a>' +
                                '<a class="btn btn-default btn-md" href="' + linkInscription + '"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></a>' +
                                '</td>')
                    }

                    if(item.admin) {
                        containsAdmin = true;

                        $("<tr style='background-color: #FAEBCC'>").appendTo($("#tableAdmin"))
                            .append($("<td>").text(item.event.date))
                            .append($("<td>").text(item.event.subject))
                            .append($("<td>").text(item.event.name))
                            .append('<td><a class="btn btn-default btn-md" href="' + linkDetails + '"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></a>' +
                                '<a class="btn btn-default btn-md" href="' + linkedit + '"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a>' +
                                '<a class="btn btn-danger btn-md" href="' + linkRemove + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>' +
                                '</td>');
                    }

                });


                //Boucle pour remplir le tableau des évènements passés
                $.each(data.pastEvents, function (index, item) {

                    var linkNote = '/firstwar/note?event=' + item.event.codeEvent;
                    var linkAdmin = '/firstwar/admin?eventId=' + item.event.codeEvent;
                    var linkDetails = '/firstwar/detail?event=' + item.event.codeEvent;
                    var linkRemove = '/firstwar/delete?event=' + item.event.codeEvent;

                    if(item.present) {
                        $("<tr style='background-color: #5cb85c'>").appendTo($("#tablePastEvent"))
                            .append($("<td>").text(item.event.date))
                            .append($("<td>").text(item.event.subject))
                            .append($("<td>").text(item.event.name))
                            .append($("<td>").text(item.avgMark))
                            .append('<td><a class="btn btn-default btn-md" href="' + linkDetails + '"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></a>' +
                                '<a class="btn btn-default btn-md" href="' + linkNote + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' +
                                '</td>');
                    } else {
                        $("<tr>").appendTo($("#tablePastEvent"))
                            .append($("<td>").text(item.event.date))
                            .append($("<td>").text(item.event.subject))
                            .append($("<td>").text(item.event.name))
                            .append($("<td>").text(item.avgMark))
                            .append('<td><a class="btn btn-default btn-md" href="' + linkDetails + '"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></a></td>');
                    }

                    if(item.admin) {
                        containsAdmin = true;

                        $("<tr style='background-color: #b2b2b2'>").appendTo($("#tableAdmin"))
                            .append($("<td>").text(item.event.date))
                            .append($("<td>").text(item.event.subject))
                            .append($("<td>").text(item.event.name))
                            .append('<td><a class="btn btn-default btn-md" href="' + linkDetails + '"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></a>' +
                                '<a class="btn btn-default btn-md" href="' + linkAdmin + '"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a>' +
                                '<a class="btn btn-danger btn-md" href="' + linkRemove + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>' +
                                '</td>');
                    }
                });

                //Supprime le tableau d'admin si il n'y a aucun éléments
                if(!containsAdmin){
                    $("#divAdmin").empty()
                        .append("<div class='alert alert-warning' role='alert'> <p>Vous n'avez pas cr\u00e9\u00e9 d'\u00e9v\u00e8nement pass\u00e9 !</p> </div>");
                }
            })
            .error(function (data) {
                alert("Error, impossible de se connecter");
            });

    }
*/
