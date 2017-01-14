$(document).ready(function () {


    // Scroll Events
    $(window).scroll(function () {

        var wScroll = $(this).scrollTop();

        // Activate menu
        if (wScroll > 20) {
            $('#main-nav').addClass('active');
            $('#slide_out_menu').addClass('scrolled');
        }
        else {
            $('#main-nav').removeClass('active');
            $('#slide_out_menu').removeClass('scrolled');
        }


        //Scroll Effects

    });


    // Navigation
    $('#navigation').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('open');
        var $slideOutMenu = $('#slide_out_menu');
        $slideOutMenu.toggleClass('open');
        if ($slideOutMenu.hasClass('open')) {
            $('.menu-close').on('click', function (e) {
                e.preventDefault();
                $('#slide_out_menu').removeClass('open');
            })
        }
    });


    // Price Table
    var $priceTables           = $('#price_tables');
    var individual_price_table = $priceTables.find('.individual');
    var company_price_table    = $priceTables.find('.company');


    var $switch = $('.switch-toggles');
    $switch.find('.individual').addClass('active');
    $priceTables.find('.individual').addClass('active');

    $switch.find('.individual').on('click', function () {
        $(this).addClass('active');
        $(this).closest('.switch-toggles').removeClass('active');
        $(this).siblings().removeClass('active');
        individual_price_table.addClass('active');
        company_price_table.removeClass('active');
    });

    $switch.find('.company').on('click', function () {
        $(this).addClass('active');
        $(this).closest('.switch-toggles').addClass('active');
        $(this).siblings().removeClass('active');
        company_price_table.addClass('active');
        individual_price_table.removeClass('active');
    });


    // Wow Animations
    var wow = new WOW(
        {
            boxClass: 'wow',      // default
            animateClass: 'animated', // default
            offset: 0,          // default
            mobile: true,       // default
            live: true        // default
        }
    );
    wow.init();


    // Menu For Xs Mobile Screens
    if ($(window).height() < 450) {
        $('#slide_out_menu').addClass('xs-screen');
    }

    $(window).on('resize', function () {
        if ($(window).height() < 450) {
            $('#slide_out_menu').addClass('xs-screen');
        } else {
            $('#slide_out_menu').removeClass('xs-screen');
        }
    });


});




