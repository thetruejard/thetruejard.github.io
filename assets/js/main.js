
var galleryEntry = null;
var galleryNext = function() {
    if (galleryEntry == null || !$(galleryEntry).next()[0])
        return;
    if ($(galleryEntry).next().hasClass('dummy'))
        return;
    viewImage($(galleryEntry).next());
}
var galleryPrev = function() {
    if (galleryEntry == null || !$(galleryEntry).prev()[0]) return;
    viewImage($(galleryEntry).prev());
}

var viewImage = function(img) {
    if ($(img).hasClass('galleryimg'))
        galleryEntry = img;
    $('#imgviewer').attr('src', $(img).attr('src'));
    if ($('#imgviewerfade').css('display') == 'none')
        $('#imgviewerfade').fadeIn(200);
}
var stopViewingImage = function() {
    galleryEntry = null;
    if ($('#imgviewerfade').css('display') != 'none')
        $('#imgviewerfade').fadeOut(200);
}

var initDropdown = function(dropdown) {
    closeDropdown(dropdown, true);
    $(dropdown).click(function() {
        if ($(dropdown).data('open') == 'true')
            closeDropdown(this);
        else
            openDropdown(this);
    });
}
var openDropdown = function(dropdown) {
    let arrow = $(dropdown).children('ddarr').first();
    let content = $(dropdown).children('.dropdowncontent').first();
    $(arrow).html('&uarr;');
    $(content).css('display', 'unset');
    $(content).data('open', 'true');
}
var closeDropdown = function(dropdown, instant=false) {
    let arrow = $(dropdown).children('ddarr').first();
    let content = $(dropdown).children('.dropdowncontent').first();
    $(arrow).html('&darr;');
    //if (instant)
    //    $(content).css('height', '0');
    //else
    //    $(content).animate({ height: '0' }, 200);
    $(content).css('display', 'none');
    $(content).data('open', 'false');
}

var startup = function() {
    $('#imgviewerfade').click(stopViewingImage);
    $('img').each(function() {
        if (!$(this).hasClass("thumbnail")) {
            $(this).click(() => { viewImage(this); })
        }
    });
    $('.dropdown').each(function() {
        initDropdown(this);
    })
    document.onkeydown = function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                galleryPrev();
                break;
            case 'ArrowRight':
                galleryNext();
                break;
            case 'Escape':
                stopViewingImage();
                break;
        }
    };
}
$(document).ready(startup);
