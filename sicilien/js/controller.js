var controller = {
	init: function() {

		//set filter array to contain all images
		model.filteredImages = model.images;
		//render tabs and dropdown
		imageView.init();
		slideshowView.init();
		mapView.init();
		dropdownView.init(); 

	},

	getImages: function() {
		return model.filteredImages;		
	},

	filter: function(area) {
		
		//empty filter aray
		model.filteredImages = [];
		
		//Filter images on city/area
		var filterImages = model.images.filter(function(img){
			 return img.area == area;
		});

		//add filtered images to model
		model.filteredImages = filterImages;

		//render tabs
		imageView.render();
		slideshowView.render();

		if( mapView.markers != undefined ) {
			//remove markers
			mapView.markers.clearLayers();
			//add filtered markers
			mapView.renderMarkers();
		}
	}
};