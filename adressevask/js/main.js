$(document).ready(function() {

    //diverse knapper gemmes og vises efter ajax er afsluttet
    $("#hentdata, #rydkort, #statistik, #scroller").hide();

    //ved skift af input i Browse CSV køres csvFile funktionen
    $("#csv-file").change(csvFile);

    //Søgning
    $("#search").click(function() {
        //værdien fra søgefeltet hentes og føjes til propertiet adresse i objektet query
        var query = {
            adresse: $('#query').val()
        };
        //geokoder funktionen køres
        geocoder([query]);
    });

    //Søg når der trykkes enter
    $("#query").keyup(function(event) {
        if (event.keyCode == 13) {
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

    //Vælg alle checkboxe i GeoJSON-output Modal
    $("#checkAll").change(function() {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });

    //HENT GeoJSON knap kører outputfunktion
    $('#geojson').click(function() {
        outputData();
    });

    //Scroll til tabel/kort
    $("#showTable").click(function() {
        $('html, body').animate({
            scrollTop: $("#jsGrid").offset().top
        }, 500);
    });
    $("#showMap").click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

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

    function geocoder(adresse) {
        //Loop over csv adresserne fra csvFile funktionen
        $.each(adresse, function(index, value) {
            //Der laves to kald:
            // - det første returnere DAWA datavask resultater
            $.getJSON('http://dawa.aws.dk/datavask/adresser?betegnelse=' + adresse[index].adresse, function(data) {
                //kategori gemmes i variabel, så det kan bruges inde i næste ajax kald
                var kategori = data.kategori
                //Oprettes object til variationer i vejnavne (fuzzy match)
                var fundnevejnavne = {};
                //Loopes over DAWA's returnerede resultater, som ved upræcist
                //match (kategori C), kan være flere forskellige adresser
                $.each(data.resultater, function(_, resultat) {
                    //Der undersøges om vejnavn/postnr eksisterer i objektet,
                    //da der kun ønskes ét vejnavne for hvert postnr
                    //Derudover om aktueladresse.status er !=  1 (endelig adresse og ikke log)
                    if (resultat.adresse.vejnavn + ', ' + resultat.adresse.postnr in fundnevejnavne || resultat.aktueladresse.status !== 1) {
                        //eksisterer vejnanvnet hoppes til næste iteration
                        return;
                    }
                    //DAWA-resultatets vejnavn/postnr tilføjes objektet så der i næste
                    //iteration kan tjekkes om det allerede er geokodet
                    fundnevejnavne[resultat.adresse.vejnavn + ', ' + resultat.adresse.postnr] = true;
                    //Med href fra datavask kaldes DAWA adgangsadresse, så
                    //koordinater (m.m.) kan bruges til geokodningen
                    $.getJSON(resultat.aktueladresse.href, function(data) {
                        koordinater = data.adgangsadresse.adgangspunkt.koordinater;
                        //Der laves markører med koordinaterne
                        var marker = L.marker([koordinater[1], koordinater[0]]);
                        //Markører farves, så de angiver kvaliteten af match (kategori)
                        function markerStyle(img) {
                            marker.setIcon(L.icon({
                                iconUrl: img,
                                shadowUrl: "img/shadow.png",
                                iconAnchor: [16, 37],
                                shadowAnchor: [20, 35],
                                popupAnchor: [0, -30]
                            }));
                        }
                        switch (kategori) {
                            case 'A':
                                markerStyle("img/a.png");
                                break;
                            case 'B':
                                markerStyle("img/b.png");
                                break;
                            case 'C':
                                markerStyle("img/c.png");
                                break;
                            default:
                                marker.setIcon(L.mapbox.marker.icon({}));
                        }
                        //Der laves popup
                        marker.bindPopup('<b>Søgeadresse:</b></br>' + adresse[index].adresse + '</br><b>Vaskeadresse:</b></br>' + data.adressebetegnelse);
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
                        //Koordinater og en række andre attributter fra DAWA's datavask tilføjes csv-data
                        adresse[index].lat = koordinater[1];
                        adresse[index].lon = koordinater[0];
                        adresse[index].matchkategori = kategori;
                        adresse[index].officieladresse = data.adressebetegnelse;
                        //Disse attributter kan tilvælges i modal
                        adresse[index].kommunenr = data.adgangsadresse.kommune.kode;
                        adresse[index].vejkode = data.adgangsadresse.vejstykke.kode;
                        adresse[index].husnr = data.adgangsadresse.husnr;
                        adresse[index].etage = data.etage;
                        adresse[index].doer = data['dør'];
                        adresse[index].adresseurl = data.href;
                        adresse[index].ejerlav = data.adgangsadresse.ejerlav.navn;
                        adresse[index].matrikelnr = data.adgangsadresse.matrikelnr;
                        adresse[index].ejendomsnr = data.adgangsadresse.esrejendomsnr;
                        adresse[index].sogn = data.adgangsadresse.sogn.navn;
                        adresse[index].region = data.adgangsadresse.region.navn;
                        adresse[index].retskreds = data.adgangsadresse.retskreds.navn;
                        adresse[index].politikreds = data.adgangsadresse.politikreds.navn;
                        adresse[index].opstillingskreds = data.adgangsadresse.opstillingskreds.navn;
                        //adresse[index].leaflet_marker_id = marker._leaflet_id; //SKal måske bruges til at aktivere popup
                        //det opdaterede objekt skubbes ind i den globale output array
                        output.push(adresse[index]);
                    }); //getJSON adgangsadresse
                }); //each datavask
            }); //getJSON datavadk
        }); //each CSV
    }

    function outputData() {

        //Cloner output for at bevare original data, så bruger kan
        //ombestemme sig når attributter vælges i download dialog
        //Kan måske også laves med array.filter eller $.grep
        var outputCopy = $.extend(true, [], output);

        //Tester forkortet udgave
        var attri = [
            'kommunenr',
            'vejkode',
            'husnr',
            'etage',
            'doer',
            'adresseurl',
            'region',
            'ejerlav',
            'matrikelnr',
            'ejendomsnr',
            'sogn',
            'opstillingskreds',
            'retskreds',
            'politikreds'
        ];

        //Hvis attribut/poperty fra ovenstående array ikke er checked i modal,
        //slettes den fra outputCopy
        $.each(attri, function(_, val) {
            if ($('#' + val).prop('checked') == false) {
                $.each(outputCopy, function(i) {
                    delete outputCopy[i][val];
                });
            }
        });

        //output array laves om til geojson med GeoJSON JS-bibliotek.
        var obj = GeoJSON.parse(outputCopy, {
            Point: ['lat', 'lon']
        });

        //data som skal gemmes lokalt laves til en geojson tekst
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

        //der laves link som indeholder parset geojson til download
        var a = $("<a>")
            .attr("href", 'data:' + data)
            .attr("download", 'adressevask.geojson')
            .appendTo("body")[0].click(); //linket åbnes/download dialog
    }

    function clearMarkers() {
        //Markører fjernes fra kortet
        markers.clearLayers();
        //array tømmes
        output = []
            //knapper og tabel fjernes
        $("#hentdata, #rydkort, #statistik, #scroller").fadeOut();
        //input filen fjernes
        $("#csv-file").val('');

        $("#jsGrid").hide();
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

    function createTable() {
        $("#jsGrid").show();
        $("#jsGrid").jsGrid({
            width: "100%",
            height: "100%",

            selecting: true,
            sorting: true,
            paging: false,

            data: output,
            //Når der trykkes på en række zoomes til adressen
            rowClick: function(item) {
                //der scrolles til kortet div
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
                //pan til adresse og zoom ind
                map.setView({
                    lat: item.item.lat,
                    lng: item.item.lon
                }, 17)
            },

            fields: [{
                title: "Søgeadresse",
                name: "adresse",
                type: "text"
            }, {
                title: "Vaskeadresse",
                name: "officieladresse",
                type: "text"
            }, {
                title: "Matchkategori",
                name: "matchkategori",
                type: "text",
                width: 30
            }]
        });
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
            //Tilføjer tabellen
            createTable();
            //Knapperne hentdata/rydkort vises efter endt ajax
            $("#hentdata, #rydkort, #statistik, #scroller").show();
            //statistik for match beregnes og tilføjes modal
            countKategori();
        }
    });

});
