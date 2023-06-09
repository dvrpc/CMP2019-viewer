function legendraw(element) {
    $("#Reduce").modal("show");
}

function legendraw2(element) {
    $("#Increase").modal("show");
}

function legendraw3(element) {
    $("#Rebuild").modal("show");
}

function legendraw4(element) {
    $("#Crash").modal("show");
}

function legendraw5(element) {
    $("#Secure").modal("show");
}

function legendraw6(element) {
    $("#Support").modal("show");
}
function legendraw7(element) {
    $("#Freight").modal("show");
}
function legendraw8(element) {
    $("#PM3").modal("show");
}
 // this is the Survey Modal Call
      function surveylaunch(element) {
     //   $("#SurveyModal").modal("show");
        window.open("https://dvrpcgis.maps.arcgis.com/apps/MapSeries/index.html?appid=732efbf95f76489598277df671b5d6b2");
      }
     var CMP_PA = 'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/CMP_SubcorridorsEmergingCorridors/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&geometryPrecision=4&outSR=4326&f=geojson';
    var CMP_NJ = 'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/CMP_SubcorridorsEmergingCorridors/FeatureServer/1/query?where=1%3D1&outFields=*&returnGeometry=true&geometryPrecision=4&outSR=4326&f=geojson';
    var allIDs = [];
    var filterGroup = document.getElementById('filter-group');
    var layerID;
    var hoveredStateId = null;
var map;
var mapLayers = [], identifyLayers = [];
// var layer_ids = [];
var resetData = true;
var resetInfo = true;
//var TTI_PM,LRP_VC_PM,TransScore_PM,RailPoint_PM,PTI_PM,NHSPoint_PM,TranistPoi_PM,HighCrSev_PM,HighCrFreq_PM, TTTI_PM, HvyTran_PM, Limerick_PM, MajBridge_PM, Bridges_PM, Military_PM, HHDen_PM, EmpDen_PM, StadGathr_PM, Env_PM, InfEmerg_PM, PlanCntr_PM, LOTTR_PM, PHED_PM, TTTR_PM;
var pane = document.getElementById('selectedFeatures');
// query the checkbox
//OPEN ABOUT DIALOG
// $('#aboutModal').modal();
//   $('#slidercase').appendTo('#map');
var TTI, PTI, TSCORE, LRP_VC, CTN, TRANSIT,CRASH1,CRASH2, TTTI,Env,InfEmerg, PlanCntr, LOTTR, PHED, TTTR, all;
var info = document.getElementById('selectedFeatures');
var layer;
function toggleLayer(e){
 //   console.log(e);
    var layer = e.value;
    map.setLayoutProperty('TTI', 'visibility', 'none');
    map.setLayoutProperty('LRP_VC', 'visibility', 'none');
    map.setLayoutProperty('TSCORE', 'visibility', 'none');
    map.setLayoutProperty('PTI', 'visibility', 'none');
    map.setLayoutProperty('CTN','visibility', 'none');
    map.setLayoutProperty('TRANSIT','visibility', 'none');
    map.setLayoutProperty('CRASH1','visibility', 'none');
    map.setLayoutProperty('CRASH2','visibility', 'none');
    map.setLayoutProperty('TTTI','visibility', 'none');
    map.setLayoutProperty('HvyTran','visibility', 'none');
    map.setLayoutProperty('HHDen','visibility', 'none');
    map.setLayoutProperty('Env','visibility', 'none');
    map.setLayoutProperty('InfEmerg','visibility', 'none');
    map.setLayoutProperty('PlanCntr','visibility', 'none');
    map.setLayoutProperty('LOTTR','visibility', 'none');
    map.setLayoutProperty('PHED','visibility', 'none');
    map.setLayoutProperty('TTTR','visibility', 'none');
    //map.setLayoutProperty(layer,'visibility', 'visible');

   // this_layer.setMap(map);

   // shownLayer = this_layer;

    if ( layer === 'none' ) {
        info.innerHTML = '';
        map.setLayoutProperty('TTI', 'visibility', 'none');
        map.setLayoutProperty('LRP_VC', 'visibility', 'none');
        map.setLayoutProperty('TSCORE', 'visibility', 'none');
        map.setLayoutProperty('PTI', 'visibility', 'none');
        map.setLayoutProperty('CTN','visibility', 'none');
        map.setLayoutProperty('TRANSIT','visibility', 'none');
        map.setLayoutProperty('CRASH1','visibility', 'none');
        map.setLayoutProperty('CRASH2','visibility', 'none');
        map.setLayoutProperty('TTTI','visibility', 'none');
        map.setLayoutProperty('HvyTran','visibility', 'none');
        map.setLayoutProperty('HHDen','visibility', 'none');
        map.setLayoutProperty('Env','visibility', 'none');
        map.setLayoutProperty('InfEmerg','visibility', 'none');
        map.setLayoutProperty('PlanCntr','visibility', 'none');
        map.setLayoutProperty('LOTTR','visibility', 'none');
        map.setLayoutProperty('PHED','visibility', 'none');
       map.setLayoutProperty('TTTR','visibility', 'none');
    } else {
       map.setLayoutProperty(layer,'visibility', 'visible');
       return layer;
    }

};

