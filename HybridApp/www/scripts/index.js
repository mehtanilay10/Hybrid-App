// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function (window) {
    "use strict";

    $(".title").text("MNilay");
    $("#calendar").val("Helloooo");

    try {
        // Deside Theme for App
        var theme = 'mobiscroll';

        // Set Theme for App
        mobiscroll.settings = {
            theme: theme
        };

        // Set Calender Dropdown
        $('#calendar').mobiscroll().calendar({
            theme: theme,
            display: 'top'
        });

        // Product List for Homepage
        $(function () {
            $('.product-list').mobiscroll().menustrip({
                theme: theme,
                display: 'inline',
                select: 'off',
                layout: 'fixed',
                itemWidth: 150
            });
        });
    }
    catch (e) {
        $("body").innerHTML = "Missing MobiScroll";
    }
})(window);