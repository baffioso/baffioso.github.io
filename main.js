//Variabel med array som indeholder de schemaer med de temaer der skal listes. Her kan der tilføjes og fjernes schemaer.
var schemas = [ '_17_undervisning' , 'driftweb' , '_09_miljoebeskyttelse' , '_00_grundkort' , '_01_fysisk_plan_og_naturbeskyt' ];

//Det ydre loop tager schemanavn og smider ind i url'en som bruges i getJson funktion som tilknyttes variablen result
for (var i = 0; i < schemas.length; i++) {
	
	//function defineres, som med AJAX/jQuery henter JSON fra API 
	function getJson(url) {
		return JSON.parse($.ajax({
			 type: 'GET',
			 url: url,
			 dataType: 'json',
			 global: false,
			 async: false,
			 success: function(data) {
			 	return data;
		 	}
	 	}).responseText);
	}

	var result = getJson("http://ballerup.mapcentia.com/api/v1/metadata/ballerup/"+schemas[i]);

	//Det indre loop udskriver tabelnavnet (f_table_title) og beskrivelse (f_table_abstract) for hver tabel i schemaerne.
	//Else If-statement bruges til at angive tabelnavnet fra postgresql, hvis ikke der er angivet et alias i GC2 og sætte beskrivelse 
	//til 'Ikke oplyst' hvis der f_table_abstract er null
	
	for (var j = 0; j < result.data.length; j++) {

		var name = result.data[j].f_table_name;
		var title = result.data[j].f_table_title;
		var abstract = result.data[j].f_table_abstract;
		var schema = result.data[j].f_table_schema;
		var kleNr = result.data[j].extra;

		function showOnMap(schema, table) {
			return '<a href="http://ballerup.mapcentia.com/apps/viewer/ballerup/'+schema+'/#stamenToner/12/12.3342/55.7363/'+schema+'.'+table+'" target="_blank">Vis</a>';
		}

		function kle(number) {
			if(number == null) {
				return 'Mangler';
			} else {
				return '<a href="http://www.kle-online.dk/emneplan/'+number.substring(0, 2)+'/#'+number+'" target="_blank">KLE-info</a>';
			}
		}

		function service(schema) {
			return '<a href="http://ballerup.mapcentia.com/wfs/ballerup/'+schema+'/25832">WFS</a> <a href="http://ballerup.mapcentia.com/wms/ballerup/'+schema+'/">WMS</a>';
		}

		if (title == null && abstract == null) {
			document.write('<tr><td class="name">'+name+'</td><td>Ikke oplyst</td><td>'+schema+'</td><td>'+showOnMap(schema, name)+'</td><td>'+kle(kleNr)+'</td><td>'+service(schema)+'</td></tr>');
		} else if (title !== null && abstract == null) {
			document.write('<tr><td class="name">'+title+'</td><td>Ikke oplyst</td><td>'+schema+'</td><td>'+showOnMap(schema, name)+'</td><td>'+kle(kleNr)+'</td><td>'+service(schema)+'</td></tr>');
		} else if (title == null && abstract !== null) {
			document.write('<tr><td class="name">'+name+'</td><td>'+abstract+'</td><td>'+schema+'</td><td>'+showOnMap(schema, name)+'</td><td>'+kle(kleNr)+'</td><td>'+service(schema)+'</td></tr>');	
		} else {
			document.write('<tr><td class="name">'+title+'</td><td>'+abstract+'</td><td>'+schema+'</td><td>'+showOnMap(schema, name)+'</td><td>'+kle(kleNr)+'</td><td>'+service(schema)+'</td></tr>');
		}

	}	

}

//List.js funktioner tilføjes
var options = {
  	valueNames: [ 'name' ]
};

var userList = new List('users', options);

