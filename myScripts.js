

// Popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')),
    popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')),
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });


// Prevent empty links to scroll to top
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href="#"]');
    if (link === null) {
        return;
    }
    e.preventDefault();
});

// Toggling sidenav
// $('#menuToggler, .my-navigator').click(function () {
//     var MT = $(this),
//         SNavi = $('#mySidenav'),
//         SNaviPar = SNavi.parent(),
//         SNaviMore = SNavi.find('.MRNV');
//     SNavi.show();
//     SNaviPar.show();
//     MT.addClass('SNexpanded change');
//     SNaviPar.on({
//         click: function (e) {
//             if ($(this).is(e.target) && !$(this).has(e.target).length) {
//                 MT.removeClass("change");
//                 SNaviMore.collapse("hide");
//             }
//         }
//     });
// });

$('.pagesNavigator-icon-switch').click(function () {
    $('#pagesNavigator').toggleClass('normal');
});

/**
 * Custom functions
 */

// Global variables
var winWid = $(window).width(),
    winHei = $(window).height(),
    winInnerWid = $(window).innerWidth(),
    winInnerHei = $(window).innerHeight(),
    winOuterWid = $(window).outerWidth(),
    winOuterHei = $(window).outerHeight();
const bodi = $('body'),
    dateStr = new Date(),

    fixedNavbar = $('#fixedNavbar'),
    webNotifications = $('.notifications-holder'),
    pageSearchInput = $('.page-searcher .search-box__input'),
    searchBoxClearer = $('.page-searcher .search-box__clearer'),
    floatingAudio = $('.floating-audio');

function visible(x) {
    if (x.is(':visible')) {
        return true;
    }
}

function hidden(x) {
    if (x.is(':hidden')) {
        return true;
    }
}

function not_targeted(e, elem) {
    if (!elem.is(e.target) && !elem.has(e.target).length) {
        return true;
    }
    return false;
}

function get_last_class(elem) {
    var classes = elem.attr('class').split(' '),
        classNums = classes.length,
        lastClass = classes[classNums - 1];
    return lastClass;
}
function get_icon_name(icon) {
    let toCheck = icon;
    (!toCheck.hasClass('fa')) && (toCheck = icon.find('.fa:first-child'));
    let iconClasses = toCheck.attr('class').split(' ').filter((el) => {
        return (el.slice(0, 3) == 'fa-');
    });
    return iconClasses;
}

function activate(x) {
    x.addClass('active').siblings().removeClass('active');
}
function disactivateSiblings(x) {
    x.siblings().removeClass('active');
}

$('.active-options > *:not(.no-activeness)').click(function () {
    activate($(this));
});

function select(x) {
    x.addClass('selected').siblings().removeClass('selected');
}

function remove_d_none(x) {
    x.removeClass('d-none');
}

function add_d_none(x) {
    x.addClass('d-none');
}

function scroll_page_to(elem, off, dur) {
    off = off || 50;
    dur = dur || 'fast';
    $('html, body').animate({ scrollTop: elem.offset().top - off }, dur);
}

function scroll_left(elem) {
    elem.scrollLeft(0);
}

function hide_custom_fixed() {
    $('.my-cont-menu, .my-popup').removeClass('working');
}

function getRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
}

// Switch buttons
$('.switch').click(function () {
    $(this).toggleClass('OFF');
});

// Page scroll indicator
$('.toTop').click(function () {
    $('html,body').scrollTop(0);
});
$('.toTop').contextmenu(function (e) {
    e.preventDefault();
    $('html,body').scrollTop($(document).height());;
});

// Search boxes
$('.search-box > span, .search-box-right-icon > button').click(function () {
    $(this).siblings('input').focus();
});
searchBoxClearer.click(function () {
    $(this).parent('.search-box').find('input').val('').focus();
});

/**
 * Inform if the page is ready
 */

function check_page_loaded() {
    const currentPage = location.pathname.toLocaleLowerCase(),
        pagesToNotify = ['chm_songs', 'esg_gallery', 'calendar', 'examples'];
    if (pagesToNotify.some(page => currentPage.includes(page))) {
        $('.web-ready-informer').remove();
        var webReadyInformer = '<div class="informer web-ready-informer">Ready</div>';
        bodi.prepend(webReadyInformer);
        $('.web-ready-informer').addClass('view');
        clearTimeout(timeOutDuration);
        timeOutDuration = setTimeout(() => {
            $('.web-ready-informer').removeClass('view').remove();
        }, 2000);
    }
    // Or (but slow)
    // var fullyLoaded = setInterval(() => {
    // if (document.readyState === 'complete') {
    // clearInterval(fullyLoaded);
    // code...
    // }
    // }, 100);
}
// check_page_loaded();

// Close a fixed element by clicking out of its child nodes
$('.self-close').click(function (e) {
    if (!$(this).has(e.target).length) {
        $(this).fadeOut();
    }
});

/**
 * Hide elements by out click
 */

let winHideCollapse = $('.win-hide.collapse, [data-tocollapse]'),
    winHideCollapseToggler = $('[data-tocollapse]');
function collapse_collapsible() {
    winHideCollapse.collapse('hide');
}
$(document).click(function (e) {
    (visible(winHideCollapse) && (not_targeted(e, winHideCollapse) && not_targeted(e, winHideCollapseToggler))) && collapse_collapsible();
});

// Hide fixed element by outclick
function close_fixHolder(to_Hide) {
    var classes = to_Hide.attr('class').split(' '),
        cls_num = classes.length,
        directionStr = 'fade-to-',
        directioned = false;
    for (let i = 0; i < cls_num; i++) {
        if (classes[i].indexOf(directionStr) > - 1) {
            directioned = true;
            var direction = classes[i].slice(8);
            to_Hide.addClass('fix-hide-' + direction);
            setTimeout(function () {
                to_Hide.removeClass('fix-hide-' + direction);
            }, 400);
        }
    }
    if (to_Hide.find('> #mySidenav').length > 0) {
        to_Hide.addClass('fix-hide-left');
        setTimeout(function () {
            to_Hide.removeClass('fix-hide-left');
        }, 400);
    }
    else if (!directioned) {
        to_Hide.addClass('fix-hide-top');
        setTimeout(function () {
            to_Hide.removeClass('fix-hide-top');
        }, 400);
    }
    setTimeout(function () {
        to_Hide.css({ display: 'none' });
    }, 400);
}

$('.fix-holder').click(function (e) {
    let toCheck = $(this);
    if (toCheck.is(e.target) && !toCheck.has(e.target).length) {
        close_fixHolder(toCheck);
    }
});

/**
 * Show/Hide loading motions
 */

function loading() {
    $('.Loading_fix').css({ visibility: 'visible' });
    setTimeout(function () {
        $('.Loading_fix').css({ visibility: 'hidden' });
    }, 3000);
}

function close_loading() {
    $('.Loading_fix').css({ visibility: 'hidden' });
}

// Prevent reloading when same page link in clicked
$('.Here').click(function () {
    $('body').append('<div class="pageHere">You are here</div>');
    setTimeout(function () {
        $('.pageHere').remove();
    }, 2000);
    $('.pageHere').click(function () {
        $(this).fadeOut(function () {
            $(this).remove();
        });
    });
});

/**
 * Collapsing related elements
 */

function toggle_next() {
    var toggler_Elem = $(this),
        toggling_Elem = toggler_Elem.next();
    toggling_Elem.collapse('toggle');
}
$('.toggle-next').click(toggle_next);

function toggle_child() {
    var toggler_Elem = $(this),
        toggling_Elem = toggler_Elem.find('> .collapse:first-child');
    toggling_Elem.collapse('toggle');
}
$('.toggle-child').click(toggle_child);

function toggle_direct() {
    var toggler_Elem = $(this),
        toggling_Elem = toggler_Elem.find('> .collapse');
    toggling_Elem.collapse('toggle');
}
$('.toggle-direct').click(toggle_direct);

function toggle_parent() {
    var toggler_Elem = $(this),
        toggling_Elem = toggler_Elem.parent('.collapse');
    toggling_Elem.collapse('toggle');
}
$('.toggle-par').click(toggle_parent);

function hide_parent_fix() {
    $(this).parents('.fix-holder').trigger('click');
}
$('.hide-par-fix').click(hide_parent_fix);

// Current playing audio actions
function float_playing_audio() {
    floatingAudio.show();
}
function hide_floated_audio() {
    floatingAudio.fadeOut('fast');
}
function max_floating_audio() {
    floatingAudio.find('.floating-item_icon-tools').toggleClass('working');
    floatingAudio.find('.floating-item_details').collapse('toggle');
}
function min_floating_audio() {
    floatingAudio.find('.floating-item_icon-tools').removeClass('working');
    floatingAudio.find('.floating-item_details').collapse('hide');
}
function toggle_floated_audio_play_state() {
    let audios = document.querySelectorAll('audio');
    Array.from(audios).forEach(aud => {
        if (!aud.paused) {
            aud.pause();
            $('.floating-audio .floating-item_icon-tools .media-play-pause-icon, .music-controlls__player').removeClass('fa-pause').addClass('fa-play');
        } else {
            $('#pageAudioPlayer')[0].play();
            $('.floating-audio .floating-item_icon-tools .media-play-pause-icon, .music-controlls__player').removeClass('fa-play').addClass('fa-pause');
        }
    });
}
function stop_hide_floated_audio() {
    let audios = document.querySelectorAll('audio');
    Array.from(audios).forEach(aud => {
        aud.pause();
    });
    $('.floating-audio .floating-item_icon-tools .media-play-pause-icon, .music-controlls__player').removeClass('fa-pause').addClass('fa-play');
    min_floating_audio();
    hide_floated_audio();
}

