
var viewImage = function(img) {
    $('#imgviewer').attr('src', $(img).attr('src'));
    $('#imgviewercontainer').fadeIn(200);
}
var stopViewingImage = function() {
    $('#imgviewercontainer').fadeOut(200);
}

var startup = function() {
    $('#imgviewercontainer').click(stopViewingImage);
    $('img').each(function() {
        $(this).click(() => { viewImage(this); })
    });
}
$(document).ready(startup);
