
var viewImage = function(img) {
    $('#imgviewer').attr('src', $(img).attr('src'));
    $('#imgviewerfade').fadeIn(200);
}
var stopViewingImage = function() {
    $('#imgviewerfade').fadeOut(200);
}

var startup = function() {
    $('#imgviewerfade').click(stopViewingImage);
    $('img').each(function() {
        $(this).click(() => { viewImage(this); })
    });
}
$(document).ready(startup);