$(window).resize(function() {
    $('.tt-dropdown-menu').css('max-height', $('#container').height() - $('.navbar').height() - 20);
});

//Document Ready
$(document).ready(function() {

 //   $("#PMBtn").click(function() {
 //       $('#PMModal').modal('show');
 //   });

});

$('#PMModal').on('hide.bs.modal', function() {
    // $(this).data('modal', null);
    $('#PMModal').remove();
})

/*function checkIfLoaded() {
    $('.loading-panel').fadeIn();
    cmp_PNT.on("load", function() {
        $('.loading-panel').fadeOut();
    });
}
*/
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


/* 
      var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
function switchLayer(layer) {
var layerId = layer.target.id;
map.setStyle('mapbox://styles/' + layerId);
}
 
for (var i = 0; i < inputs.length; i++) {
inputs[i].onclick = switchLayer;
}
*/
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
              var CMP_ID = feature.properties['CMP_ID'];
              var layerID = 'PA'+ CMP_ID;
              console.log(layerID)
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
                          ["==", ["get", "CMP_ID"], 1],"#92D3C8",
                          ["==", ["get", "CMP_ID"], 2],"#F37D80",
                          ["==", ["get", "CMP_ID"], 3],"#FBF7C0",
                          ["==", ["get", "CMP_ID"], 4],"#F9BDBF",
                          ["==", ["get", "CMP_ID"], 5],"#FFD380",
                          ["==", ["get", "CMP_ID"], 6],"#C7E6DC",
                          ["==", ["get", "CMP_ID"], 7],"#D7C19E",
                          ["==", ["get", "CMP_ID"], 8],"#82D4F2",
                          ["==", ["get", "CMP_ID"], 9],"#DABEDB",
                          ["==", ["get", "CMP_ID"], 10],"#B57DB6",
                          ["==", ["get", "CMP_ID"], 11],"#FAF078",
                          ["==", ["get", "CMP_ID"], 12],"#DB7DB3",
                          ["==", ["get", "CMP_ID"], 13],"#D7D79E",
                          ["==", ["get", "CMP_ID"], 14],"#80AEDD",
                          ["==", ["get", "CMP_ID"], 15],"#9DCB3B",
                          ["==", ["get", "CMP_ID"], 16],"#FFEBBE",
                          ["==", ["get", "CMP_ID"], 17],"#39BF7C",
                          "#cccccc"
                        ],
                         'fill-outline-color' :['case',['boolean', ['feature-state', 'hover'], false],"#000000","#7c7c7c" ],
                        'fill-opacity' :['case',['boolean', ['feature-state', 'hover'], false],1,0.8]
                      },
                     'filter': ['==', 'CMP_ID', CMP_ID]
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
              var CMP_ID = feature.properties['CMP_ID'];
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
                          ["==", ["get", "CMP_ID"], 1],"#82D4F2",
                          ["==", ["get", "CMP_ID"], 2],"#37C2F1",
                          ["==", ["get", "CMP_ID"], 3],"#B57DB6",
                          ["==", ["get", "CMP_ID"], 4],"#92D3C8",
                          ["==", ["get", "CMP_ID"], 5],"#D7C19E",
                          ["==", ["get", "CMP_ID"], 6],"#F9BDBF",
                          ["==", ["get", "CMP_ID"], 7],"#8BC867",
                          ["==", ["get", "CMP_ID"], 8],"#FEEAAE",
                          ["==", ["get", "CMP_ID"], 9],"#D7B09E",
                          ["==", ["get", "CMP_ID"], 10],"#FFD380",
                          ["==", ["get", "CMP_ID"], 11],"#92D3C8",
                          ["==", ["get", "CMP_ID"], 12],"#F4C0D9",
                          ["==", ["get", "CMP_ID"], 13],"#DABEDB",
                          ["==", ["get", "CMP_ID"], 14],"#F5CA7A",
                          ["==", ["get", "CMP_ID"], 15],"#D3FFBE",
                          ["==", ["get", "CMP_ID"], 16],"#00E6A9",
                          ["==", ["get", "CMP_ID"], 17],"#FFFF00",
                          "#cccccc"
                        ],
                        'fill-outline-color' :['case',['boolean', ['feature-state', 'hover'], false],"#000000","#7c7c7c" ],
                        'fill-opacity' :['case',['boolean', ['feature-state', 'hover'], false],1,0.8]
                      },
                     'filter': ['==', 'CMP_ID', CMP_ID]
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

          map.addLayer({
          id: "TTI",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=TTI+%3E+0&outFields=tti&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "tti"], .5],
                    "#f5b041",
                    ["==", ["get", "tti"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "tti"], .5],
                    6,
                    ["==", ["get", "tti"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "tti"], .5],
                    .4,
                    ["==", ["get", "tti"], 1],
                    .8,
                    0
                  ],
          },
              firstSymbolId
      });

      map.addLayer({
          id: "LRP_VC",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=LRP_VC+%3E+0&outFields=lrp_vc&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "lrp_vc"], .5],
                    "#f5b041",
                    ["==", ["get", "lrp_vc"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "lrp_vc"], .5],
                    6,
                    ["==", ["get", "lrp_vc"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "lrp_vc"], .5],
                    .4,
                    ["==", ["get", "lrp_vc"], 1],
                    .8,
                    0
                  ],
          }
      });

     map.addLayer({
          id: "TSCORE",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=TransScore>+0+or+RailPoint+>+0&outFields=TransScore,RailPoint&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    [
                    "any",
                    ["==", ["get", "transcore"], .5],
                    ["==", ["get", "railpoint"], .5]
                 //   "==", ["get", "RailPoint"], .5
                    ],
                    "#f5b041",
                    [
                     "any",
                    ["==", ["get", "transcore"], 1],
                    ["==", ["get", "railpoint"], 1]
                    ],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["any",["==", ["get", "transcore"], .5],["==", ["get", "railpoint"], .5]],
                    6,
                    ["any",["==", ["get", "transcore"], 1],["==", ["get", "railpoint"], 1]],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                  ["any",["==", ["get", "transcore"], .5],["==", ["get", "railpoint"], .5]],
                    .4,
                  ["any",["==", ["get", "transcore"], 1],["==", ["get", "railpoint"], 1]],
                    .8,
                    0
                  ],
          }
      });

   map.addLayer({
          id: "PTI",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=PTI+%3E+0&outFields=pti&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "pti"], .5],
                    "#f5b041",
                    ["==", ["get", "pti"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "pti"], .5],
                    6,
                    ["==", ["get", "pti"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "pti"], .5],
                    .4,
                    ["==", ["get", "pti"], 1],
                    .8,
                    0
                  ],
          }
      });


     map.addLayer({
          id: "CTN",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=NHSPoint%3E+0+or+TransitPoi+%3E+0+or+RailLinePo+%3E+0&outFields=NHSPoint,TransitPoi,RailLinePo&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    [
                    "any",
                    ["==", ["get", "nhspoint"], 0],
                    ["==", ["get", "freightpo"], .5],
                    ["==", ["get", "RailLinePo"], .5]
                    ],
                    "#cb4335",
                    [
                     "any",
                    ["==", ["get", "nhspoint"], .5],
                    ["==", ["get", "freightpo"], 1],
                    ["==", ["get", "RailLinePo"], 1]
                    ],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["any",["==", ["get", "nhspoint"], .0],["==", ["get", "freightpo"], .5],["==", ["get", "RailLinePo"], .5]],
                    2,
                    ["any",["==", ["get", "nhspoint"], .5],["==", ["get", "freightpo"], 1],["==", ["get", "RailLinePo"], 1]],
                    2,
                    0
                  ],
              "line-opacity":
                  [
                  "case",
                  ["any",["==", ["get", "nhspoint"], .0],["==", ["get", "freightpo"], .5]],
                    .4,
                  ["any",["==", ["get", "nhspoint"], .5],["==", ["get", "freightpo"], 1],["==", ["get", "RailLinePo"], 1]],
                    .4,
                    0
                  ],
          }
      });

      map.addLayer({
          id: "TRANSIT",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=TransitPoi+%3E+0&outFields=transitpoi&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "transitpoi"], .5],
                    "#f5b041",
                    ["==", ["get", "transitpoi"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "transitpoi"], .5],
                    6,
                    ["==", ["get", "transitpoi"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "transitpoi"], .5],
                    .4,
                    ["==", ["get", "transitpoi"], 1],
                    .8,
                    0
                  ],
          }
      });

      map.addLayer({
          id: "CRASH1",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=HighCrSev+%3E+0&outFields=HighCrSev&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "highcrsev"], 0],
                    "#f5b041",
                    ["==", ["get", "highcrsev"], .5],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "highcrsev"], 0],
                    6,
                    ["==", ["get", "highcrsev"], .5],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "highcrsev"], 0],
                    .4,
                    ["==", ["get", "highcrsev"], .5],
                    .8,
                    0
                  ],
          }
      });

      map.addLayer({
          id: "CRASH2",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=HighCrFreq+%3E+0&outFields=HighCrFreq&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "highcrfreq"], 0],
                    "#f5b041",
                    ["==", ["get", "highcrfreq"], .5],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "highcrfreq"], 0],
                    6,
                    ["==", ["get", "highcrfreq"], .5],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "highcrfreq"], 0],
                    .4,
                    ["==", ["get", "highcrfreq"], .5],
                    .8,
                    0
                  ],
          }
      });

     map.addLayer({
          id: "TTTI",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=TTTI+%3E+0&outFields=TTTI&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "ttti"], .5],
                    "#f5b041",
                    ["==", ["get", "ttti"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "ttti"], .5],
                    6,
                    ["==", ["get", "ttti"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "ttti"], .5],
                    .4,
                    ["==", ["get", "ttti"], 1],
                    .8,
                    0
                  ],
          }
      });

       map.addLayer({
          id: "HvyTran",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=HvyTran+%3E+0+OR+Limerick+%3E+0+OR+MajBridge+%3E+0+OR+Bridges+%3E+0+OR+Military+%3E+0&outFields=HvyTran,Limerick,MajBridge,Bridges,Military&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    [
                    "any",
                    ["==", ["get", "hvytran"], 0],
                    ["==", ["get", "limerick"], 0],
                    ["==", ["get", "bridges"], 0],
                    ["==", ["get", "military"], 0],
                    ["==", ["get", "majbridge"], 0]
                    ],
                    "#f5b041",
                    [
                     "any",
                    ["==", ["get", "hvytran"], .50],
                    ["==", ["get", "limerick"], .50],
                    ["==", ["get", "bridges"], .50],
                    ["==", ["get", "military"], .50],
                    ["==", ["get", "majbridge"], .50]
                    ],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    [
                     "any",
                    ["==", ["get", "hvytran"], 0],
                    ["==", ["get", "limerick"], 0],
                    ["==", ["get", "bridges"], 0],
                    ["==", ["get", "military"], 0],
                    ["==", ["get", "majbridge"], 0]
                    ],
                    6,
                    [
                     "any",
                    ["==", ["get", "hvytran"], .50],
                    ["==", ["get", "limerick"], .50],
                    ["==", ["get", "bridges"], .50],
                    ["==", ["get", "military"], .50],
                    ["==", ["get", "majbridge"], .50]
                    ],
                    2,
                    0
                  ],
              "line-opacity":
                  [
                  "case",
                [
                     "any",
                    ["==", ["get", "hvytran"], 0],
                    ["==", ["get", "limerick"], 0],
                    ["==", ["get", "bridges"], 0],
                    ["==", ["get", "military"], 0],
                    ["==", ["get", "majbridge"], 0]
                    ],
                    .4,
                  [
                     "any",
                    ["==", ["get", "hvytran"], .50],
                    ["==", ["get", "limerick"], .50],
                    ["==", ["get", "bridges"], .50],
                    ["==", ["get", "military"], .50],
                    ["==", ["get", "majbridge"], .50]
                    ],
                    .8,
                    0
                  ],
          }
      });

      map.addLayer({
          id: "HHDen",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=HHDen+%3E+0+OR+EmpDen+%3E+0+OR+StadGathr+%3E+0&outFields=HHDen,EmpDen,StadGathr&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    [
                    "any",
                    ["==", ["get", "hhden"], 1],
                    ["==", ["get", "empden"], 1],
                    ["==", ["get", "stadgathr"], 1]
                    ],
                    "#f5b041",
                    [
                     "any",
                    ["==", ["get", "hhden"], .5],
                    ["==", ["get", "empden"], .5],
                    ["==", ["get", "stadgathr"], .5]
                    ],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    [
                     "any",
                    ["==", ["get", "hhden"], 1],
                    ["==", ["get", "empden"], 1],
                    ["==", ["get", "stadgathr"], 1]
                    ],
                    2,
                    [
                     "any",
                    ["==", ["get", "hhden"], .5],
                    ["==", ["get", "empden"], .5],
                    ["==", ["get", "stadgathr"], .5]
                    ],
                    2,
                    0
                  ],
              "line-opacity":
                  [
                  "case",
                [
                     "any",
                    ["==", ["get", "hhden"], 1],
                    ["==", ["get", "empden"], 1],
                    ["==", ["get", "stadgathr"], 1]
                    ],
                    .8,
                  [
                     "any",
                    ["==", ["get", "hhden"], .5],
                    ["==", ["get", "empden"], .5],
                    ["==", ["get", "stadgathr"], .5]
                    ],
                    .8,
                    0
                  ],
          }
      });

 map.addLayer({
          id: "Env",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=ENV+%3E+0&outFields=ENV&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "env"], 0],
                    "#f5b041",
                    ["==", ["get", "env"], .5],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "env"], 0],
                    6,
                    ["==", ["get", "env"], .5],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "env"], 0],
                    .4,
                    ["==", ["get", "env"], .5],
                    .8,
                    0
                  ],
          }
      });

    map.addLayer({
          id: "InfEmerg",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=InfEmerg+%3E+0&outFields=InfEmerg&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "infemerg"], 0],
                    "#f5b041",
                    ["==", ["get", "infemerg"], .5],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "infemerg"], 0],
                    6,
                    ["==", ["get", "infemerg"], .5],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "infemerg"], 0],
                    .4,
                    ["==", ["get", "infemerg"], .5],
                    .8,
                    0
                  ],
          }
      });

    map.addLayer({
          id: "PlanCntr",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=PlanCntr+%3E+0&outFields=PlanCntr&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "plancntr"], 0],
                    "#f5b041",
                    ["==", ["get", "plancntr"], .5],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "plancntr"], 0],
                    6,
                    ["==", ["get", "plancntr"], .5],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "plancntr"], 0],
                    .4,
                    ["==", ["get", "plancntr"], .5],
                    .8,
                    0
                  ],
          }
      });

 map.addLayer({
          id: "LOTTR",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=LOTTR+%3E+0&outFields=LOTTR&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "lottr"], .5],
                    "#f5b041",
                    ["==", ["get", "lottr"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "lottr"], .5],
                    6,
                    ["==", ["get", "lottr"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "lottr"], .5],
                    .4,
                    ["==", ["get", "lottr"], 1],
                    .8,
                    0
                  ],
          }
      });

