
var galleryEntry = null;
var galleryNext = function() {
    if (galleryEntry == null || !$(galleryEntry).next()) return;
    viewImage($(galleryEntry).next());
}
var galleryPrev = function() {
    if (galleryEntry == null || !$(galleryEntry).prev()) return;
    viewImage($(galleryEntry).prev());
}

var viewImage = function(img) {
    galleryEntry = img;
    $('#imgviewer').attr('src', $(img).attr('src'));
    if ($('#imgviewerfade').css('display') == 'none')
        $('#imgviewerfade').fadeIn(200);
}
var stopViewingImage = function() {
    galleryEntry = null;
    $('#imgviewerfade').fadeOut(200);
}

var startup = function() {
    $('#imgviewerfade').click(stopViewingImage);
    $('img').each(function() {
        if (!$(this).hasClass("thumbnail")) {
            $(this).click(() => { viewImage(this); })
        }
    });
    document.onkeydown = function(e) {
        switch(e.code) {
            case 'ArrowLeft':
                galleryPrev();
                break;
            case 'ArrowRight':
                galleryNext();
                break;
        }
    };
}
$(document).ready(startup);