// $(document).on({
//     contextmenu: function (e) {
//         e.preventDefault();
//         if (hidden(floatingAudio)) {
//             float_playing_audio();
//         } else {
//             hide_floated_audio();
//         }
//     }
// });

// function slide_up_par(x) {
//     var toSlideUp = x;
//     toSlideUp.slideUp();
// }
$('.my-alert-closer').click(function () {
    $(this).parents('.my-alert').slideUp();
});

function go_back() {
    window.history.back();
}
$('.go-back').click(go_back);

/**
 * Toggle specific elements
 */

// Toggling custom elements
$('[data-totoggle]').click(function () {
    var elem_eddress = $(this).attr('data-totoggle'),
        elem = $('' + elem_eddress);
    if (elem.length > 0) {
        if (elem.is(':visible')) {
            elem.hide();
        }
        else {
            elem.show();
        }
    }
});

// Collapsing custom elements
$('[data-tocollapse]').click(function () {
    var elem_eddress = $(this).attr('data-tocollapse'),
        elem = $('' + elem_eddress);
    elem.collapse('show');
});

// Custom popups
$('[data-topopup]').click(function (e) {
    var elem_eddress = $(this).attr('data-topopup'),
        elem = $('' + elem_eddress);
    if (elem.length > 0) {
        show_custom_popup(e, elem);
    }
});

// Scroll to the corresponding attributed class or id
$('[data-scrollto]').click(function () {
    var elem_eddress = $(this).attr('data-scrollto'),
        available_checker = $('' + elem_eddress).length,
        winHei = $(window).height();
    if (available_checker < 1) {
        alert('There\'s no such element in the page');
    }
    else {
        scroll_page_to($('' + elem_eddress), (winHei * (1 / 5)));
    }
});

$('[data-notify]').click(function () {
    var elem_eddress = $(this).attr('data-notify'),
        elem = $('' + elem_eddress);
    clearTimeout(timeOutDuration);
    elem.addClass('view');
    timeOutDuration = setTimeout(() => {
        elem.removeClass('view');
    }, 4000);
});

/**
 * Action notifying
 */

function notify(x) {
    x.addClass('view');
    clearTimeout(timeOutDuration);
    timeOutDuration = setTimeout(() => {
        x.removeClass('view');
    }, 4000);
}

// Notify link copied
function notify_link_copied() {
    $('.copy-link-notice').remove();
    var copyLinkNotice = '<div class="notice copy-link-notice">Link copied</div>';
    bodi.append(copyLinkNotice);
    $('.copy-link-notice').addClass('view');
    clearTimeout(timeOutDuration);
    timeOutDuration = setTimeout(() => {
        $('.copy-link-notice').removeClass('view').remove();
    }, 3000);
}

/**
 * Working on dark theme
 */

//selector
var darkTheme = 'dark-theme';

//state
const thm = localStorage.getItem('theme'),
    thmUser = localStorage.getItem('userTheme');
themeChecker = setInterval(set_auto_theme, 1000);

//on mount
thm && to_dark_theme();
if (thmUser) {
    $('.auto_theme').removeClass('choice');
    $('.themerICN').addClass('choice');
    clearInterval(themeChecker);
}
// thm && $('body').addClass(thm);

//handlers
function change_theme_randomly() {
    clearInterval(themeChecker);
    $('.auto_theme').removeClass('choice');
    $('.themerICN').addClass('choice');
    localStorage.setItem('userTheme', 'yes');
    change_theme();
}
function change_theme() {
    if (!bodi.hasClass(darkTheme)) {
        to_dark_theme();
    } else {
        to_default_theme();
    }
}
function to_dark_theme() {
    bodi.addClass(darkTheme);
    localStorage.setItem('theme', 'dark-theme');
    $('.themerICN > span').removeClass('b-middle').addClass('t-middle');
    $('.theme-name').html('Dark');
}
function to_default_theme() {
    bodi.removeClass(darkTheme);
    localStorage.removeItem('theme');
    $('.themerICN > span').removeClass('t-middle').addClass('b-middle');
    $('.theme-name').html('Light');
}

//events
$('.themerICN > span').click(function () {
    change_theme_randomly();
});
$('.auto_theme').click(function () {
    auto_theme();
});
function auto_theme() {
    $('.themerICN').removeClass('choice');
    $('.auto_theme').addClass('choice');
    localStorage.removeItem('userTheme');
    themeChecker = setInterval(set_auto_theme, 1000);
}
function set_auto_theme() {
    const hour = dateStr.getHours();
    // const minute = dateStr.getMinutes();
    // const second = dateStr.getSeconds();

    if ($('.auto_theme').hasClass('choice')) {
        if ((hour >= 0) && (hour < 6) || (hour > 18)) {
            to_dark_theme();
        }
        else {
            to_default_theme();
        }
    }
}

/**
 * Show & hide web settings
 */

const webSettings = $('.webSettings');

function show_web_settings() {
    webSettings.addClass('set');
    window.history.pushState({ id: 1 }, null, null);
}

function hide_web_settings() {
    webSettings.removeClass('set');
    go_back();
}

$('#settings').click(function () {
    if ($('#Contact').is(':visible')) {
        $('#Contact').hide();
    }
    else {
        if (webSettings.hasClass('set')) {
            hide_web_settings();
        } else {
            show_web_settings();
        }
        scroll_left($('.webSetPG'));
    }
});
$('.settingsCloser').click(function () {
    go_back();
    scroll_left($('.webSetPG'));
    webSettings.addClass('slideOutR');
    setTimeout(() => {
        webSettings.removeClass('set slideOutR');
    }, 200);
});

/**
 * Get web updates
 */

function getUpdates() {
    const UPDATEhour = dateStr.getHours(),
        UPDATEminute = dateStr.getMinutes(),
        UPDATEsec = dateStr.getSeconds(),
        PageUpdated = localStorage.getItem('updated');
    if ((UPDATEhour == (13 || 20)) && UPDATEminute == 0 && UPDATEsec == 0) {
        localStorage.removeItem('updated');
        window.location.reload();
        localStorage.setItem('updated', 'yes');
    }
    else if (!PageUpdated) {
        window.location.reload();
        localStorage.setItem('updated', 'yes');
    }
}
setInterval(getUpdates, 1000);

/**
 * Turn off/on web animations 
 */

// Selectors
var animControler = $('.animation-control').find('> .switch');

// State
const noAnims = localStorage.getItem('noAnims');

// On mount
noAnims && disable_animations();

// handlers
function disable_animations() {
    $('body').addClass('no-animation');
    animControler.addClass('OFF');
}
function enable_animations() {
    $('body').removeClass('no-animation');
    animControler.removeClass('OFF');
}

// Event
animControler.click(function () {
    if ($(this).hasClass('OFF')) {
        localStorage.setItem('noAnims', 'yes');
        $('body').addClass('no-animation');
    }
    else {
        localStorage.removeItem('noAnims');
        $('body').removeClass('no-animation');
    }
});

/**
 * Turn off/on web tips
 */

// Selectors
var tipsControler = $('.tips-control').find('> .switch');

// State
const showTips = localStorage.getItem('webGuide');

// On mount
showTips && enable_tips();

// handlers
function disable_tips() {
    $('.webGuide-fix').hide();
    tipsControler.addClass('OFF');
}
function enable_tips() {
    $('.webGuide-fix').show();
    tipsControler.removeClass('OFF');
}

// Event
tipsControler.click(function () {
    if (!$(this).hasClass('OFF')) {
        localStorage.setItem('webGuide', 'yes');
        $('.webGuide-fix').show();
    }
    else {
        localStorage.removeItem('webGuide');
        $('.webGuide-fix').hide();
    }
});

setInterval(() => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
        day = dayNames[dateStr.getDay()];
    $('.timeShow > span').html(day);
}, 1000);

/**
 * Reset web settings
 */

function reset_web() {
    disable_tips();
    localStorage.removeItem('webGuide');
    auto_theme();
    enable_animations();
    localStorage.removeItem('noAnims');
    // Notify action
    $('.web-reset-notice').remove();
    var webResetNotice = '<div class="notice web-reset-notice">Web settings reset</div>';
    bodi.append(webResetNotice);
    $('.web-reset-notice').addClass('view');
    clearTimeout(timeOutDuration);
    timeOutDuration = setTimeout(() => {
        $('.web-reset-notice').removeClass('view').remove();
    }, 4000);
}

/**
 * Show web terms
 */

function show_terms() {
    $('.webTerms').parent().show();
}

// Remove list's options
document.onclick = function (e) {
    hide_custom_fixed();
    listElements = document.querySelectorAll('.my-list > li');
    listElements.forEach((el) => {
        var optionsContainer = el.querySelector(':scope > span');
        if (optionsContainer !== e.target && !optionsContainer.contains(e.target) || (el == e.target && el.classList.contains('active'))) {
            el.classList.remove('active');
        }
    });
}

/**
 * Moving/Dragging fixed elements
 */

var fixDragger = $('.fix-dragger');
var canDrag = false;
var toDragOnLeft = false;
var initialToDragTop;
var initialToDragLeft;
var currentToDragTop;
var currentToDragLeft;
var initialMouseTop;
var currentMouseTop;
var initialMouseLeft;
var currentMouseLeft;
var initialTStamp;
var finalTStamp;
var finalMouseLeft;

