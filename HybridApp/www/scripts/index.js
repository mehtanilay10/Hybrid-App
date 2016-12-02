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

        $("#product-list-page").ready(function () {
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
            $.getJSON("scripts/data.resjson")
                .done(function (json) {
                    console.log("JSON Data: " + JSON.stringify(json, null, 4));
                    $.each(json.products, function (i, item) {
                        // Create Element
                        var li = document.createElement("li");
                        var a = $('<a>', { href: 'view-details.html?id=?' + item.id }).appendTo(li);
                        $('<img>', { class: 'list-img', src: 'images/img_' + item.image, height: '115' }).appendTo(a);
                        $('<div>', { class: 'list-title', text: item.title }).appendTo(a)
                        $('<div>', { class: 'list-price', text: "Rs. " + item.price }).appendTo(a);

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

            // Show about message box
            $(function () {
                $('#about').mobiscroll().widget({
                    theme: theme,
                    display: 'bottom',
                    anchor: $('#show'),
                    headerText: "About App",
                    buttons: [{
                        text: 'cancel',
                        handler: 'cancel'
                    }]                    
                });

                $('#show').click(function () {
                    $('#about').mobiscroll('show');
                    return false;
                });

            });
        })


        $("#view-detials").ready(function () {
            // Obtain Id
            var id = decodeURIComponent(window.location.search.match(/(\?|&)id\=([^&]*)/)[2].replace('?', ''));
            console.log('Id: ' + id);
            // Load all details
            $.getJSON("scripts/data.resjson")
                .done(function (json) {
                    $.each(json.products, function (i, item) {
                        // set specific item details
                        if (item.id == id) {
                            $("#item-title").html(item.title);
                            $("#item-desc").text(item.desc);
                            $("#item-old-price").html(item.price * 1.2);        // Fake price for discount
                            $("#item-new-price").html(item.price);
                            $("#item-image").attr("src", "images/img_" + item.image);
                        }
                    });
                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
                });

            // Notification for Add to cart button
            $(function () {
                var notification = $('<div class="notification"><div class="notification-i"></div></div>').appendTo('body'),
                    notificationTimer;

                $('.wishlist-wish').off().click(function (ev) {
                    var added,
                        btn = $(this);
                    btn.toggleClass('.wishlist-wish-added');
                    added = btn.hasClass('.wishlist-wish-added');
                    btn.find('.wishlist-wish-text').text(added ? 'Remove from wishlist' : 'Add to wishlist');
                    btn.find('.mbsc-ic').toggleClass('mbsc-ic-plus').toggleClass('mbsc-ic-minus');
                    notify(added ? 'Added to wishlist' : 'Removed from wishlist');
                });

                var notification = $('<div class="notification"><div class="notification-i"></div></div>').appendTo('body'),
                    notificationTimer;
                function notify(text) {
                    clearTimeout(notificationTimer);
                    notification.show().find('.notification-i').html(text);
                    if (notification.hasClass('notification-v')) {
                        notification.removeClass('notification-v');
                        notificationTimer = setTimeout(function () {
                            notification.addClass('notification-v');
                        }, 200);
                    } else {
                        notification.addClass('notification-v');
                    }
                    notificationTimer = setTimeout(function () {
                        notification.removeClass('notification-v');
                        notificationTimer = setTimeout(function () {
                            notification.hide();
                        }, 200);
                    }, 2000);
                }
            });

            // Back link
            $("#go-back").click(function () { history.back();});
        });
    }
    catch (e) {
        $("body").innerHTML = "Missing MobiScroll";
    }
})(window);