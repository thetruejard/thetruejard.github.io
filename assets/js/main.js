
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

var clickImage = function(img, e) {
    viewImage(img);
    if ($(img).attr('id') != 'imgviewer')
        e.stopPropagation();
}
var viewImage = function(img) {
    if ($(img).hasClass('galleryimg'))
        galleryEntry = img;
    let src = $(img).attr('src').replace('.smol.', '.');
    $('#imgviewer').attr('src', src);
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
    let showhide = $(dropdown).children('ddsh').first();
    let arrow = $(dropdown).children('ddarr').first();
    let content = $(dropdown).children('.dropdowncontent').first();
    $(showhide).html('Hide')
    $(arrow).html('&uarr;');
    $(content).css('display', 'block');
    $(dropdown).data('open', 'true');
}
var closeDropdown = function(dropdown, instant=false) {
    let showhide = $(dropdown).children('ddsh').first();
    let arrow = $(dropdown).children('ddarr').first();
    let content = $(dropdown).children('.dropdowncontent').first();
    $(showhide).html('Show')
    $(arrow).html('&darr;');
    //if (instant)
    //    $(content).css('height', '0');
    //else
    //    $(content).animate({ height: '0' }, 200);
    $(content).css('display', 'none');
    $(dropdown).data('open', 'false');
}

var startup = function() {
    $('#imgviewerfade').click(stopViewingImage);
    $('img').each(function() {
        if (!$(this).hasClass("thumbnail")) {
            $(this).click((e) => { clickImage(this, e); })
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