fixDragger.on({
    mousedown: function (e) {
        var toDrag = $(this).closest('.fix-draggable');
        var currentTopDiff;
        var currentLeftDiff;
        initialToDragTop = toDrag.position().top;
        initialToDragLeft = toDrag.position().left;
        initialMouseTop = e.clientY;
        initialMouseLeft = e.clientX;
        toDrag.addClass('trans-0 dragging');
        canDrag = true;
        initialTStamp = e.timeStamp;

        $(document).on({
            mousemove: function (e) {
                if (canDrag && toDrag.hasClass('dragging')) {
                    currentMouseTop = e.clientY;
                    currentMouseLeft = e.clientX;
                    currentTopDiff = initialMouseTop - currentMouseTop;
                    currentLeftDiff = initialMouseLeft - currentMouseLeft;
                    currentToDragTop = initialToDragTop - currentTopDiff;
                    currentToDragLeft = initialToDragLeft - currentLeftDiff;
                    if (currentToDragTop < 0) {
                        currentToDragTop = 0;
                    }
                    if (currentToDragLeft < 0) {
                        currentToDragLeft = 0;
                    }
                    if (currentToDragLeft + toDrag.width() > $(window).width()) {
                        currentToDragLeft = $(window).innerWidth() - toDrag.width();
                    }
                    toDrag.css({ top: currentToDragTop, left: currentToDragLeft });
                }
            },
            mouseup: function (e) {
                if (canDrag && toDrag.hasClass('dragging')) {
                    toDrag.removeClass('trans-0 dragging');
                    var toDragWid = toDrag.width();
                    var screenWid = $(window).innerWidth();
                    var toDragHei = toDrag.height();
                    var screenHei = $(window).height();
                    finalMouseLeft = e.clientX;
                    var mouseLeftDiff = finalMouseLeft - initialMouseLeft;
                    finalTStamp = e.timeStamp;
                    var timeStampDiff = finalTStamp - initialTStamp;
                    // Determine element's position
                    if (initialToDragLeft <= 100) {
                        toDragOnLeft = true;
                    }
                    else {
                        toDragOnLeft = false;
                    }
                    // Move element to specified position
                    if (toDrag.hasClass('drag-to-left') || toDrag.hasClass('drag-to-right')) {
                        if (toDrag.hasClass('drag-to-left')) {
                            toDrag.css({ left: 0 });
                        }
                        else if (toDrag.hasClass('drag-to-right')) {
                            toDrag.css({ left: (screenWid - toDragWid) });
                        }
                    }
                    // Move element if pulled quickly
                    else if (timeStampDiff < 300) {
                        if ((mouseLeftDiff < 0) && !toDragOnLeft) {
                            if (mouseLeftDiff < -100) {
                                toDrag.css({ left: 0 });
                                toDragOnLeft = true;
                            }
                            else {
                                toDrag.css({ left: (screenWid - toDragWid) });
                            }
                        }
                        if ((mouseLeftDiff > 0) && toDragOnLeft) {
                            if (mouseLeftDiff > 100) {
                                toDrag.css({ left: (screenWid - toDragWid) });
                                toDragOnLeft = false;
                            }
                            else {
                                toDrag.css({ left: 0 });
                            }
                        }
                    }
                    // Move element if pulled past half of the screen
                    else if (((currentToDragLeft + (toDragWid / 2)) < (screenWid / 2))) {
                        toDrag.css({ left: 0 });
                    }
                    else if (((currentToDragLeft + (toDragWid / 2)) > (screenWid / 2))) {
                        toDrag.css({ left: (screenWid - toDragWid) });
                    }
                    if (toDrag.hasClass('drag-to-bottom')) {
                        var newToDragTop = screenHei - toDragHei;
                        toDrag.css({ top: newToDragTop });
                    }
                    else {
                        toDrag.css({ top: 0 });
                    }
                    canDrag = false;
                }
                initialToDragTop = undefined;
                initialToDragLeft = undefined;
                currentToDragTop = undefined;
                currentToDragLeft = undefined;
                initialMouseTop = undefined;
                currentMouseTop = undefined;
                initialMouseLeft = undefined;
                currentMouseLeft = undefined;
                initialTStamp = undefined;
                finalTStamp = undefined;
                finalMouseLeft = undefined;
            }
        });
    },
});

/**
 * Toggle custom menu
 */

function show_custom_menu(e, theMenu) {
    var theMenuPositX = e.clientX,
        theMenuPositY = e.clientY,
        theMenuWid = theMenu.width(),
        theMenuHei = theMenu.height(),
        winWidth = $(window).width(),
        winHeight = $(window).height();
    if ((theMenuPositX + theMenuWid) > winWidth) {
        theMenuPositX = winWidth - (theMenuWid + 15);
    }
    if ((theMenuPositY + theMenuHei) > winHeight) {
        theMenuPositY = winHeight - (theMenuHei + 30);
    }
    e.preventDefault();
    setTimeout(() => {
        theMenu.addClass('working').css({ top: theMenuPositY, left: theMenuPositX });
    }, 1);
}

/**
 * Toggle custom popup
 */

function show_custom_popup(e, thePopup) {
    var thePopupPositX = e.clientX,
        thePopupPositY = e.clientY,
        thePopupWid = thePopup.width(),
        thePopupHei = thePopup.height(),
        winWidth = $(window).width(),
        winHeight = $(window).height();
    if ((thePopupPositX + thePopupWid) > winWidth) {
        thePopupPositX = winWidth - (thePopupWid + 30);
    }
    if ((thePopupPositY + thePopupHei) > winHeight) {
        thePopupPositY = winHeight - (thePopupHei + 30);
    }
    e.preventDefault();
    setTimeout(() => {
        thePopup.addClass('working').css({ top: thePopupPositY });;
        if (winWidth > 576) {
            thePopup.css({ left: thePopupPositX });
        }
    }, 1);
}

/**
 * Count down function
 */

var countSpeed = 10;
var countInterval;

function count_down(minm, output) {
    var maxm = minm + 100;
    function the_count() {
        maxm--;
        if (maxm <= (minm + 20)) {
            countSpeed += 7;
        }
        output.html(maxm);
        clearInterval(countInterval);
        countInterval = setInterval(() => {
            the_count();
        }, countSpeed);
        if (maxm == minm) {
            clearInterval(countInterval);
        }
    }
    the_count();
}

/**
 * Count up function
 */

function count_up(maxm, output) {
    var minm = maxm - 100;
    function the_count() {
        minm++;
        if (minm >= (maxm - 20)) {
            countSpeed += 7;
        }
        output.html(minm);
        clearInterval(countInterval);
        countInterval = setInterval(() => {
            the_count();
        }, countSpeed);
        if (maxm == minm) {
            clearInterval(countInterval);
        }
    }
    the_count();
}

/**
 * Show data statistics on circular chart
 */

function stats_chart_count(chart, value) {
    var diskMax = 100, // Max number for a full ring
        nthDisk1 = diskMax / 8,
        nthDisk3 = nthDisk1 * 3,
        nthDisk5 = nthDisk1 * 5,
        nthDisk7 = nthDisk1 * 7;
    // Counting the number of full circles and deduce them to one
    for (let n = 0; n < 10000; n++) {
        if (value >= (diskMax * n) && value < (diskMax * (n + 1))) {
            value = value - (diskMax * n);
        }
    }
    // adjusting disk occupation
    if (value <= nthDisk1) {
        var level1 = 50 + (value * 4);
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, ' + level1 + '% 0, 50% 50%, 50% 50%, 50% 50%, 50% 50%)' });
    }
    if (value > nthDisk1 && value <= nthDisk3) {
        var level2 = (value - nthDisk1) * 4;
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% ' + level2 + '%, 50% 50%, 50% 50%, 50% 50%)' });
    }
    if (value > nthDisk3 && value <= nthDisk5) {
        var level3 = 100 - ((value - nthDisk3) * 4);
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, ' + level3 + '% 100%, 50% 50%, 50% 50%)' });
    }
    if (value > nthDisk5 && value <= nthDisk7) {
        var level4 = 100 - ((value - nthDisk5) * 4);
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0% 100%, 0% ' + level4 + '%, 50% 50%)' });
    }
    if (value > nthDisk7 && value <= 1000) {
        var level5 = (value - nthDisk7) * 4;
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0% 100%, 0% 0%, ' + level5 + '% 0)' });
    }
}

/**
 * Page content searcher
 */

const pageContentList = $('.page-content-search-result');
$('.page-search-box > .search-box__input').on({
    keyup: function () {
        let str = $(this).val().toLowerCase();
        pageContentList.find('li').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(str) > - 1);
        });
        let foundResults = pageContentList.find('li:visible').length;
        if (foundResults < 1) {
            pageContentList.find('.not-found').remove();
            // Create a not-found text
            let notFoundNotice = document.createElement('div');
            notFoundNotice.textContent = 'Not found';
            notFoundNotice.classList.add('grid-center', 'not-found');
            pageContentList.find('ul').append(notFoundNotice);
        } else {
            pageContentList.find('.not-found').remove();
        }
    }
});

pageContentList.find('li').click(() => pageContentList.collapse('hide'));

/**
 * Copy a list
 */

// function copy_list(aList, listTitle) {
//     listTitle ? listTitle = listTitle + '\n------------------\n\n' : listTitle = 'My list\n------------------\n\n';
//     var listSongs = aList.querySelectorAll('li');
//     var listContainer = document.createElement('ul');
//     listContainer.innerHTML = listTitle;
//     listSongs.forEach((el, inx) => {
//         var listName = el.textContent;
//         listName = listName.replace(/^\s+|\s+$/g, '');
//         var songListElement = (inx + 1) +'. '+listName +'\n';
//         var songListElementHolder = document.createElement('li');
//         songListElementHolder.innerHTML = songListElement;
//         listContainer.appendChild(songListElementHolder);
//     });
//     var theList = listContainer.innerText;
//     navigator.clipboard.writeText(theList);
//     setTimeout(() => {
//         alert('List copied successively.');
//     }, 1);
// }

