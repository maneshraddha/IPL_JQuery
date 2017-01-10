/**
*@Filename:script.js
*@Date:19-12-2016
*@Purpose:ipl js
*@Created By:Shraddha Mane
*/
$(function () {

	// Globals variables

	/**	@param :An array containing objects with information about the teams.*/
	var teams = [];


	// Get data about our products from products.json from firebase
	var ref = firebase.database().ref();

	//'on' method to read data from firebase
	ref.on("value", function(snapshot) {
		console.log("read data from firebase");
		console.log(snapshot.val());

		//Write the data into our global variable.
		teams = snapshot.val();

		// Call a function to create HTML for all the products.
		generateAllTeamsHTML(teams);

		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	},

	function (error) {
    console.log("Error: " + error.code);
  });

/**
	@function : An event handler with calls the render function on every hashchange.
	The render function will show the appropriate content of out page.
	*/
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});


	/** @function :Navigation*/

	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];
		console.log("url :" + temp);

		var	map = {

			// The "Homepage".
			'': function() {

				renderTeamsPage(teams);
			},

			// Single Team page.
			'#team': function() {

				// Get the index of which product we want to show and call the appropriate function.
				var index = url.split('#team/')[1].trim();
				console.log("index :" + url.split('#team/')[1].trim());

				renderSingleTeamPage(index, teams);
			}
		};



		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]){
			map[temp]();
		}
		// If the keyword isn't listed in the above - render the error page.
		else {
			renderErrorPage();
		}

	}

/**
	@function :This function is called only once - on page load.
	 It fills up the teams list via a handlebars template.
	/It recieves one parameter - the data we took from firebase.
	*/

	function generateAllTeamsHTML(data){

		console.log("in generateAllTeamsHTML function");
		var list = $('.all-products .products-list');

		var theTemplateScript = $("#products-template").html();
		//Compile the template​
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));


		// Each products has a data-index attribute.
		// On click change the url hash to open up a preview for this team only.
		// Remember: every hashchange triggers the render function.


		list.find('li').on('click', function (e) {
			e.preventDefault();

			var productIndex = $(this).data('index');

			window.location.hash = 'team/' + productIndex;
			console.log("window.location.hash" + window.location.hash);
		})
	}



	function generateAllPlayersHTML(data){
		console.log(data);

		console.log("in generateAllPlayerssHTML2 function");
		var list = $('.all-players .players-list');

		var theTemplateScript = $("#players-template").html();
		// console.log(theTemplateScript);

		//Compile the template​
		var theTemplate = Handlebars.compile (theTemplateScript);
		//console.log(theTemplate(data));

		list.append (theTemplate(data));
		 $(".all-products").remove();


	}

	/**
	@function :This function receives an object containing all the team we want to show.*/

	function renderTeamsPage(data){

		var page = $('.all-products'),
		allProducts = $('.all-products .products-list > li');
		page.addClass('visible');

	}


	 /**
	 @function :Opens up a preview for one of the teams.
		Its parameters are an index from the hash and the teams object.*/
	function renderSingleTeamPage(index, data){

		console.log("in renderSingleTeamPage function");
		var page = $('.all-players'),
		allProducts = $('.all-players .players-list > li');

		generateAllPlayersHTML(data[index].team_players);

	}


	/**
	@function :Shows the error page.*/
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}


});
