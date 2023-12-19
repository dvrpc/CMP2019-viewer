
// this code is dirty and messy and not going to clean it up
function surveylaunch(element) {
//   $("#SurveyModal").modal("show");
window.open("https://dvrpcgis.maps.arcgis.com/apps/MapSeries/index.html?appid=b2b9f9a42dd84f36a4059db56c89b19e");
}

var CMP_PA = 'https://arcgis.dvrpc.org/portal/rest/services/Transportation/cmp2023_corridorareas/FeatureServer/0/query?where=state=%27PA%27&outFields=*&returnGeometry=true&geometryPrecision=4&outSR=4326&f=geojson';



var CMP_NJ = 'https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_CorridorSubCorridorAreas/FeatureServer/0/query?where=state=%27NJ%27&outFields=*&returnGeometry=true&geometryPrecision=4&outSR=4326&f=geojson';

var allIDs = [];
var filterGroup = document.getElementById('filter-group');
var layerID;
var hoveredStateId = null;
var map;
var mapLayers = [], identifyLayers = [];
// var layer_ids = [];
var resetData = true;
var resetInfo = true;

var pane = document.getElementById('selectedFeatures');
// query the checkbox
//OPEN ABOUT DIALOG
// $('#aboutModal').modal();
//   $('#slidercase').appendTo('#map');

var info = document.getElementById('selectedFeatures');
var layer;

$(window).resize(function() {
    $('.tt-dropdown-menu').css('max-height', $('#container').height() - $('.navbar').height() - 20);
});

//Document Ready
$(document).ready(function() {

});

mapboxgl.accessToken = 'pk.eyJ1IjoiY3J2YW5wb2xsYXJkIiwiYSI6Ii00ZklVS28ifQ.Ht4KwAM3ZUjo1dT2Erskgg';
  
    var map = new mapboxgl.Map({
        container: 'map',
       style: 'mapbox://styles/mapbox/light-v10',
      //  style:'mapbox://styles/mapbox/navigation-preview-night-v4',
     //  style:'mapbox://styles/mapbox/navigation-guidance-night-v4',
     //    style:'mapbox://styles/crvanpollard/ck5fpyqti0v971itf7edp2eyd',
        center: [   -75.170669,    40.08], 
        zoom: 9
    });

 // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(),['top-right']);
 //   map.addControl(new mapboxgl.AttributionControl(),'bottom-right');

       // Zoom to Extent
    document.getElementById('zoomtoregion').addEventListener('click', function () {
        map.flyTo({
            center: [ -75.170669,39.950143], 
                zoom: 9,
                speed: 0.5
        });
    });

      var slider = document.getElementById('slider');
      var sliderValue = document.getElementById('slider-value');

    map.on('load', function() {

      var layers = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      var firstSymbolId;
      for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
      firstSymbolId = layers[i].id;
      break;
      }
      }
      // County
      map.addLayer({
            "id": "county",
            "type": "line",
            "source": {
                type: 'vector',
                url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
            },
            "source-layer": "county",
            "layout": {},
            "paint": {
                'line-width': 2,
                'line-color': '#434343'
            },
            "filter": [
                    "==",
                    "dvrpc",
                    "Yes"
            ]
        });
 // MCD
  map.addLayer({
            "id": "municipalities",
            "type": "line",
            "minzoom": 10,
            "source": {
                type: 'vector',
                url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
            },
            "source-layer": "municipalities",
            "layout": {},
            "paint": {
                'line-width': .5,
                'line-color': '#c1c1c1'
            },
               firstSymbolId
    
     //       "filter": ["==", "dvrpc", "Yes"]
   });