// In jQuery

function copy_list(aList, listTitle) {
    listTitle ? listTitle = listTitle + '\n------------------\n\n' : listTitle = 'My list\n------------------\n\n';
    var $listSongs = $(aList).find('li'),
        $listContainer = $('<ul></ul>').html(listTitle);

    $listSongs.each(function (inx, el) {
        var listName = $(el).text().trim(),
            songListElement = (inx + 1) + '. ' + listName + '\n',
            $songListElementHolder = $('<li></li>').html(songListElement);
        $listContainer.append($songListElementHolder);
    });

    var theList = $listContainer.text();
    navigator.clipboard.writeText(theList);
    setTimeout(function () {
        alert('List copied successively.');
    }, 1);
}

/**
 * Sort a list
 */

// Ascending
function sort_list(aList) {
    const listItems = Array.from(aList.getElementsByTagName('li'));
    // Sort the list items alphabetically (after trimming);
    const sortedItems = listItems.sort((a, b) => {
        return a.textContent.replace(/^\s+|\s+$/g, '').localeCompare(b.textContent.replace(/^\s+|\s+$/g, ''));
    });
    // Remove existing list items
    while (aList.firstChild) {
        aList.removeChild(aList.firstChild);
    }
    // Append the sorted list items back
    sortedItems.forEach(item => {
        aList.appendChild(item);
    });
}
// Descending
function sort_list_descending(aList) {
    const listItems = Array.from(aList.getElementsByTagName('li'));
    const sortedItems = listItems.sort((a, b) => {
        return b.textContent.replace(/^\s+|\s+$/g, '').localeCompare(a.textContent.replace(/^\s+|\s+$/g, ''));
    });
    while (aList.firstChild) {
        aList.removeChild(aList.firstChild);
    }
    sortedItems.forEach(item => {
        aList.appendChild(item);
    });
}

/**
 * Save/Print an element
 */

function printElem(dt, w, h) {
    var content = dt.html(),
        toSave = window.open('', '', 'width=' + w + ', height=' + h),
        styles1 = '<link rel="stylesheet" type="text/css" href="all.css">',
        styles2 = '<link rel="stylesheet" type="text/css" href="styles/chms.css">',
        bootstrap = '<link rel="stylesheet" href="bootstrap/bootstrap.min.css">';
    toSave.document.write(styles1);
    toSave.document.write(styles2);
    toSave.document.write(bootstrap);
    toSave.document.write(content);
    toSave.document.close();
    setTimeout(() => {
        toSave.print();
    }, 2000);
}
$('.printThis').click(function () {
    printElem($('.SongsHome'));
});

// prevents the addition of a new history entry when the page loads
function preventHistory() {
    history.replaceState(null, null, document.URL);
}


// Custom functions

/**
 * Toggle IndexNavi when the user scrolls
 */

var prevPosit = scrollY; // Or window.scrollY

window.onscroll = function () { // or "onscroll = function() {"
    const circularNavHeight = $('.pagesNavigator-holder').outerHeight();
    const scrolledDistance = window.scrollY;
    let circularNavOffset = circularNavHeight - scrolledDistance;

    let currentPosit = scrollY,
        webNavigators = $("nav.navbar, #fixedNavbar");
        // otsFIXED = $(".right-design, .navigate, .left-design, .nav-chms, #mySidenav, .randomSCH, .emphasizeCorres, #aniver, #aniv, .galrImg-sideDisplayer, .galleryFilter");
    if ((currentPosit > prevPosit + 30) || circularNavOffset > 0) {
        webNavigators.removeClass('floated');
        // otsFIXED.addClass('NewTop');
    }
    else if (currentPosit < prevPosit && circularNavOffset <= 0) {
        webNavigators.addClass('floated');
        // otsFIXED.removeClass('NewTop');
    }
    prevPosit = currentPosit;
}

// Click corresponding link inside

function clickTheLink() {
    $(this).find('a')[0].click();
}

function targetTheLink(e) {
    if ($(this).is(e.target) && !$(this).has(e.target).length) {
        $(this).find('a')[0].click();
    }
}
$('.target-link').click(targetTheLink);

function targetInput(e) {
    if ($(this).is(e.target) && !$(this).has(e.target).length) {
        $(this).find('input')[0].focus();
    }
}
$('.target-input').click(targetInput);

/**
* Scroll tracker
*/

const scrollTrackTitle = $('.scroll-track-titles'),
    scrollTrackContent = $('.scroll-track-content');
if (scrollTrackContent.length > 0) {
    var prevScrollPosition = scrollY;
    $(document).on({
        scroll: function () {
            let trackTitleOffTop = scrollTrackContent[0].getBoundingClientRect().top - $(window).height();
            // Making scroll trackers/titles
            const trackTitles = [];
            scrollTrackTitle.find('[track-scroll]').each(function () {
                trackTitles.push($(this).attr('href'));
            });
            // When contents reaches the view port
            if (trackTitleOffTop < 0) {
                let currentScrollPosition = scrollY,
                    midWinHeight = $(window).height() / 2;
                // Toggling activeness
                trackTitles.forEach((el, inx) => {
                    let posit = $(el)[0].getBoundingClientRect().top - $(window).height(),
                        prevTitle = trackTitles[inx - 1];
                    // Activating in-view
                    if (posit < - (100 + midWinHeight) && posit > - (200 + midWinHeight)) {
                        $('[track-scroll][href="' + el + '"]').addClass('active');
                        trackTitles.forEach(title => {
                            if (title !== el) {
                                $('[track-scroll][href="' + title + '"]').removeClass('active');
                            }
                        });
                    }
                    // Activating previous when current is out of view
                    if (posit > 0 && prevTitle) {
                        const prevBottomPosit = scrollY - $(prevTitle).offset().top + $(window).height() - $(prevTitle).height(),
                            prevTopPosit = $(prevTitle)[0].getBoundingClientRect().top - $(window).height();
                        if (prevTopPosit < 0 && prevBottomPosit < 0 && prevScrollPosition > currentScrollPosition) {
                            $('[track-scroll][href="' + trackTitles[inx] + '"]').removeClass('active');
                            $('[track-scroll][href="' + trackTitles[inx - 1] + '"]').addClass('active');
                        }
                    }
                });
                prevScrollPosition = currentScrollPosition;
            }
        }
    });
}

/**
* Switch between horizontal grids by click
*/

$('.item-swicher.left').click(function () {
    var itemsWrapper = $(this).parents('.g-items'),
        gridInView = itemsWrapper.find('.grid-item.view'),
        currentSwitcher = $(this),
        oppositeSwitcher = currentSwitcher.next();
    if (gridInView.prev().hasClass('grid-item')) {
        gridInView.removeClass('view').prev().addClass('view');
        gridInView = itemsWrapper.find('.grid-item.view');
        var offLeft = gridInView[0].offsetLeft;
        itemsWrapper.scrollLeft(offLeft);
    }
    if (!gridInView.prev().hasClass('grid-item')) {
        currentSwitcher.addClass('visible-n');
    }
    if (oppositeSwitcher.hasClass('visible-n')) {
        oppositeSwitcher.removeClass('visible-n');
    }
});
$('.item-swicher.right').click(function () {
    var itemsWrapper = $(this).parents('.g-items'),
        gridInView = itemsWrapper.find('.grid-item.view'),
        currentSwitcher = $(this),
        oppositeSwitcher = currentSwitcher.prev();
    if (gridInView.next().hasClass('grid-item')) {
        gridInView.removeClass('view').next().addClass('view');
        gridInView = itemsWrapper.find('.grid-item.view');
        var offLeft = gridInView[0].offsetLeft;
        itemsWrapper.scrollLeft(offLeft);
    }
    if (!gridInView.next().hasClass('grid-item')) {
        currentSwitcher.addClass('visible-n');
    }
    if (oppositeSwitcher.hasClass('visible-n')) {
        oppositeSwitcher.removeClass('visible-n');
    }
});

/**
* Switch between horizontal grids by arrows
*/

$(document).on({
    keyup: function (e) {
        var gItemsWrapper = $('.g-items');
        if ((winWid > 576) && gItemsWrapper.is(':visible')) {
            if (e.key == 'ArrowLeft') {
                var gInView = gItemsWrapper.find('.grid-item.view'),
                    leftSwitcher = gItemsWrapper.find('.item-swicher.left'),
                    oppSwitcher = leftSwitcher.next();
                if (gInView.prev().hasClass('grid-item')) {
                    gInView.removeClass('view').prev().addClass('view');
                    gInView = gItemsWrapper.find('.grid-item.view');
                    var offLeft = gInView[0].offsetLeft;
                    gItemsWrapper.scrollLeft(offLeft);
                }
                if (!gInView.prev().hasClass('grid-item')) {
                    leftSwitcher.addClass('visible-n');
                }
                if (oppSwitcher.hasClass('visible-n')) {
                    oppSwitcher.removeClass('visible-n');
                }
            }
            if (e.key == 'ArrowRight') {
                var rightSwitcher = gItemsWrapper.find('.item-swicher.right'),
                    oppSwitcher = rightSwitcher.prev(),
                    gInView = gItemsWrapper.find('.grid-item.view');
                if (gInView.next().hasClass('grid-item')) {
                    gInView.removeClass('view').next().addClass('view');
                    gInView = gItemsWrapper.find('.grid-item.view');
                    var offLeft = gInView[0].offsetLeft;
                    gItemsWrapper.scrollLeft(offLeft);
                }
                if (!gInView.next().hasClass('grid-item')) {
                    rightSwitcher.addClass('visible-n');
                }
                if (oppSwitcher.hasClass('visible-n')) {
                    oppSwitcher.removeClass('visible-n');
                }
            }
        }
    }
});

