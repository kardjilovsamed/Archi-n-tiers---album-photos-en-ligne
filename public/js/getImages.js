/**
 * Created by Kazu on 18/01/2016.
 */
$(document).ready(function() {

    $("image").click(function(){
        var tags = $("#tags").val();
        var uri = $("#uri").val();
        var owner = $("#owner").val();
        var album = $("#album").val();

        var param = { "tags" : tags, "uri" : uri, "owner" : owner, "album" : album};

        $.get("/login", param, function(data){
            alert(data);
        });
    });
});
