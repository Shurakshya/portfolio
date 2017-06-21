
$(document).ready(function() {
	// for load of google map 
	// View on google maps
	$("#map").bind('click', function(){
		$("#maprender").css({
			display : 'block',
			
		});
		 initialize();
	   
		});

	//show scroll up
	$(document).scroll(function() {
		var y = $(this).scrollTop();
		if (y > 200) {
			$(".arrow-up i").fadeIn();
		} else {
			$(".arrow-up i").fadeOut();
		}
	});

	/* scroll to top */
	$(".arrow-up i").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, "slow");
		return false;
	});

	(function(){  
		var counter = 0, // to keep track of current slide
	    $items = document.querySelectorAll('.homeCarousel figure'), // a collection of all of the slides, caching for performance
	    numItems = $items.length; // total number of slides

		// this function is what cycles the slides, showing the next or previous slide and hiding all the others
		var showCurrent = function(){
		    var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
			  
			// remove .show from whichever element currently has it 
			// http://stackoverflow.com/a/16053538/2006057
			[].forEach.call( $items, function(el){
			 	el.classList.remove('show');
			});
		  
		  // add .show to the one item that's supposed to have it
		    $items[itemToShow].classList.add('show');    
		    };

		// add click events to prev & next buttons 
		document.querySelector('.next').addEventListener('click', function() {
		     counter++;
		     showCurrent();
		}, false);

		document.querySelector('.prev').addEventListener('click', function() {
		     counter--;
		     showCurrent();
		}, false);
		  
	})();

	// function for map rendering

	var myCenter=new google.maps.LatLng(60.201639,24.665455);
		function initialize()
		{
		var mapProp = {
		  center:myCenter,
		  zoom:15,
		  scrollwheel: false,
		  mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		var map=new google.maps.Map(document.getElementById("maprender"),mapProp);
		var marker=new google.maps.Marker({
		  position:myCenter, 
		  });
		marker.setMap(map);
		}
		
	/* content ( i am a developer ) visible */
	setTimeout(function(){
		$(".content").addClass('content_visible');
	},2000);

	/* send feedback */

	//form submit 
	$("form").submit(function(e) {

		e.preventDefault();
		var name = escapeHtml($("#name").val());
		var email = escapeHtml($("#email").val());
		var comment = escapeHtml($("#comment").val());

		sendMail(name, email, comment); // make ajax call to send form data
		return false;

	});
	/* post form data to server */
	function sendMail(name, email, comment) {
		var postdata = {
			'name': name,
			'email': email,
			'comment': comment
		};
		axios.post('/api/sendmail',postdata)
		  .then(function (response) {
			$("#name").val('');
			$("#email").val('');
			$("#comment").val('');
			// message to user baaki xa
			$('.alert-dismissable').show();
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
	/* escape html entities for preventing XXS */
	function escapeHtml(text) {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};

		return text.replace(/[&<>"']/g, function(m) {
			return map[m];
		});
	}

	var currentTime;
      /* live current time */
      setInterval(function() {
          currentTime = moment.utc(new Date).local().format('YYYY.MM.DD, hh:mm:ss a');
          $('#time').text(currentTime);
      }, 1000);

	});