/**
 * Switch between horizontal grids by pagers
 */

$('.item-pager > button').click(function () {
    var pageIndocator = $(this),
        pagerNum = pageIndocator.index() + 1,
        pagesHolder = pageIndocator.parents('.g-items'),
        coressPage = pagesHolder.find('.grid-item:nth-child(' + pagerNum + ')');
    coressPage.addClass('view');
    coressPage.siblings().removeClass('view');
    pagesHolder.scrollLeft(coressPage[0].offsetLeft);
});

/**
 * Switch between horizontal grids by swipe
 */

function indicate_viewing_grid() {
    var scrolling = $(this),
        item = scrolling.find('> .grid-item'),
        offLEFT = scrolling.scrollLeft(),
        min_offLEFT = offLEFT - 10,
        max_offLEFT = offLEFT + 10,
        itemIndicators = scrolling.find('.item-pager');
    $.each(item, function () {
        var itemPosition = $(this)[0].offsetLeft;
        if ((itemPosition > min_offLEFT) && (itemPosition < max_offLEFT)) {
            var inViewItemNum = $(this).index() + 1;
            itemIndicators.find('> button:nth-child(' + inViewItemNum + ')').addClass('view').siblings().removeClass('view');
            if (winWid <= 576) {
                $(this).addClass('view').siblings().removeClass('view');
            }
        }
        else if (winWid <= 576) {
            $(this).removeClass('view');
        }
    });
}

$('.g-items').scroll(indicate_viewing_grid);

/**
 * closing grid items
 */

function close_grids() {
    var grids_wrapper = $(this).parents('.g-items'),
        grids_holder = grids_wrapper.parent();
    if (grids_holder.hasClass('fix-holder')) {
        grids_holder.trigger('click');
    }
    else {
        grids_holder.hide();
    }
}
$('.g-itemsCloser').click(close_grids);

function close_grid_items() {
    var visibleGrids = $('.g-items-holder').filter(function () {
        return $(this).is(':visible');
    }).length;
    if (visibleGrids > 0) {
        $('.g-items-holder').trigger('click');
    }
}
// $('.g-items-holder').click(function (e) {
//     if ($(this).is(e.target) && !$(this).has(e.target).length) {
//         var wrapper = $(this).find('> .g-items');
//         scroll_left(wrapper);
//         setTimeout(() => {
//             wrapper.find('.view').removeClass('view');
//             wrapper.find('.grid-item:first-child').addClass('view');
//             wrapper.find('.item-pager > span:first-child').addClass('view');
//             console.log(wrapper.scrollLeft());
//         }, 2000);
//     }
// });

/**
 * Web settings
 */

$("#settingsMenu").click(function () {
    $('#BTM-Nav').fadeOut();
    $('#mySidenav').parent()[0].click();
    show_web_settings();
});

$('.web-contactor').click(function () {
    // $('#Contact').show();
    $('.contact-us').collapse('show');
    go_back();

});
$(".contClose").click(function () {
    $('#Contact').hide();
    $('#BTM-Nav').fadeIn();
});

// Months conversion functions
function month_num_to_nm(xnum) {
    (xnum < 10) && (xnum = '0' + xnum);
    xnum = String(xnum);
    xnum = xnum.replace('01', 'January');
    xnum = xnum.replace('02', 'February');
    xnum = xnum.replace('03', 'March');
    xnum = xnum.replace('04', 'April');
    xnum = xnum.replace('05', 'May');
    xnum = xnum.replace('06', 'June');
    xnum = xnum.replace('07', 'July');
    xnum = xnum.replace('08', 'August');
    xnum = xnum.replace('09', 'September');
    xnum = xnum.replace('10', 'October');
    xnum = xnum.replace('11', 'November');
    xnum = xnum.replace('12', 'December');
    return xnum;
}
function month_shortNm_to_longNm(xnum) {
    xnum = xnum.replace('Jan', 'January');
    xnum = xnum.replace('Feb', 'February');
    xnum = xnum.replace('Mar', 'March');
    xnum = xnum.replace('Apr', 'April');
    xnum = xnum.replace('May', 'May');
    xnum = xnum.replace('Jun', 'June');
    xnum = xnum.replace('Jul', 'July');
    xnum = xnum.replace('Aug', 'August');
    xnum = xnum.replace('Sep', 'September');
    xnum = xnum.replace('Oct', 'October');
    xnum = xnum.replace('Nov', 'November');
    xnum = xnum.replace('Dec', 'December');
    return xnum;
}
function month_longNm_to_shortNm(xnum) {
    xnum = xnum.replace('January', 'Jan');
    xnum = xnum.replace('February', 'Feb');
    xnum = xnum.replace('March', 'Mar');
    xnum = xnum.replace('April', 'Apr');
    xnum = xnum.replace('May', 'May');
    xnum = xnum.replace('June', 'Jun');
    xnum = xnum.replace('July', 'Jul');
    xnum = xnum.replace('August', 'Aug');
    xnum = xnum.replace('September', 'Sep');
    xnum = xnum.replace('October', 'Oct');
    xnum = xnum.replace('November', 'Nov');
    xnum = xnum.replace('December', 'Dec');
    return xnum;
}

/**
 * Animating mouse gradient over websettings
 */

webSettings.on({
    mousemove: function (e) {
        var move = $(this),
            click_shower = move.find('> .touch-anim'),
            shower_top = e.clientY - (move.offset().top - scrollY),
            shower_left = e.clientX - (move.offset().left);
        // var top_cent = ((shower_top * 100) / move.height());
        click_shower.addClass('move');
        click_shower.css({ left: shower_left, top: shower_top, boxShadow: '0px 0px 50px 5rem var(--white3_cons' });
    },
    mouseleave: function () {
        var move = $(this),
            click_shower = move.find('> .touch-anim');
        click_shower.removeClass('move').css({ boxShadow: '' });
    }
});

/**
 * Focus on web grid items by keyboard
 */

$('[tabindex="0"]').on({
    keyup: function (e) {
        if (e.which == 13) {
            $(this).click();
        }
    }
});

/**
 * Sharing the current page
 */

// $('.sharePage-button').click(function (e) {
//     e.preventDefault();
//     navigator.clipboard.writeText('Hello friend !!\nYou can visit ESG website too. I found this interesting !!\n\n' + window.location.href).then(() => { });
//     navigator.share({
//         title: document.title,
//         text: 'You can visit ESG website too. I found this interesting !!\n',
//         url: window.location.href
//     }).then(() => console.log('Successful share')).catch(error => alert('Error sharing:', error));
// });

/**
 * Change drop menu indicator
 */

