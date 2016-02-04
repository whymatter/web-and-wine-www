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
                    var nextOrLastMeetup = $('#next-or-last-meetup');
                    var meetupLocation = $('#meetup-location');
                    var meetupDate = $('#meetup-date');
                    var linkMeetup = $('#link-meetup');
                    var meetupCount = $('#meetup-count');
                    var meetupTalks = $('#meetup-talks');

                    var date = new Date(response.results[response.results.length - 1].time);
                    var day = date.getDate();
                    var month = parseInt(date.getMonth()) + 1;
                    month = (month.length > 1) ? month : ('0' + month);
                    var year = date.getFullYear();
                    var hour = date.getHours();
                    var minutes = date.getMinutes();

                    var pastMeetups = response.results.length - 1;
                    var pastTalks = pastMeetups * 3;

                    if(response.results[pastMeetups].status === 'upcoming') {
                        nextOrLastMeetup.html('Nächstes Web&Wine ist am');
                    } else {
                        nextOrLastMeetup.html('Letztes Web&Wine war am');
                    }

                    meetupLocation.text(response.results[response.results.length - 1].venue.name + ', ' + response.results[response.results.length - 1].venue.address_1 + ', ' + response.results[response.results.length - 1].venue.city);
                    meetupDate.text(day + '.' + month + '.' + year + ', ' + hour + ':' + minutes + ' Uhr');
                    linkMeetup.html('<a href="' + response.results[response.results.length - 1].event_url + '" target="_blank"class="btn btn-primary btn-xl page-scroll">Kostenlos anmelden über Meetup</a>');
                    meetupCount.text(pastMeetups);
                    meetupTalks.text(pastTalks);

                }
            });
        },

        getAllImages: function() {
            var that = this;

            $.ajax({
                dataType:'jsonp',
                method:'get',
                url: 'https://api.meetup.com/2/photos?offset=0&format=json&group_urlname=web-and-wine&page=200&fields=&order=time&desc=True&sig_id=101494212&sig=b13d93e55d602ec1529b6d06d338454aa16ebcd8',
                success: function(response) {
                    var impressions = $('#impressions');
                    var content = '';
                    var randomStart = that.radomNumber(0, response.results.length - 6);
                    var randomEnd = randomStart + 6;

                    for(var i = randomStart; i < randomEnd; i++) {

                        content += '<div class="col-lg-4 col-sm-6">';
                        content += '<a href="' + response.results[i].site_link + '" target="_blank" class="portfolio-box">';
                        content += '<div style="background-image: url(' +  response.results[i].photo_link + ');" class="img-responsive" alt="Foto by ' + response.results[i].member.name + '"></div>';
                        content += '<div class="portfolio-box-caption">';
                        content += '<div class="portfolio-box-caption-content">';
                        content += '<div class="project-category text-faded">';
                        content += 'Foto by';
                        content += '</div>';
                        content += '<div class="project-name">';
                        content += response.results[i].member.name;
                        content += '</div>';
                        content += '</div>';
                        content += '</div>';
                        content += '</a>';
                        content += '</div>';
                    }

                    impressions.html(content);

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

                    var meetupMember = $('#meetup-member');

                    meetupMember.text(response.results[0].members);
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
        },

        radomNumber: function(min, max) {

            return min + Math.floor(Math.random() * (max - min + 1));
        }
    };

    custom.init();

})(jQuery); // End of use strict