map.addLayer({
          id: "PHED",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=PHED+%3E+0&outFields=PHED&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "phed"], .5],
                    "#f5b041",
                    ["==", ["get", "phed"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "phed"], .5],
                    6,
                    ["==", ["get", "phed"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "phed"], .5],
                    .4,
                    ["==", ["get", "phed"], 1],
                    .8,
                    0
                  ],
          }
      });

map.addLayer({
          id: "TTTR",
          type: "line",
          source: {
              "type": "geojson",
              "data":"https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_ObjectiveMeasureScoring/FeatureServer/0/query?where=TTTR+%3E+0&outFields=TTTR&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
          },
          layout: {
              "visibility":"none",
              "line-join": "round",
              "line-cap": "round"
          },
          paint: {
             "line-color":
                  [
                  "case",
                    ["==", ["get", "tttr"], .5],
                    "#f5b041",
                    ["==", ["get", "tttr"], 1],
                    "#cb4335",
                    "#cccccc"
                  ],
              "line-width":
                  [
                  "case",
                    ["==", ["get", "tttr"], .5],
                    6,
                    ["==", ["get", "tttr"], 1],
                    2,
                    0
                  ],
                     "line-opacity":
                  [
                  "case",
                    ["==", ["get", "tttr"], .5],
                    .4,
                    ["==", ["get", "tttr"], 1],
                    .8,
                    0
                  ],
          }
      });