function drop_angle(x) {
    if (x.hasClass('fa-angle-down')) {
        x.removeClass('fa-angle-down').addClass('fa-angle-up');
    } else if (x.hasClass('fa-angle-up')) {
        x.removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    if (x.hasClass('fa-angle-left')) {
        x.removeClass('fa-angle-left').addClass('fa-angle-right');
    } else if (x.hasClass('fa-angle-right')) {
        x.removeClass('fa-angle-right').addClass('fa-angle-left');
    }
}

$('.dropAngle').click(function () {
    drop_angle($(this).find('.drop-indicator'));
});

/**
 * Case insensitive match function
 */

// jQuery.expr[':'].icontains = function (a, i, m) {
//     return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
// }
// With accent insensitive
jQuery.expr[':'].icontains = function (a, i, m) {
    return jQuery(a).text().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(m[3].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) >= 0;
}

/**
 * Conditional document events
 */

var searchResultsNum = 0,
    results_checker;

function unselect_SResults() {
    $('.schResults > div:first-child').find('li span').removeClass('bg-myBlue text-light selected');
}

$(document).on({
    keydown: function (e) {

        if (e.ctrlKey && (e.keyCode == 191)) {
            /*  Crtl / to find something */
            visible(sCatSearcher) && hidden(songSearchTool) && sCatSearcher.focus();
            hidden(sCatSearcher) && show_search_tool();
            visible(songSearchTool) && pageSearchInput.focus();
            visible($('.page-search-box')) && ($('.page-search-box').find('.search-box__input').focus() && pageContentList.collapse('show'));
            visible(esgGallerySearchBar) && esgGallerySearchBar.focus();
        }

        /*  Alt h for help */
        if (e.altKey && (e.keyCode == 72)) {
            if (!$('.informer-lg').is(':visible')) {
                show_CHMS_help();
            }
            else if ($('.informer-lg').is(':visible')) {
                hide_CHMS_help();
            }
        }

        /*  Alt N for Notification */
        if (e.altKey && (e.keyCode == 78)) {
            if (!webNotifications.is(':visible')) {
                show_Notif();
            }
            else if (webNotifications.is(':visible')) {
                hide_Notif();
            }
        }

        /*  Alt R for Song Refresh */
        if (e.altKey && (e.keyCode == 82)) {
            refresh_songs();
            notify($('.song-refresh-notice'));
        }

        /*  Alt R for Image Refresh */
        if (e.altKey && (e.keyCode == 82) && esgGallery.length) {
            unfilter_gallery();
            imgFilterAllMatch.removeClass('active');
            refreshImgMvnt();
        }
    },

    keyup: function (e) {
        e.key == 'Escape' && close_grid_items();
        e.key == 'Escape' && hide_custom_fixed();
        e.key == 'Escape' && collapse_collapsible();
        e.key == 'Escape' && hide_web_tips();
        if (e.key == 'Escape' && songSearchTool.is(':visible') && !pageSearchInput.is(':focus')) {
            go_back();
        }
        if ((e.key == 'Escape' && $('input').is(':focus')) || (e.keyCode == 13 && $('input').is(':focus'))) {
            $('input').blur();
        }

        /*  Alt t for theme */
        if (e.altKey && e.key == 't' || e.altKey && (e.key == 'T')) {
            change_theme_randomly();
        }

        /*  Alt s for settings */
        if (e.altKey && e.key == 's' || e.altKey && (e.key == 'S')) {
            e.preventDefault();
            visible(webNotifications) && hide_Notif();
            if (webSettings.is(':hidden')) {
                show_web_settings();
            }
            else if (webSettings.is(':visible')) {
                hide_web_settings();
            }
        }
        /*  Alt g for guide */
        if (e.altKey && e.key == 'g' || e.altKey && (e.key == 'G')) {
            show_guide();
        }

    },
    keypress: function (e) {
        if (e.keyCode == 13 && songSearchTool.is(':visible') && !pageSearchInput.is(':focus') && ($('.schResults > div:first-child').find('.selected').length > 0)) {
            $('.schResults > div:first-child').find('.selected')[0].click();
        }
    }
});

/**
 * Controll/Alt + keys combinations
*/

// Automatic theme
let keysCombination = [];
$(document).on({
    keydown: function (e) {
        keysCombination.push(e.key);
        // Check if "Alt" Key was pressed first
        if (keysCombination[0] == 'Alt') {
            keysCombination.concat(keysCombination);
        }
    },
    keyup: function (e) {
        // Check for the combination (Alt + t and Alt + A)
        var keysAbrev = keysCombination[0] + keysCombination[1] + keysCombination[2]
        if (keysAbrev == 'Altta' || keysAbrev == 'AltTA') {
            e.preventDefault();
            auto_theme();
            // Notify action
            $('.web-theme-notice').remove();
            var webThemeNotice = '<div class="notice web-theme-notice">Auto theme</div>';
            bodi.append(webThemeNotice);
            $('.web-theme-notice').addClass('view');
            clearTimeout(timeOutDuration);
            timeOutDuration = setTimeout(() => {
                $('.web-theme-notice').removeClass('view').remove();
            }, 4000);
        }
        // Remove pressed keys values
        if (e.key == "Alt" || e.key == "Control" || e.key == "Shift") {
            keysCombination = [];
        }
    }
});

/**
 * Working on web tips
 */

const webTip = $('.web-tip');
let webTipsList = [
    { tipElement: $(".toTop"), tipTitle: "Jumper", tipMessage: "Use the \"To top\" tool to quickly jump to the beginning of the page. Also right-click for the opposite" },
    { tipElement: $(".navbar-end #settings > span"), tipTitle: "Web settings", tipMessage: "Easily customize web controls such as the theme, animations, guide, and more. Additionally, you'll find a few key pieces of important information about ESG here" },
];
let allTipsNum = webTipsList.length,
    tipIndex = 0;
// Hide tip
function hide_web_tips() {
    webTip.fadeOut('fast');
}
// Show tip
function show_web_tips(tipsList, tipIndex) {
    if ($(window).width() > 576) {
        var tipToShow = tipsList[tipIndex].tipElement;
        var currentTipIcon = webTip.find('.tip-icon > .fa'),
            currentTipIconName = get_icon_name(currentTipIcon),
            tipToShowIconName = get_icon_name(tipToShow),

            tipToShowPositX = tipToShow[0].getBoundingClientRect().left,
            tipToShowPositY = tipToShow[0].getBoundingClientRect().top,

            webTipWid = webTip.width(),
            webTipHei = webTip.height();
        // Show tip
        hidden(webTip) && webTip.show();
        // Set icon, name and message
        currentTipIcon.removeClass(currentTipIconName).addClass(tipToShowIconName);
        $('.tip-name').html(tipsList[tipIndex].tipTitle);
        $('.tip-message').html(tipsList[tipIndex].tipMessage);
        // Positioning the tip
        if (tipToShowPositX < ($(window).width() / 2) && tipToShowPositY < ($(window).height() / 2)) {
            webTip.removeClass('tip-top-right tip-bottom-left tip-bottom-right').addClass('tip-top-left');
            webTip.css({ left: (tipToShowPositX), top: (tipToShowPositY) });
        }
        if (tipToShowPositX > ($(window).width() / 2) && tipToShowPositY < ($(window).height() / 2)) {
            webTip.removeClass('tip-top-left tip-bottom-left tip-bottom-right').addClass('tip-top-right');
            webTip.css({ left: (tipToShowPositX - webTipWid + 16), top: (tipToShowPositY - 16) });
        }
        if (tipToShowPositX < ($(window).width() / 2) && tipToShowPositY > ($(window).height() / 2)) {
            webTip.removeClass('tip-top-left tip-top-right tip-bottom-right').addClass('tip-bottom-left');
            webTip.css({ left: (tipToShowPositX), top: (tipToShowPositY - webTipHei + 16) });
        }
        if (tipToShowPositX > ($(window).width() / 2) && tipToShowPositY > ($(window).height() / 2)) {
            webTip.removeClass('tip-top-left tip-top-right tip-bottom-left').addClass('tip-bottom-right');
            webTip.css({ left: (tipToShowPositX - webTipWid + 16), top: (tipToShowPositY - webTipHei + 16) });
        }
    } else { hide_web_tips() }
}

// Share ESG songs Download link
$('.shareDIS').click(function shareDIS() {
    navigator.share({
        title: $(this).parent().prev().find('h4:first-child').text(),
        text: 'Download link of ESG song.\n',
        url: document.location.href
    }).then(() => console.log('Successful share')).catch(error => alert('Error sharing:', error));
});
$('.SeeMore').prev().click(function () {
    $('html,body').animate({ scrollTop: $(this).offset().top - 50 }, 'slow');
});

/**
 * Preview a file
*/

function preview_file(previewSpace) {
    let toShow = previewSpace,
        thePreview = toShow.find('iframe');
    thePreview.html('');
    thePreview.attr('src', '');
    let selectedSong = $('.inCAT').find('.Sselected'),
        songLink = selectedSong.find('a').attr('href'),
        songLinkID = songLink.slice((songLink.indexOf('&id=') + 4)),
        previewLink = 'https://drive.google.com/file/d/' + songLinkID + '/preview';
    toShow.show();
    thePreview.attr('src', previewLink);
}

/**
 * Detect back press on website
 * window.onpopstate = function () {}
 * or,
 */

// $(window).on('popstate', function () {
//     visible(sCatWrapper) && out_of_songs();
//     if ($('.ESG_About').hasClass('PersonMaxm'))
//         close_singer();
//     $('.ESG_About').removeClass('PersonMaxm');
//     if (songSearchTool.is(':visible'))
//         close_search_tool();
//     if (webSettings.is(':visible')) {
//         scroll_left($('.webSetPG'));
//         webSettings.addClass('slideOutR');
//         setTimeout(() => {
//             webSettings.removeClass('set slideOutR');
//         }, 200);
//         if ($('.webGuide').is(':visible')) {
//             $('.webGuide').parent().trigger('click');
//         }
//     }
//     visible($('.repertoire')) && close_fixHolder($('.repertoirePar'));
//     visible(imageDisplayer) && close_full_img_displayer();
// });

/**
 * Show event details
 */

// $('.eventDet-imgs > img:nth-child(2)').click(function () {
//     $(this).parent().removeClass('sub3').addClass('sub2');
// });
// $('.eventDet-imgs > img:nth-child(3)').click(function () {
//     $(this).parent().addClass('sub3');
// });
// $('.eventDet-imgs > img:first-child').click(function () {
//     $(this).parent().removeClass('sub2 sub3');
// });
// $('.eventDet-footer').click(function () {
//     $(this).parents('.fix-holder').click();
// });

/**
 * Date dependent functions
 */

let current_year = dateStr.getFullYear(),
    month_str = dateStr.getMonth(),
    current_month = dateStr.getMonth(),
    current_date = dateStr.getDate(),
    current_day = dateStr.getDay(),
    current_hour = dateStr.getHours(),
    current_minute = dateStr.getMinutes(),
    current_sec = dateStr.getSeconds();

/**
 * Creating current month dynamic calendar
 */

function create_current_month() {
    var currentMonthFirstDate = new Date(current_year, month_str, 1),
        currentMonthLastDate = new Date(current_year, month_str + 1, 0),
        prevMonthLastDate = new Date(current_year, month_str, 0),
        nextMonthFirstDate = new Date(current_year, month_str + 1, 1);
    currentMonthFirstDate = currentMonthFirstDate.toString();
    currentMonthLastDate = currentMonthLastDate.toString();
    currentMonthFirstDate = currentMonthFirstDate.slice(0, (currentMonthFirstDate.indexOf(':') - 3));
    currentMonthLastDate = currentMonthLastDate.slice(0, (currentMonthLastDate.indexOf(':') - 3));
    let currentMonthFirstDay = currentMonthFirstDate.slice(-7, -5),
        currentMonthLastDay = currentMonthLastDate.slice(-7, -5),
        currentMonthName = currentMonthFirstDate.slice(-11, -8),
        // currentMonthFirstDayName = currentMonthFirstDate.slice(0, currentMonthFirstDate.indexOf(' ')),
        // currentMonthLastDayName = currentMonthLastDate.slice(0, currentMonthLastDate.indexOf(' ')),
        monthTotalDays = Number(currentMonthLastDay) - Number(currentMonthFirstDay);

    prevMonthLastDate = prevMonthLastDate.toString();
    nextMonthFirstDate = nextMonthFirstDate.toString();
    prevMonthLastDate = prevMonthLastDate.slice(0, (prevMonthLastDate.indexOf(':') - 3));
    nextMonthFirstDate = nextMonthFirstDate.slice(0, (nextMonthFirstDate.indexOf(':') - 3));
    let prevMonthLastDay = prevMonthLastDate.slice(-7, -5),
        nextMonthFirstDay = nextMonthFirstDate.slice(-7, -5),
        prevMonthLastDayName = prevMonthLastDate.slice(0, prevMonthLastDate.indexOf(' ')),
        nextMonthFirstDayName = nextMonthFirstDate.slice(0, nextMonthFirstDate.indexOf(' '));
    const monthDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let prevMonthLastDayInx = monthDayNames.indexOf(prevMonthLastDayName),
        nextMonthFirstDayInx = monthDayNames.indexOf(nextMonthFirstDayName),
        currentMonthFirstRowDays = 6 - prevMonthLastDayInx,
        nextMonthFirstRowDays = 6 - nextMonthFirstDayInx,
        calendarFirstRowNumber = prevMonthLastDay - prevMonthLastDayInx;
    let currentMonthNthDay,
        nextMonthNthDay;
    // Display month and year values
    document.querySelectorAll('.currentMonthDynamic__name').forEach((el) => {
        el.innerHTML = month_shortNm_to_longNm(currentMonthName);
    });
    document.querySelectorAll('.currentYearDynamic__name').forEach((el) => {
        el.innerHTML = current_year;
    });
    // Creating days
    document.querySelectorAll('.monthElem_data').forEach((monthHolder) => {
        let currentMonthNthDayHolder = document.createElement('div'),
            nextMonthNthDayHolder = document.createElement('div');
        currentMonthNthDayHolder.classList.add('row', 'monthDates', 'd-flex', 'justify-content-between');
        nextMonthNthDayHolder.classList.add('row', 'monthDates', 'd-flex', 'justify-content-between');
        monthHolder.appendChild(currentMonthNthDayHolder);
        currentMonthNthDay = 0,
            nextMonthNthDay = 0;
        // Creating previous and current month days that exists in the same week
        // Previous month last week days
        if (prevMonthLastDayInx < 6) {
            for (let n = 0; n <= prevMonthLastDayInx; n++) {
                calendarFirstRowNumber += 1;
                let dateElement = document.createElement('span');
                dateElement.classList.add('col-1', 'text-muted');
                dateElement.innerHTML = calendarFirstRowNumber - 1;
                currentMonthNthDayHolder.appendChild(dateElement);
            }
        }
        // Current month first week days
        for (let n = 0; n < currentMonthFirstRowDays; n++) {
            currentMonthNthDay += 1;
            let dateElement = document.createElement('span');
            dateElement.classList.add('col-1');
            dateElement.innerHTML = (currentMonthNthDay);
            currentMonthNthDayHolder.appendChild(dateElement);
        }
        // Creating current month full weeks' days
        for (let i = 0; i < 5; i++) {
            if ((currentMonthNthDay < currentMonthLastDay) && (currentMonthLastDay - currentMonthNthDay >= 7)) {
                let fullWeekDaysHolder = document.createElement('div');
                fullWeekDaysHolder.classList.add('row', 'monthDates', 'd-flex', 'justify-content-between');
                for (let n = 0; n < 7; n++) {
                    currentMonthNthDay += 1;
                    let dateElement = document.createElement('span');
                    dateElement.classList.add('col-1');
                    dateElement.innerHTML = (currentMonthNthDay);
                    fullWeekDaysHolder.appendChild(dateElement);
                }
                monthHolder.appendChild(fullWeekDaysHolder);
            }
        }
        // Creating current month last week days, if it contains next month days
        if (nextMonthFirstDayInx > 0) {
            if (!(currentMonthNthDay > currentMonthLastDay)) {
                let remainingMonthDays = currentMonthLastDay - currentMonthNthDay;
                for (let n = 0; n < (remainingMonthDays); n++) {
                    currentMonthNthDay += 1;
                    let dateElement = document.createElement('span');
                    dateElement.classList.add('col-1');
                    dateElement.innerHTML = (currentMonthNthDay);
                    nextMonthNthDayHolder.appendChild(dateElement);
                }
            }
            for (let n = 0; n <= nextMonthFirstRowDays; n++) {
                nextMonthNthDay += 1;
                let dateElement = document.createElement('span');
                dateElement.classList.add('col-1', 'text-muted');
                dateElement.innerHTML = (nextMonthNthDay);
                nextMonthNthDayHolder.appendChild(dateElement);
            }
            monthHolder.appendChild(nextMonthNthDayHolder);
        }
    });
    // Mark todays's date
    if (month_str == dateStr.getMonth()) {
        $('.monthElem_data span:not(.text-muted)').filter(function () {
            return $(this).text() == current_date;
        }).addClass('today selected');
    }
}

// Delete month dates for new month
function delete_month_dates() {
    document.querySelectorAll('.monthElem_data').forEach(el => {
        el.querySelectorAll('.monthDates').forEach((row) => {
            row.parentNode.removeChild(row);
        });
    });
}

// Create next month
function create_next_month() {
    delete_month_dates();
    // Add new month
    month_str += 1;
    (month_str > 11) && (month_str = 0, current_year += 1);
    create_current_month();
}

// Create previous month
function create_previous_month() {
    delete_month_dates();
    // Add new month
    month_str -= 1;
    (month_str < 0) && (month_str = 11, current_year -= 1);
    create_current_month();
}

// Create next month same year
function create_next_month_same_year() {
    delete_month_dates();
    month_str += 1;
    (month_str > 11) && (month_str = 0);
    create_current_month();
}

// Create previous month same year
function create_previous_month_same_year() {
    delete_month_dates();
    month_str -= 1;
    (month_str < 0) && (month_str = 11);
    create_current_month();
}

// Create custom month
function create_custom_month(monthNumber) {
    delete_month_dates();
    month_str = monthNumber;
    create_current_month();
}

/**
 * Create pionts circle
 */

function drawSpongedCircle(ELEM) {
    let ground = ELEM, D = ground.width(), r = D / 2,
        dotsNum = 40, // Number of dots to create
        unitAngle = 360 / dotsNum,
        currentAngle;

    for (let point = 1; point <= dotsNum; point++) {
        let x, y, offsetLeft, offsetTop, left, top;

        currentAngle = unitAngle * point;
        x = r * Math.cos(currentAngle * Math.PI / 180);
        y = r * Math.sin(currentAngle * Math.PI / 180);
        offsetLeft = r + x;
        offsetTop = r - y;
        // Set css top and left
        left = (offsetLeft * 100) / D;
        top = (offsetTop * 100) / D;
        // Create a dot element to add
        let myDot = document.createElement('div');
        myDot.classList.add('a-sponge');
        myDot.style.left = left + '%';
        myDot.style.top = top + '%';
        // Add dot
        ground.append(myDot);
    }
}
drawSpongedCircle($('.sponged-circ'));

// Sponged sides
// function drawSpongedSides(ELEM) {
//     let ground = ELEM, D = ground.width(), r = D / 2,
//         dotsNum = 40, // Number of dots to create
//         unitAngle = 360 / dotsNum,
//         currentAngle;

//     for (let point = 1; point <= dotsNum; point++) {
//         let x, y, offsetLeft, offsetTop, left, top;

//         currentAngle = unitAngle * point;
//         x = r * Math.cos(currentAngle * Math.PI / 180);
//         y = r * Math.sin(currentAngle * Math.PI / 180);
//         // offsetLeft = r + x;
//         // offsetTop = r - y;
//         // Set css top and left
//         // left = (offsetLeft * 100) / D;
//         // top = (offsetTop * 100) / D;
//         // x > 0 ? left = 100 : left = 0;
//         // y > 0 ? top = 0 : top = 1000;

//         // if (y > 0) {
//         //     top = (offsetTop * 100) / D;
//         // }
//         // Create a dot element to add
//         let myDot = document.createElement('div');
//         myDot.classList.add('a-sponge');
//         myDot.style.left = left + '%';
//         myDot.style.top = top + '%';
//         // Add dot
//         ground.append(myDot);
//     }
// }
// drawSpongedSides($('.sponged-rect'));


/**
 * Floating a playing uadio
 */

let galleryFilter_avb = false,
    S_JUMPER_avb = false,
    audioSection_avb = false;
document.onscroll = function () {
    var S_JUMPER = $('#Section_Jumper');
    (S_JUMPER.length > 0) && (S_JUMPER_avb = true)
    if (S_JUMPER_avb) {
        if (S_JUMPER.parent().offset().top < (scrollY + 60)) {
            S_JUMPER.addClass('JumpTo bg-myBlue1 text-light');
            if ($(window).width() < 576) {
                S_JUMPER.removeClass('bg-myBlue1 text-light').addClass('floated');
                S_JUMPER.html('<span class="fa fa-indent"></span>');
            }
        }
        else if (S_JUMPER.parent().offset().top > (scrollY + 60)) {
            S_JUMPER.removeClass('JumpTo bg-myBlue1 text-light');
            if ($(window).width() < 576) {
                S_JUMPER.removeClass('floated');
                S_JUMPER.html('Jump to');
            }
        }
    }
    // Float playing audio
    var audioSection = $('.our-songs__media-player');
    let audios = document.querySelectorAll('audio'), allPaused = false;
    (audioSection.length > 0) && (audioSection_avb = true)
    if (audioSection_avb) {
        var audioSection_posit_Bottom = audioSection.offset().top - (scrollY + winHei),
            style_playing_NM = $('.current-music-player .music-name').text();
        Array.from(audios).every((el) => {
            if (el.paused) {
                allPaused = true;
            }
        });
        if (audioSection_posit_Bottom > 1 && !allPaused) {
            float_playing_audio();
            $('.floating-audio .floating-item_icon-tools .media-play-pause-icon').removeClass('fa-play').addClass('fa-pause');
            $('.floating-audio .floating-item_details-name').html(style_playing_NM);
        }
        else {
            hide_floated_audio();
        }
    }

}

/**
 * User accounts
 */

// Login and signup

$('#Signer').click(SignUP);
$('#LOGGER , #CancelSIGNbtn').click(LogIN);
$('#SignUpClose').click(CancelLogin);
function LogIN() {
    $('#SignUp').animate({ left: "100%", opacity: "0" }, 300).css("display", "none");
    $('#LogIn').animate({ left: "0%", opacity: "1" }, 300).css("display", "block");
}

function SignUP() {
    $('#LogIn').animate({ left: "-100%", opacity: "0" }, 300).css("display", "none");
    $('#SignUp').animate({ left: "0%", opacity: "1" }, 300).css("display", "block");
}

function CancelLogin() {
    $('#Users').collapse('hide');
    setTimeout(function () {
        $('#SignUp').css({ left: "100%", opacity: "0", "display": "none" });
        $('#LogIn').css({ left: "0%", opacity: "1", "display": "block" });
    }, 1000);
}

$('#AcceptTrms').click(function () {
    if (this.checked) {
        $('.termsANDc').css("display", "block");
        $('#ConfirmSIGNbtn').removeClass("disabled").css("pointerEvents", "all");
    }
    else {
        $('.termsANDc').css("display", "none");
        $('#ConfirmSIGNbtn').addClass("disabled").css("pointerEvents", "none");
    }
});

$('#UserPW , #UserPW1').on({
    blur: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW1 !== "" && PW2 !== "" && PW2 === PW1) {
            $('#UserPW , #UserPW1').css({ backgroundColor: "white", color: "black" });
        }
        else if (PW1 !== "" && PW2 !== "" && PW2 !== PW1) {
            $(this).css({ backgroundColor: "#ffcc6e", color: "black" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("The password do not match.");
        }
    }
});

$('#UserPW').on({
    keyup: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW2 !== PW1 && PW2 !== "") {
            $('#UserPW').css({ backgroundColor: "#ffcc6e", color: "white" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("The password do not match.");
        }
        else {
            $('#UserPW , #UserPW').css({ backgroundColor: "white", color: "black" });
            $('.PassVerifier').fadeOut();
        }
    },
    blur: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW1 === "" && PW2 !== "") {
            $('#UserPW1').css({ backgroundColor: "#ffcc6e", color: "black" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("Please input the password to confirm.");
        }
        else {
            $('#UserPW , #UserPW').css({ backgroundColor: "white", color: "black" });
            setTimeout(function () {
                $('.PassVerifier').fadeOut();
            }, 2000);
        }
    }
});

$('#UserPW1').on({
    keyup: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW2 !== PW1 && PW1 !== "") {
            $('#UserPW1').css({ backgroundColor: "#ffcc6e", color: "white" });
        }
        else {
            $('#UserPW1').css({ backgroundColor: "white", color: "black" });
            $('.PassVerifier').fadeOut();
        }
    },
    blur: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();

        if (PW1 !== "" && PW2 === "") {
            $('#UserPW1').css({ backgroundColor: "#ffcc6e", color: "black" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("Please input the password to confirm.");
        }
        else {
            $('#UserPW , #UserPW1').css({ backgroundColor: "white", color: "black" });
            setTimeout(function () {
                $('.PassVerifier').fadeOut();
            }, 2000);
        }
    }
});

