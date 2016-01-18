/**
 * Created by Kazu on 18/01/2016.
 */
$("addImage").click(function(){
    var tags = $("#tags").val();
    var uri = $("#uri").val();
    var owner = $("#owner").val();
    var album = $("#album").val();

    var param = { "tags" : tags, "uri" : uri, "owner" : owner, "album" : album};

    $.post("/inscription", param, function(data){
        alert(data);
    });
});
