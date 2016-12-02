// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function (window) {
    "use strict";

    //$(".title").text("MNilay");
    
    
    try {
        // Deside Theme for App
        var theme = 'mobiscroll';
        // mobiscroll | mobiscroll-dark | material | material-dark | ios | ios-dark | wp | wp-light | android-holo-light

        // Set Theme for App
        mobiscroll.settings = {
            theme: theme
        };
        /*
        // Set Calender Dropdown
        $('#calendar').mobiscroll().calendar({
            theme: theme,
            display: 'top'
        });
        */
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

        // Populate from JSON
        $.getJSON("scripts/resources.resjson")
            .done(function (json) {
                console.log("JSON Data: " + JSON.stringify(json, null, 4));
                $.each(json.products, function (i, item) {
                    // Create Element
                    var li = document.createElement("li");
                    var a = $('<a>', {href: 'view-details.html?id=?' + item.id}).appendTo(li);
                    $('<img>', { class: 'list-img', src: 'images/img_' + item.image, height: '115' }).appendTo(a);
                    $('<div>', {class: 'list-title', text: item.title}).appendTo(a)
                    $('<div>', { class: 'list-price', text: item.price }).appendTo(a);

                    // Based on type select wher to place element
                    if (item.category == "Mobile")
                        $(li).appendTo("#mobile-list");
                    else
                        $(li).appendTo("#laptop-list");
                });
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
    }
    catch (e) {
        $("body").innerHTML = "Missing MobiScroll";
    }
})(window);