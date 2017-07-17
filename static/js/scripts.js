$(document).ready(function() {
    var form_fields = $( ".popup_info_form input[type=text]" );
    $('.popup_info_form input[type=submit]').prop('disabled',true);

    form_fields.on('input', function() {
        var show = true;
        var email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        var submit_button = $( this ).siblings(":submit")
        $.each($(this).siblings().andSelf(), function() {
            if (($( this ).is(".required:text") && this.value == "") ||
                (this.name == "email" && !this.value.match(email_pattern))){
                show=false;
                submit_button.prop('disabled',true);
            }
        });
        if (show) {
            submit_button.prop('disabled',false);
        }
    });

    $('.team-profile--profile .team-profile--profile--text a.read-more, .team-profile--profile').click(function(e) {
        $('#bios-modal').modal('show');
        var biosBox = $(this);
        viewBios(biosBox);
        $('nav.navbar').removeClass('slide-up').hide();
    });
    function viewBios (biosBox) {
        var name = biosBox.find(".team-profile--profile--text .name").text();
        var title = biosBox.find(".team-profile--profile--text .title").text();
        var image = biosBox.find(".team-profile--profile--photo").css("background-image");
        var bio = biosBox.find(".team-profile--profile--text .bios").clone();
        bio.removeClass("hidden");

        $('#bios-modal .bios-content .bios-image').css("background-image", image);
        $('#bios-modal .bios-content .bios-text .name').text(name);
        $('#bios-modal .bios-content .bios-text .title').text(title);
        $('#bios-modal .bios-content .bios-text .bio').empty();
        $('#bios-modal .bios-content .bios-text .bio').append(bio);
    }
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('#bios-modal').addClass('slide-up').show();
        }
    });
    $('#bios-modal').on('hidden.bs.modal', function (e) {
        $('nav.navbar').addClass('slide-up').show();
    })

    $('.popup_info_form form').submit(function(e){
        var self = this;

        e.preventDefault();
        $(this).find(':submit').prop('disabled',true);
        if ($( this ).parent().is('#originator_info_form')){
            var url = 'https://script.google.com/macros/s/AKfycbzM1_VdSt6m-UUttH8OX7l-THndRdrmDvn7OHyCF1FPkI5PiSo/exec';
        }
        else if ($( this ).parent().is('#investor_info_form')){
            var url = 'https://script.google.com/macros/s/AKfycbwO06XVaxBqWcisvQL_Xf02XhK-HwRN5WJ0cAVAeSrtYsXches/exec';
        }
        // the first ajax request sends form data to a google script that
        // processes the data and keeps track of it it on a spreadsheet
        $.ajax({
            url:url,
            type:'post',
            data:$(self).serialize(),
            context:self,
            success:function(data){
                alert("Thanks! We've recieved your information and will be getting in touch with you shortly!");
                $(self).find("input, textarea, select").val("");
                $(self).find(':submit').prop('disabled',false);
            }
        })
        // the second request sends the data to formspree, which will forward
        // it to the info@lendable.io google group
        $.ajax({
            url:"https://formspree.io/info@lendable.io",
            type:'post',
            data:$(this).serialize(),
            dataType:'json'
        })
    });

    function toggleSignUpJourney (journeyType) {
        $('.fund.journey-steps').fadeToggle({ duration: 200 });
        $('.marketplace.journey-steps').fadeToggle({ duration: 200 });
        $('#fund-journey').toggleClass('active');
        $('#marketplace-journey').toggleClass('active');

        if (journeyType == "marketplace") {
            $('#signup-journey').removeClass('squeezed');
        } 
        else if (journeyType == "fund") {
            $('#signup-journey').addClass('squeezed');
        }
    }

    function toggleBenefits(benefitsType) {
        if (benefitsType == 'marketplace') {
            $('.benefits-decks.marketplace').show();
            $('.benefits-decks.fund').hide();
            $('#fund-benefits').removeClass('active');
            $('#marketplace-benefits').addClass('active');
        } else if (benefitsType == 'fund') {
            $('.benefits-decks.fund').show();
            $('.benefits-decks.marketplace').hide();
            $('#fund-benefits').addClass('active');
            $('#marketplace-benefits').removeClass('active');
        }
    }

    $("#marketplace-benefits").click(function(e){
        toggleBenefits('marketplace');
    });
    $("#fund-benefits").click(function(e){
        toggleBenefits('fund');
    });

    $("#fund-journey").click(function(e){
        toggleSignUpJourney('fund');
    });
    $("#marketplace-journey").click(function(e){
        toggleSignUpJourney('marketplace');
    });

    $(".signup").click(function() {
        $('html, body').animate({
            scrollTop: $("#signup-journey").offset().top
        }, 2000);
    });
    
    toggleBenefits('marketplace');
    toggleSignUpJourney('marketplace');

    var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('nav.navbar'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.background'),
		headerHeight = mainHeader.height();

    if (belowNavHeroContent.length == 0) {
        belowNavHeroContent = $('header.header--call_to_action.about .div--call_to_action');
    }
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 50,
		scrollOffset = 500;

	// mainHeader.on('click', '.nav-trigger', function(event){
	// 	// open primary navigation on mobile
	// 	event.preventDefault();
	// 	mainHeader.toggleClass('nav-open');
	// });

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop)
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop) {
	    	//if scrolling up... 
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('navbar-fixed-top slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('slide-up').addClass('navbar-fixed-top'); 
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    } else {
	    	//if scrolling down...	
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	    		mainHeader.addClass('is-hidden');
	    		secondaryNavigation.addClass('navbar-fixed-top slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.addClass('navbar-fixed-top').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    }
	}
});