// Add a GeoJSON source containing CMP coordinates and information.
  map.addSource('CMP_PA', {
  'type': 'geojson',
  'data': CMP_PA
  });

  map.addSource('CMP_NJ', {
  'type': 'geojson',
  'data': CMP_NJ
  });


  $.ajax(CMP_PA)
    .done(function(data) {
    //   data = JSON.parse(data)
      data = JSON.parse(JSON.stringify(data));
    //   console.log(data.features)

      data.features.forEach(function(feature) {
        var CMP_ID = feature.properties['cmp_id'];
        var layerID = 'PA'+ CMP_ID;
        // console.log(layerID)
    //    allIDs.push(layerID)

        // Add a layer for this symbol type if it hasn't been added already.
        // there's something wonky with this...
        if (!map.getLayer(layerID)) {
            map.addLayer({
                'id': layerID,
                'type': 'fill',
                'source': 'CMP_PA',
                'layout': {visibility:'visible'},
                'paint': {
                'fill-color': [
                    "case",
                    ["==", ["get", "cmp_id"], 1],"#35978f",
                    ["==", ["get", "cmp_id"], 2],"#d53e4f",
                    ["==", ["get", "cmp_id"], 3],"#fc4e2a",
                    ["==", ["get", "cmp_id"], 4],"#abd9e9",
                    ["==", ["get", "cmp_id"], 5],"#fdae61",
                    ["==", ["get", "cmp_id"], 6],"#66bd63",
                    ["==", ["get", "cmp_id"], 7],"#bf812d",
                    ["==", ["get", "cmp_id"], 8],"#82D4F2",
                    ["==", ["get", "cmp_id"], 9],"#DABEDB",
                    ["==", ["get", "cmp_id"], 10],"#B57DB6",
                    ["==", ["get", "cmp_id"], 11],"#FAF078",
                    ["==", ["get", "cmp_id"], 12],"#DB7DB3",
                    ["==", ["get", "cmp_id"], 13],"#dfc27d",
                    ["==", ["get", "cmp_id"], 14],"#80AEDD",
                    ["==", ["get", "cmp_id"], 15],"#9DCB3B",
                    ["==", ["get", "cmp_id"], 16],"#FFEBBE",
                    ["==", ["get", "cmp_id"], 17],"#39BF7C",
                    ["==", ["get", "cmp_id"], 18],"#02818a",
                    ["==", ["get", "cmp_id"], 19],"#993404",
                    ["==", ["get", "cmp_id"], 20],"#fee08b",
                    "#cccccc"
                  ],
                    'fill-outline-color' :['case',['boolean', ['feature-state', 'hover'], false],"#000000","#7c7c7c" ],
                  'fill-opacity' :['case',['boolean', ['feature-state', 'hover'], false],1,0.8]
                },
                'filter': ['==', 'cmp_id', CMP_ID]
            },
            firstSymbolId

            );
            map.on('mousemove', layerID, hoverTooltip)
            map.on('mouseleave', layerID, unhoverTooltip)
        }
              
      });
    })
    .fail(function(xhr, status) {
      console.log('failed because: ', status)
    })
      
  $.ajax(CMP_NJ)
  .done(function(data) {
  // data = JSON.parse(data)
  data = JSON.parse(JSON.stringify(data));
  //  console.log(data.features)

  data.features.forEach(function(feature) {
    var CMP_ID = feature.properties['cmp_id'];
    var layerID = 'NJ'+ CMP_ID;
  //    console.log(layerID)
  //    allIDs.push(layerID)

    // Add a layer for this symbol type if it hasn't been added already.
    // there's something wonky with this...
    if (!map.getLayer(layerID)) {
        map.addLayer({
            'id': layerID,
            'type': 'fill',
            'source': 'CMP_NJ',
            'layout': {visibility:'visible'},
            'paint': {
            'fill-color': [
                "case",
                ["==", ["get", "cmp_id"], 1],"#d53e4f",
                ["==", ["get", "cmp_id"], 2],"#39BF7C",
                ["==", ["get", "cmp_id"], 3],"#B57DB6",
                ["==", ["get", "cmp_id"], 4],"#FAF078",
                ["==", ["get", "cmp_id"], 5],"#D7C19E",
                ["==", ["get", "cmp_id"], 6],"#F9BDBF",
                ["==", ["get", "cmp_id"], 7],"#FEEAAE",
                ["==", ["get", "cmp_id"], 8],"#8BC867",
                ["==", ["get", "cmp_id"], 9],"#35978f",
                ["==", ["get", "cmp_id"], 10],"#FFD380",
                ["==", ["get", "cmp_id"], 11],"#92D3C8",
                ["==", ["get", "cmp_id"], 12],"#02818a",
                ["==", ["get", "cmp_id"], 13],"#993404",
                ["==", ["get", "cmp_id"], 14],"#F5CA7A",
                ["==", ["get", "cmp_id"], 15],"#bb6cf0",
                ["==", ["get", "cmp_id"], 16],"#80AEDD",
                ["==", ["get", "cmp_id"], 17],"#FFFF00",
                "#cccccc"
              ],
              'fill-outline-color' :['case',['boolean', ['feature-state', 'hover'], false],"#000000","#7c7c7c" ],
              'fill-opacity' :['case',['boolean', ['feature-state', 'hover'], false],1,0.8]
            },
            'filter': ['==', 'cmp_id', CMP_ID]
        },
          firstSymbolId
        );
        map.on('mousemove', layerID, hoverTooltipNJ)
        map.on('mouseleave', layerID, unhoverTooltipNJ)
    }
  });
  })
  .fail(function(xhr, status) {
  console.log('failed because: ', status)
  })

    });

  slider.addEventListener('input', function(e) {
    //slide(e);
    let a = ['PA1','PA2','PA3','PA4','PA5','PA6','PA7','PA8','PA9','PA10','PA11','PA12','PA13','PA14','PA15','PA16','PA17','PA18','PA19','PA20','NJ1','NJ2','NJ3','NJ4','NJ5','NJ6','NJ7','NJ8','NJ9','NJ10','NJ11','NJ12','NJ13','NJ14','NJ15','NJ16','NJ17'];
  for (let index = 0; index < a.length; ++index) {
      let value = a[index];
        map.setPaintProperty(value,'fill-opacity',parseInt(e.target.value, 10) / 100);
  // Value indicator
  sliderValue.textContent = e.target.value + '%';
  }
  });

  // Toggle individual CMP corridor layers
  $('input:checkbox[name="overlayLayers"]').on('change', function(e) {
      var id = this.id;

      if ( id === 'all' ) {
    //  alert("DUDE!");
    //  map.setLayoutProperty(this.id,'visibility', e.target.checked ? 'visible' : 'none');
      } 
      else if ( id === this.id ) {
    //  map.setLayoutProperty('PA2','visibility', e.target.checked ? 'visible' : 'none');
      map.setLayoutProperty(this.id,'visibility', e.target.checked ? 'visible' : 'none');
      } 
      else {
    //     map.setLayoutProperty(id,'visibility', 'visible');
          return id;
      }
  });

  //Document Ready
  $(document).ready(function() {
      //layer group check all functionality
      $('input.checked_all').on('change', function() {
          //var listPanel = $(this)
          var $element = $(this);
          if ($element.prop('checked') == true) {
              $element.siblings('.checkbox').find('input').prop('checked', true).change();
          } else {
              $element.siblings('.checkbox').find('input').prop('checked', false).change();
          }
      });

  });

  // CMP Corridor Query
        map.on('click', function (e) {
        //  (resetInfo)? $('#cmp_info').hide() : resetInfo = true;
            var bbox = [[e.point.x - 5, e.point.y - 5],[e.point.x + 5, e.point.y + 5]];
            var features = map.queryRenderedFeatures(bbox, {layers: ['PA1','PA2','PA3','PA4','PA5','PA6','PA7','PA8','PA9','PA10','PA11','PA12','PA13','PA14','PA15','PA16','PA17','PA18','PA19','PA20','NJ1','NJ2','NJ3','NJ4','NJ5','NJ6','NJ7','NJ8','NJ9','NJ10','NJ11','NJ12','NJ13','NJ14','NJ15','NJ16','NJ17']});

              if (!features.length) {
                  //  var contentCMP = '';
            var contentCMP = '';
                infosidebar.innerHTML = contentCMP;
                return;
              }
              $('#myTab a[href="#Results"]').tab('show');
              var contentCMP = '';

              for(var i = 0; i<features.length; i++) {
                var cmp = features[i].properties.cmp_id
                var subid = features[i].properties.sub_id 
                var banner = features[i].properties.web_color
                var name = features[i].properties.name
                var subname = features[i].properties.subname
                var priority = features[i].properties.priority
                var shield = features[i].properties.shield
                var state = features[i].properties.state


            var newSet = '<h4 style="color:white;background-color:' + banner + '"><div class="label"><img class="shield" src="' + shield + ' ">' + name + '</div></h4>' + "<div class='labelfield'><b>Subcorridor ID/Name: </b>" + cmp + subid + " - " + subname + "<br>" + "<div class='labelfield'><b>Priority Subcorridor: </b>" + priority + "</div>" +
              '<img style="margin:0px 0px 5px 0px" src="img/document.png"/>&nbsp; - <a class="one" href="https://www.dvrpc.org/asp/CMP2019/'+ state+'CMP2019Detail.aspx?corridor='+cmp+'&subcorridor='+ subid + '" target="_blank"> ' + "View Subcorridor Information" + "</a><br>" 
                          ;

                contentCMP += newSet
              }
              infosidebar.innerHTML = contentCMP;

        });


        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });

        var hoverTooltip = function(e) {
            popup
            .setLngLat(e.lngLat)
            .setHTML(e.features.map(function(feature) { return feature.properties.name + ' ('+ feature.properties.gis_id +')'; }).join(', '))
            .addTo(map);

            currentHover = e.features[0].id;

            if (hoveredStateId !== currentHover) {
              // remove paint (exclude first pass where hoverdStateId is undefined)
              if(hoveredStateId){
                map.setFeatureState(
                { source: 'CMP_PA', id: hoveredStateId },
                { hover: false }
              );
              }

              // reassign hoverste and paint again
              hoveredStateId = currentHover
              map.setFeatureState(
              { source: 'CMP_PA', id: currentHover },
              { hover: true }
              );
            }
        }

        var unhoverTooltip = function(e) {
            map.getCanvas().style.cursor = '';
            popup.remove();

          if (hoveredStateId) {
          map.setFeatureState(
          { source: 'CMP_PA', id: hoveredStateId },
          { hover: false }
          );
          }
          hoveredStateId = null;
        }

        var hoverTooltipNJ = function(e) {
            popup
            .setLngLat(e.lngLat)
            .setHTML(e.features.map(function(feature) { return feature.properties.name + '('+ feature.properties.gis_id +')'; }).join(', '))
            .addTo(map);

            currentHover = e.features[0].id;

            if (hoveredStateId !== currentHover) {
              // remove paint (exclude first pass where hoverdStateId is undefined)
              if(hoveredStateId){
                map.setFeatureState(
                { source: 'CMP_NJ', id: hoveredStateId },
                { hover: false }
              );
              }

              // reassign hoverste and paint again
              hoveredStateId = currentHover
              map.setFeatureState(
              { source: 'CMP_NJ', id: currentHover },
              { hover: true }
              );
            }
        }

        var unhoverTooltipNJ = function(e) {
            map.getCanvas().style.cursor = '';
            popup.remove();

          if (hoveredStateId) {
          map.setFeatureState(
          { source: 'CMP_NJ', id: hoveredStateId },
          { hover: false }
          );
          }
          hoveredStateId = null;
        }

// Placeholder hack for IE
if (navigator.appName == "Microsoft Internet Explorer") {
    $("input").each(function() {
        if ($(this).val() == "" && $(this).attr("placeholder") != "") {
            $(this).val($(this).attr("placeholder"));
            $(this).focus(function() {
                if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
            });
            $(this).blur(function() {
                if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
            });
        }
    });
}