/// Highlight Segment

/* map.on('click', function (e) {
    var bbox = [[e.point.x - 5, e.point.y - 5],[e.point.x + 5, e.point.y + 5]];
    var features = map.queryRenderedFeatures(bbox, {layers: ['TTI','LRP_VC','TSCORE','PTI','CTN','TRANSIT', 'CRASH1', 'CRASH2','TTTI', 'HvyTran', 'HHDen', 'Env', 'InfEmerg', 'PlanCntr', 'LOTTR', 'PHED', 'TTTR']});

    if (!features.length) {
        return;
    }
    if (typeof map.getLayer('selectedRoad') !== "undefined" ){         
        map.removeLayer('selectedRoad')
        map.removeSource('selectedRoad');   
    }

    for(var i = 0; i<features.length; i++) {
    //I think you could add the vector tile feature to the map, but I'm more familiar with JSON
    console.log(features);
    var feature = features[0];

    map.addSource('selectedRoad', {
        "type":"geojson",
        "data": feature.toJSON()
    });
    map.addLayer({
        "id": "selectedRoad",
        "type": "line",
        "source": "selectedRoad",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "yellow",
            "line-width": 8
        }
    });
  }
});
*/
// Performance Measure Query
      map.on('click', function (e) {
      
          var bbox = [[e.point.x - 5, e.point.y - 5],[e.point.x + 5, e.point.y + 5]];
          var features = map.queryRenderedFeatures(bbox, {layers: ['TTI','LRP_VC','TSCORE','PTI','CTN','TRANSIT', 'CRASH1', 'CRASH2','TTTI', 'HvyTran', 'HHDen', 'Env', 'InfEmerg', 'PlanCntr', 'LOTTR', 'PHED', 'TTTR']});

            if (!features.length) {
                   var content = '';
           //    console.log(e.lngLat);
           //    let numbers = e.lngLat;
           //    numbers = JSON.parse(numbers);
           //    alert(numbers);
           //    alert (e.lngLat);
              return;
            }

            $('#myTab a[href="#Results"]').tab('show');
            var content = '';

            for(var i = 0; i<features.length; i++) {
         //   console.log(features);

         //   for (let index = 0; index < a.length; ++index) {
               //let value = a[index];
         //      var feature = features[i];
           //    console.log(feature);
           //   var feature = features[0];

              var roadname = features[i].properties.RoadName
              var dir = features[i].properties.Bearing
              var tti = features[i].properties.TTI
              var tti_info = numeral(features[i].properties.TTIHGHPKHR).format('(0,0.0)')
              var vc = features[i].properties.LRP_VC
              var transcore = features[i].properties.TransScore
              var rail = features[i].properties.RailPoint
              var pti = features[i].properties.PTI
              var pti_info = numeral(features[i].properties.PTIHGHPKHR).format('(0,0.0)')
              var nhs = features[i].properties.NHSPoint
              var transit = features[i].properties.TransitPoi 
              var crash1 = features[i].properties.HighCrSev
              var crash2 = features[i].properties.HighCrFreq
              var ttti = features[i].properties.TTTI
              var security = features[i].properties.HvyTran
              var evac = features[i].properties.HHDen
              var green = features[i].properties.Env
              var infill = features[i].properties.InfEmerg
              var landuse = features[i].properties.PlanCntr
              var lottr = features[i].properties.LOTTR
              var phed = features[i].properties.PHED
              var tttr = features[i].properties.TTTR

              if (features[i].properties.Bearing === 'N' ){ var dirT = " (North Bound)"; }
              else if (features[i].properties.Bearing === 'S' ){ var dirT = " (South Bound) ";}
              else if (features[i].properties.Bearing === 'E' ){ var dirT = " (East Bound) ";}
              else if (features[i].properties.Bearing === 'W' ){ var dirT = " (West Bound) " ;}
              else var dirT = "";

              var newSet = '<div id="pm_info"><h3 style="background-color:#E0E0E0"><i class="glyphicon glyphicon-stats"></i>&nbsp; CMP Objective Measures</h3>The scores below are for the selected roadway segments<br>' +
                          '<B>Road Name:</B> ' + roadname  
                           + dirT + 
                      //     dirT
                    //      '<br><a href="https://maps.google.com/maps?q=&layer=c&cbll=' + lat + ', ' + lng +'&cbp=" target="_new">Launch Google Streetview near this location</a><br>'+
                          '<table id="crashtable">' +
                          '<tbody>' +
                          '<tr class="odd">' +
                         '<th>Travel Time Index (TTI)</th><td>' + tti + ' ('+ tti_info +')</td>' +
                          '<tr class="even">' +
                          '<th>Anticipated Growth in V/C</th><td>' + vc + '</td>' +
                          '<tr class="odd">' +
                         '<th>Transit Score and Rail Stations</th><td>' + transcore + ' & '+ rail+ '</td>' +
                          '<tr class="even">' +
                          '<th>Planning Time Index (PTI)</th><td>' + pti+ ' ('+ pti_info +')</td>' +
                          '<tr class="odd">' +
                          '<th>Core Transportation Network</th><td>' + nhs + '</td>' +
                          '<tr class="even">' +
                          '<th>Existing Transit</th><td>' + transit + '</td>' +
                          '<tr class="odd">' +
                          '<th>High Crash Severity</th><td>' + crash1 + '</td>' +
                          '<tr class="even">' +
                          '<th>High Crash Frequency</th><td>' + crash2 + '</td>' +
                           '<tr class="odd">' +
                          '<th>Truck Travel Time Index (TTTI) </th><td>' + ttti + '</td>' +
                          '<tr class="even">' +
                          '<th>Transportation Security</th><td>' + security + '</td>' +
                          '<tr class="odd">' +
                          '<th>Areas of Special Evacuation Concern</th><td>' + evac + '</td>' +
                          '<tr class="even">' +
                          '<th>Low Green Infrastructure Screening Score</th><td>' + green + '</td>' +
                          '<tr class="odd">' +
                          '<th>Connections 2045 Infill, Redevelopment and Emerging Growth</th><td>' + infill + '</td>' +
                          '<tr class="even">' +
                          '<th>Connections 2045 Land Use Centers</th><td>' + landuse + '</td>' +
                          '<tr class="odd">' +
                          '<th>Level of Travel Time Reliability (LOTTR)</th><td>' + lottr + '</td>' +
                          '<tr class="even">' +
                          '<th>Peak Hour Excessive Delay (PHED)</th><td>' + phed + '</td>' +
                          '<tr class="odd">' +
                          '<th>Truck Travel Time Reliability (TTTR)</th><td>' + tttr + '</td>' + 
                          '</tbody>' +
                          '<table>';
              content += newSet
            }

            info.innerHTML = content;
           
      });

    });


        slider.addEventListener('input', function(e) {
          //slide(e);
          let a = ['PA1','PA2','PA3','PA4','PA5','PA6','PA7','PA8','PA9','PA10','PA11','PA12','PA13','PA14','PA15','PA16','PA17','NJ1','NJ2','NJ3','NJ4','NJ5','NJ6','NJ7','NJ8','NJ9','NJ10','NJ11','NJ12','NJ13','NJ14','NJ15','NJ16','NJ17'];
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

        // CMP Corricor Query
        map.on('click', function (e) {
        //  (resetInfo)? $('#cmp_info').hide() : resetInfo = true;
            var bbox = [[e.point.x - 5, e.point.y - 5],[e.point.x + 5, e.point.y + 5]];
            var features = map.queryRenderedFeatures(bbox, {layers: ['PA1','PA2','PA3','PA4','PA5','PA6','PA7','PA8','PA9','PA10','PA11','PA12','PA13','PA14','PA15','PA16','PA17','NJ1','NJ2','NJ3','NJ4','NJ5','NJ6','NJ7','NJ8','NJ9','NJ10','NJ11','NJ12','NJ13','NJ14','NJ15','NJ16','NJ17']});

              if (!features.length) {
                  //  var contentCMP = '';
            var contentCMP = '';
                infosidebar.innerHTML = contentCMP;
                return;
              }
              $('#myTab a[href="#Results"]').tab('show');
              var contentCMP = '';

              for(var i = 0; i<features.length; i++) {
                var cmp = features[i].properties.CMP_ID
                var subid = features[i].properties.SUB_ID 
                var banner = features[i].properties.WEB_COLOR
                var name = features[i].properties.NAME
                var subname = features[i].properties.SUBNAME
                var priority = features[i].properties.PRIORITY
                var shield = features[i].properties.SHIELD
                var state = features[i].properties.STATE


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
            .setHTML(e.features.map(function(feature) { return feature.properties.NAME + ' ('+ feature.properties.GIS_ID +')'; }).join(', '))
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
            .setHTML(e.features.map(function(feature) { return feature.properties.NAME + '('+ feature.properties.GIS_ID +')'; }).join(', '))
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