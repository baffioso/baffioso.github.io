$(document).ready(function() {

  //hent data/rydkort knappen gemmes og vises efter ajax er afsluttet
  $("#hentdata").hide();
  $("#rydkort").hide();
  $("#statistik").hide();

  //ved skift af input i Browse CSV køres csvFile funktionen
  $("#csv-file").change(csvFile);

  //Søgning
  $( "#search" ).click(function() {
    //værdien fra søgefeltet hentes og føjes til propertiet adresse i objektet query
    var query = {
      adresse: $('#query').val()
    };
    //geokoder funktionen køres
    geocoder([query]);
  });

  //Søg når der trykkes enter
  $("#query").keyup(function(event){
      if(event.keyCode == 13){
          $("#search").click();
      }
  });

  //Når der tykkes på ryd kort knappen køres funktionen
  $('#rydkort').click(function() {
    clearMarkers();
  });

  //Tooltip aktiveres
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  })


  //Global array som fyldes op med csv-data og kooridinater m.m. fra DAWA
  var output = [];

  //CSV
  function csvFile(evt) {
    var file = evt.target.files[0];
    //PapaParse bruges til at parse lokal CSV-fil
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        //geocoder køres for at finde koordinater, tilføje markør/popup til kort
        //OBS kolonne i CSV skal hedde "adresse"
        geocoder(results.data);
      }
    });
  }


  function geocoder(csvAdresse) {
    //Loop over csv adresserne fra csvFile funktionen
    $.each(csvAdresse, function(index, value) {
      //Der laves to kald:
      // - det første returnere DAWA datavask resultater
      $.getJSON('http://dawa.aws.dk/datavask/adresser?betegnelse=' + csvAdresse[index].adresse, function(data) {
        //kategori gemmes i variabel, så det kan bruges inde i næste ajax kald
        var kategori = data.kategori
        //Med href fra første datavask kaldes DAWA adgangsadresse så koordinater kan angives
        $.getJSON(data.resultater[0].aktueladresse.href, function(data) {
          koordinater = data.adgangsadresse.adgangspunkt.koordinater;
          //Der laves markører med koordinaterne
          var marker = L.marker([koordinater[1], koordinater[0]]);
          //Markører farves, så de angiver kvaliteten af match
          if (kategori === 'A') {
            marker.setIcon(L.mapbox.marker.icon({
              'marker-color': '#04B404',
              'marker-symbol': '1'
            }));
          } else if (kategori === 'B') {
            marker.setIcon(L.mapbox.marker.icon({
              'marker-color': '#FFBF00',
              'marker-symbol': '2'
            }));
          } else if (kategori === 'C') {
            marker.setIcon(L.mapbox.marker.icon({
              'marker-color': '#DF0101',
              'marker-symbol': '3'
            }));
          } else {
            marker.setIcon(L.mapbox.marker.icon({}));
          }
          //Der laves popup
          marker.bindPopup('<b>CSV-adresse:</b></br>' + csvAdresse[index].adresse + '</br><b>Officiel adresse:</b></br>' + data.adressebetegnelse);
          //mouseover popup
          marker.on('mouseover', function(e) {
            this.openPopup();
          });
          marker.on('mouseout', function(e) {
            this.closePopup();
          });
          //marker tilføjes laget markers
          markers.addLayer(marker);
          //Markers-laget føjes til kortet
          map.addLayer(markers);

          //Koordinater og matchkategori tilføjes csv-data
          csvAdresse[index].lat = koordinater[1];
          csvAdresse[index].lon = koordinater[0];
          csvAdresse[index].matchkategori = kategori;
          //det opdaterede objekt skubbes ind i den globale output array
          output.push(csvAdresse[index]);
        });
      });
    });
  }

  function outputData() {
    //output array laves om til geojson
    var obj = GeoJSON.parse(output, {
      Point: ['lat', 'lon']
    });

    //gem fil lokalt
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'adressevask.geojson';
    a.innerHTML = 'HENT GEOJSON';

    var container = document.getElementById('hentdata');
    container.appendChild(a);
  }

  function clearMarkers() {
    //Markører fjernes fra kortet
    markers.clearLayers();
    //array tømmes
    output = []
      //knapper fjernes
    $("#hentdata").html('').hide();
    $("#rydkort").hide();
    $("#statistik").hide();
    //input filen fjernes
    $("#csv-file").val('');
  }


  function countKategori() {
    //arrays til at matchkategori
    var a = []
    var b = []
    var c = []
    //for hver kategori fyldes array om med værdier
    $.each(output, function(index, value) {
      switch (output[index].matchkategori) {
        case 'A':
          a.push('A');
          break;
        case 'B':
          b.push('B');
          break;
        case 'C':
          c.push('C');
          break;
      }
    });
    //værdierne i array tælles og føjes til modal
    $("#katA").html(a.length)
    $("#katB").html(b.length)
    $("#katC").html(c.length)
  }

  //Cluster marker
  var markers = new L.MarkerClusterGroup();

  //Leaflet baggrundskort tilføjes
  L.mapbox.accessToken = 'pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiT1JTS1lIMCJ9.f5ubY91Bi42yPnTrgiq-Gw';
  var map = L.map('mapid').setView([56, 12], 6);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'baffioso.ie1ok8lg',
    accessToken: L.mapbox.accessToken
  }).addTo(map);

  //Loader animation mens ajax kører (http://stackoverflow.com/questions/1964839/how-can-i-create-a-please-wait-loading-animation-using-jquery)
  $body = $("body");

  //ved ajax start vises spinner og ved stop fjernes spinner og knapper tilføjes
  $(document).on({
    ajaxStart: function() {
      $body.addClass("loading");
    },
    ajaxStop: function() {
      $body.removeClass("loading");
      //Knapperne hentdata/rydkort vises efter endt ajax
      $("#hentdata").empty().show(); //hent data knappen tømmes så ikke link dubleres
      $("#rydkort").show();
      $("#statistik").show();
      //output data tilføjes til hent knappen som href med funktionen
      outputData();
      //statistik for match beregnes og tilføjes modal
      countKategori();
    }
  });
});