/**
 * Manage Push notifications
 */

// $('#allowPushNotif').click(function () {
//     if (!('serviceWorker' in navigator)) {
//         console.log('Push not supported');
//         return;
//     }
//     else {
//         console.log('Push is supported');
//     }
// });
// $('#denyPushNotif').click(function () {
//     if (!('serviceWorker' in window)) {
//         console.log('Push not supported');
//         return;
//     }
//     else {
//         console.log('Push is supported');
//     }
// });

$('#ScrollTP').click(function () {
    $(document).scrollTop(0);
});

/**
 * Count elapsed time from a specific date in the past
 */

function count_elapsed_time(desiredDate, outPut) {
    let date = new Date(desiredDate),
        dateMon = date.getMonth() + 1,
        days_diff = dateStr.getTime() - date.getTime(),
        miliSEC_Day = 1000 * 3600 * 24,
        miliSEC_Week = (1000 * 3600 * 24) * 7,
        miliSEC_Month = (1000 * 3600 * 24) * 30,
        miliSEC_Year = (1000 * 3600 * 24) * 356,

        YearSEllapsed = days_diff / miliSEC_Year,
        MonthSEllapsed = days_diff / miliSEC_Month,
        WeekSEllapsed = days_diff / miliSEC_Week,
        DaySEllapsed = days_diff / miliSEC_Day,
        timeEllapsed,
        theCount;

    if ((YearSEllapsed) >= 1) {
        timeEllapsed = Math.floor((YearSEllapsed));
        theCount = " • " + timeEllapsed + " year ago";
        if ((YearSEllapsed) >= 2) {
            theCount = " • " + timeEllapsed + " years ago";
        }
    }
    else if ((MonthSEllapsed) >= 1) {
        timeEllapsed = Math.floor((MonthSEllapsed));
        theCount = " • a month ago";
        if ((MonthSEllapsed) >= 2) {
            theCount = " • " + timeEllapsed + " months ago"
        }
    }
    else if ((WeekSEllapsed) >= 1) {
        timeEllapsed = Math.floor((WeekSEllapsed));
        theCount = " • a week ago"
        if ((WeekSEllapsed) >= 2) {
            theCount = " • " + timeEllapsed + " weeks ago"
            if ((WeekSEllapsed) > 4 && (WeekSEllapsed) < 5) {
                theCount = " • on " + date.getDate() + "/" + dateMon;
            }
        }
    }
    else if ((DaySEllapsed) >= 1) {
        timeEllapsed = Math.floor((DaySEllapsed));
        if ((DaySEllapsed) > 2) {
            theCount = " • " + timeEllapsed + " days ago"
        }
        else if (2 <= DaySEllapsed < 3) {
            theCount = "• Yesterday";
        }
    }
    else {
        theCount = "• Today";
    }
    outPut.html(theCount);
}

