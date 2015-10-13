$(function(){
    // add our one tiny binding
    $("#go-button").click(function(evt) {
        var dest = $("#location-field").val();
        window.location = dest;
    });
});