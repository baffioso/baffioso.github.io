/* ========================== */
/* ======= IMAGE GRID ======= */
/* ========================== */

var imageView = {

	init: function() {
		this.render();
	},

	render: function() {
		//Clear div
		$("#imageGrid").empty();

		var images = controller.getImages();


		for (var i = 0; i < images.length; i++) {

			//Create div col-md-x for every image
			var div = document.createElement('div');
			div.setAttribute('class', "col-md-3 grid-cell");
			div.setAttribute('id', "div" + i);
			$("#imageGrid").append(div);
			
			//Create images title 
			var title =document.createElement("h5");
			title.textContent = images[i].title;

			//Create images for grid
			var img = document.createElement('img');
			img.setAttribute('src', "img/" + images[i].img);
			img.setAttribute('class', "img-rounded img-responsive");
			img.setAttribute('id', "img" + i);

			//Add title and images to above created element
			$("#div" + i).append(img, title);

			//wrapping links on images
			$("#img" + i).wrap("<a href='img/" + images[i].img + "'></a>")			
		};

		//Create rows for image grid
		var rows = $("#imageGrid > .grid-cell");
		for (var i = 0; i < rows.length; i+=4) {
			rows.slice(i, i+4).wrapAll("<div class='row'></div>");
		};		
	}
};


/* ========================= */
/* ======= SLIDESHOW ======= */
/* ========================= */

var slideshowView = {

	init: function() {
		this.render();
	},

	render: function() {
		//Clear div
		$(".carousel-inner").empty();

		var images = controller.getImages();


		for (var i = 0; i < images.length; i++) {

			//Create item div for carousel
			var divCaro = document.createElement('div');
			divCaro.setAttribute('class', "item");
			divCaro.setAttribute('id', "divCar" + i);
			$(".carousel-inner").append(divCaro);

			//Craete caption div for carousel
			var caption = document.createElement('div')
			caption.setAttribute('class', "carousel-caption")
			caption.textContent = images[i].title;;

			//Create images for carousel
			var imgCar = document.createElement('img');
			imgCar.setAttribute('src', "img/" + images[i].img);
			imgCar.setAttribute('class', "img-responsive carousel-img");
			imgCar.setAttribute('id', "imgCar" + i);

			//wrapping div class for carousel
			$("#divCar" + i).append(imgCar, caption);					

		};

		//add active class to first child in carousel
		$(".item").first().addClass("active");				
	}
};


/* =================== */
/* ======= MAP ======= */
/* =================== */

var mapView = {

	init: function() {

		//Workaround map render fail in tab using setTimeout 
		$("#showMap").click(function() {
			setTimeout(function(){
				mapView.renderMap();
				mapView.renderMarkers();				
			}, 200);
		});
	},

	renderMap: function() {
				    
	    //init map and set view
	    this.map = L.map('map').setView([37.5, 14.1], 8);

	    L.mapbox.accessToken = 'pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiT1JTS1lIMCJ9.f5ubY91Bi42yPnTrgiq-Gw';

	    //add tilelayer
	    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	        minZoom: 8,
	        maxZoom: 18,
	        id: 'baffioso.ie1ok8lg',
	        accessToken: L.mapbox.accessToken
	    }).addTo(this.map);

	},

	renderMarkers: function() {
		var images = controller.getImages();

		//marker cluster
		this.markers = L.markerClusterGroup();

		for (var i = 0; i < images.length; i++) {

			//create marker
			var marker = L.marker([images[i].location[1], images[i].location[0]]);

			//create popup with image
			marker.bindPopup("<img src='img/" + images[i].img + "' class='map-img' / > </ br> <p>" + images[i].title + "</p>");

            //add marker to cluster
			this.markers.addLayer(marker);
		}

		//add marker cluster to map
		this.map.addLayer(this.markers);
	}
};


/* ===================== */
/* ======= VIDEO ======= */
/* ===================== */

var videoView = {

	init: function() {
		this.render();
	},

	render: function() {
		var play = undefined;
		var stop = undefined;

		var mlyRoute = new Mapillary.Viewer(
			'mly-route', 
			'cjJ1SUtVOEMtdy11b21JM0tyYTZIQTo2ZmVjNTQ3YWQ0OWI2Yjgx', 
			'vPADgu_OKsjof4rgEMsbKA',
        	{cover: true, cache: false, direction: false}
        );
	    
	    var route = mlyRoute.getComponent("route");

	    route.configure({paths: [
	        {sequenceKey: "Wnnkud-HCi8C_jqMDAOvJQ", startKey: "vPADgu_OKsjof4rgEMsbKA", stopKey: "wud9fo9y017lg2v6uPyBMw",
	         infoKeys: [
	             {key: "vPADgu_OKsjof4rgEMsbKA", description: "Sidste skridt mod toppen af Monte Monaco ved San Vito lo Capo"}
	         ]
	        }
	    ], playing: true});
	    mlyRoute.activateComponent("route");

	    this.play = function play() {
	        mlyRoute.deactivateCover();
	        route.play();
	    }

	    this.stop = function stop() {
	        route.stop()
	    }

	}

};


/* ======================== */
/* ======= DROPDOWN ======= */
/* ======================== */

var dropdownView = {

	init: function() {
		this.render();
	},

	render: function() {
		var images = model.images;
		var areas = {};

		//Create object with unique areas
		$.each(images, function(_, data) {
			if (data.area in areas) {
				return;
			}
			areas[data.area] = true;
		});

		//Add show all to dropdown
		areas["Vis alle"] = true;

		$.each(areas, function(key, _) {

			//trim key for id
			var trimKey = key
				.replace(/ /gi, "_")
				.replace(/'/gi, "-");

			//create elements in dropdown
			var dropdownArea = document.createElement('a');
			dropdownArea.setAttribute('role', 'menuitem');
			dropdownArea.setAttribute('tabindex', "-1");
			dropdownArea.setAttribute('href', "#");
			dropdownArea.setAttribute('id', trimKey);
			dropdownArea.textContent = key;

			//add to dropdown menu
			$("#areaDropdown").append(dropdownArea);

			//add event for filtering images
			$("#" + trimKey).click(function() {

				//apply filter
				controller.filter(key);
				
				//Rename button to selected area
				$("#area").html(key + " <span class='caret'></span>");
			});
		});

		//Event/render for show all images
		$("#Vis_alle").click(function() {

			//set filter array to contain all images
			model.filteredImages = model.images;
			
			//render tabs
			imageView.render();
			slideshowView.render();

			if( mapView.markers != undefined ) {

				//remove markers
				mapView.markers.clearLayers();
				
				//add filtered markers
				mapView.renderMarkers();
			}

			//rename button
			$("#area").html("Vis alle <span class='caret'></span>")
		});
	}
};