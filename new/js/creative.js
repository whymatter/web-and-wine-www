/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {

    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '55px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    // custom stuff
    var custom = {
        init: function() {

            this.getAllEvents();
            this.getAllImages();
            this.getGroupInfos();
            this.getGroupComments();

        },

        getAllEvents: function(){

            $.ajax({
                dataType:'jsonp',
                method:'get',
                url: 'https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=web-and-wine&page=200&fields=&order=time&status=upcoming%2Cpast&desc=false&sig_id=101494212&sig=51e0751f14b33368c235ac3686e5d425ea2b236a',
                success: function(response) {
                    console.log(response);
                    var nextOrLastMeetup = $('#next-or-last-meetup');
                    var meetupDate = $('#meetup-date');
                    var linkMeetup = $('#link-meetup');
                    
                    var date = new Date(response.results[response.results.length - 1].time);
                    var day = date.getDate();
                    var month = parseInt(date.getMonth()) + 1;
                    var year = date.getFullYear();
                    var hour = date.getHours();
                    var minutes = date.getMinutes();

                    nextOrLastMeetup.html('Web&Wine  – Ort: ' + response.results[response.results.length - 1].venue.name);
                    meetupDate.text(day + '.' + month + '.' + year + ', ' + hour + ':' + minutes + ' Uhr');
                    linkMeetup.html('<a href="' + response.results[response.results.length - 1].event_url + '" target="_blank"class="btn btn-primary btn-xl page-scroll">Anmeldung über Meetup</a>');
                    
                }
            });
        },

        getAllImages: function() {

            $.ajax({
                dataType:'jsonp',
                method:'get',
                url: 'https://api.meetup.com/2/photos?offset=0&format=json&group_urlname=web-and-wine&page=200&fields=&order=time&desc=True&sig_id=101494212&sig=b13d93e55d602ec1529b6d06d338454aa16ebcd8',
                success: function(response) {
                    console.log(response);



                }
            });
        },

        getGroupInfos: function() {

            $.ajax({
                dataType:'jsonp',
                method:'get',
                url: 'https://api.meetup.com/2/groups?offset=0&format=json&group_urlname=web-and-wine&page=200&radius=25.0&fields=&order=id&desc=false&sig_id=101494212&sig=062a2554098d8bcc7892aba3e595dfe690fc5ea7',
                success: function(response) {
                    console.log(response);
                }
            });
        },

        getGroupComments: function() {

            $.ajax({
                dataType:'jsonp',
                method:'get',
                url: 'https://api.meetup.com/comments?offset=0&format=json&group_urlname=web-and-wine&page=200&order=ctime&sig_id=101494212&sig=3079f7184943cfdcfa4982b566c6751183e345af',
                success: function(response) {
                    console.log(response);
                }
            });
        }
    };

    custom.init();

})(jQuery); // End of use strict
