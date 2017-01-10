$(function(){

	var teams =[];
	var players = [];

	//
	// // Single Team page buttons
	//
	// var singleProductPage = $('.single-product');
	//
	// singleProductPage.on('click', function (e) {
	//
	// 	if (singleProductPage.hasClass('visible')) {
	//
	// 		var clicked = $(e.target);
	//
	// 		// If the close button or the background are clicked go to the previous page.
	// 		if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
	// 			// Change the url hash with the last used filters.
	// 			createQueryHash(filters);
	// 		}
	//
	// 	}
	//
	// });

	var ref = firebase.database().ref();
	ref.on("value", function(snapshot) {
		console.log(snapshot.val());

		//Write the data into our global variable.
		teams = snapshot.val();

		// Call a function to create HTML for all the products.
		generateAllProductsHTML(teams);

	// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	},

	function (error) {
		console.log("Error: " + error.code);
	});

	//
	// ref.on("value", function(snapshot) {
	// 	console.log(snapshot.val());
	//
	// 	//Write the data into our global variable.
	// 	players = snapshot.val();
	//
	// 	// Call a function to create HTML for all the products.
	// 	generateAllProductsHTML2(players);
	//
	// // Manually trigger a hashchange to start the app.
	// 	$(window).trigger('hashchange');
	// },
	//
	// function (error) {
	// 	console.log("Error: " + error.code);
	// });


	// An event handler with calls the render function on every hashchange.
	// The render function will show the appropriate content of out page.
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

	// Navigation

	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];
		console.log("url :" + temp);

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');


		var	map = {

			// The "Homepage".
			'#': function() {
				renderProductsPage(teams);
			}
			//
			// // Single Products page.
			// '#team': function() {
			//
			// 	// Get the index of which product we want to show and call the appropriate function.
			// 	var index = url.split('#team/')[1].trim();
			// 	console.log("index :" + url.split('#product/')[1].trim());
			//
			// 	renderTeamPage(index, teams);
			// }

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
	// This function is called only once - on page load.
	// It fills up the products list via a handlebars template.
	// It recieves one parameter - the data we took from products.json.
	function generateAllProductsHTML(data){

		var list = $('.all-products .products-list');

		var theTemplateScript = $("#products-template").html();
		//Compile the template​
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));


		// Each products has a data-index attribute.
		// On click change the url hash to open up a preview for this product only.
		// Remember: every hashchange triggers the render function.
		list.find('li').on('click', function (e) {
			e.preventDefault();

			var productIndex = $(this).data('index');

			window.location.hash = 'team/' + productIndex;
			console.log("window.location.hash" + window.location.hash);
		})
	}


	//
	// function generateAllProductsHTML2(data){
	//
	// 	var list = $('.all-players .players-list');
	//
	// 	var theTemplateScript = $("#player-template").html();
	// 	//Compile the template​
	// 	var theTemplate = Handlebars.compile (theTemplateScript);
	// 	list.append (theTemplate(data));
	//
	//
	// 	// Each products has a data-index attribute.
	// 	// On click change the url hash to open up a preview for this product only.
	// 	// Remember: every hashchange triggers the render function.
	// 	list.find('li').on('click', function (e) {
	// 		e.preventDefault();
	//
	// 		var productIndex = $(this).data('index');
	//
	// 		window.location.hash = 'team/' + productIndex;
	// 		console.log("window.location.hash" + window.location.hash);
	// 	})
	// }
	// This function receives an object containing all the product we want to show.
	function renderProductsPage(data){

		var page = $('.all-products'),
			allProducts = $('.all-products .products-list > li');

		// Hide all the products in the products list.
		allProducts.addClass('hidden');

		// Iterate over all of the products.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allProducts.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');

	}
	// // This function receives an object containing all the product we want to show.
	// function renderTeamsPage(data){
	//
	// 	var page = $('.all-players'),
	// 	allProducts = $('.all-players .players-list > li');
	//
	// 	// Hide all the products in the products list.
	// 	allProducts.addClass('hidden');
	//
	// 	// Iterate over all of the products.
	// 	// If their ID is somewhere in the data object remove the hidden class to reveal them.
	// 	allProducts.each(function () {
	//
	// 		var that = $(this);
	//
	// 		data.forEach(function (item) {
	// 			if(that.data('index') == item.id){
	// 				that.removeClass('hidden');
	// 			}
	// 		});
	// 	});
	//
	// 	// Show the page itself.
	// 	// (the render function hides all pages so we need to show the one we want).
	// 	page.addClass('visible');
	//
	// }
	// Shows the error page.
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}

});