/**
 * Dynamic needle watch
 */

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    month = monthNames[month_str],
    dayNames = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    day = dayNames[current_day - 1];
$('.clock .sec_stick').css({ transform: 'rotateZ(' + (current_sec * 6) + 'deg)', transformOrigin: '50% 100%' });
$('.clock .min_stick').css({ transform: 'rotateZ(' + (current_minute * 6) + 'deg)', transformOrigin: '50% 100%' });
$('.clock .hrs_stick').css({ transform: 'rotateZ(' + ((current_hour + current_minute / 60) * 30) + 'deg)', transformOrigin: '50% 100%' });

function animate_needle_watch() {
    // const month = new Date().toLocaleDateString();
    // const month = new Date().toLocaleString();
    // const month = new Date().toLocaleString('default', {month: 'short'});
    const time = new Date(),
        year = new Date().getFullYear(),
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        month = monthNames[time.getMonth()],
        date = new Date().getDate(),
        dayNames = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        day = dayNames[time.getDay() - 1],
        hrs = new Date().getHours(),
        mins = new Date().getMinutes(),
        sec = new Date().getSeconds();
    $('.clock .sec_stick').css({ transform: 'rotateZ(' + (sec * 6) + 'deg)', transformOrigin: '50% 100%' });
    $('.clock .min_stick').css({ transform: 'rotateZ(' + (mins * 6) + 'deg)', transformOrigin: '50% 100%' });
    $('.clock .hrs_stick').css({ transform: 'rotateZ(' + ((hrs + mins / 60) * 30) + 'deg)', transformOrigin: '50% 100%' });
}
setInterval(animate_needle_watch, 1000);

/**
 * Month navigations and date selections
 */

// Jump to random month
liturgyMonth.forEach(el => {
    let monthName = el.querySelectorAll('.dropdown-item');
    monthName.forEach((month, inx) => {
        month.addEventListener('click', function () {
            create_custom_month(inx);
            select_month_date(1);
            display_liturgical_info([month_num_to_nm((month_str + 1)), 1]);
        });
    });
});

// Select certain date
function select_month_date(date) {
    $('.monthDates span:not(.text-muted)').removeClass('selected');
    $('.monthDates span:not(.text-muted)').filter(function () {
        return $(this).text() == date;
    }).addClass('selected');
}

// Previous month
$('.month-previous').click(function () {
    create_previous_month_same_year();
    select_month_date(1);
    display_liturgical_info([month_num_to_nm((month_str + 1)), 1]);
});

// Next month
$('.month-next').click(function () {
    create_next_month_same_year();
    select_month_date(1);
    display_liturgical_info([month_num_to_nm((month_str + 1)), 1]);
});

// Select today by default
display_liturgical_info([month_num_to_nm((month_str + 1)), current_date]);

// Update the copyright year
$('.copyright-year').html(dateStr.getFullYear());
// export * from "./MyScripts.js";