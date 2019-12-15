(window["webpackJsonpreact-js"]=window["webpackJsonpreact-js"]||[]).push([[0],{114:function(e,t){},138:function(e,t,o){e.exports=o(147)},143:function(e,t,o){},144:function(e,t,o){},145:function(e,t){},147:function(e,t,o){"use strict";o.r(t);var i=o(19),n=o.n(i),r=o(119),a=o.n(r),s=(o(143),o(2)),l=o(1),c=o(4),u=o(3),h=o(15),d=o(5),p=(o(144),o(80)),m=o.n(p),g=o(120),f=o.n(g),y=o(127),v={id:"mapboxgl-minimap",width:"250px",height:"180px",style:"mapbox://styles/mapbox/streets-v10",center:[0,0],zoom:6,zoomAdjust:null,zoomLevels:[[18,14,16],[16,12,14],[14,10,12],[12,8,10],[10,6,8]],lineColor:"rgb(255, 50, 0)",lineWidth:2,lineOpacity:1,fillColor:"#F80",fillOpacity:0,dragPan:!1,scrollZoom:!1,boxZoom:!1,dragRotate:!1,keyboard:!1,doubleClickZoom:!1,touchZoomRotate:!1},b=function(){function e(t){Object(s.a)(this,e),this.options=v,Object.assign(this.options,t),this._ticking=!1,this._lastMouseMoveEvent=null,this._parentMap=null,this._isDragging=!1,this._isCursorOverFeature=!1,this._previousPoint=[0,0],this._currentPoint=[0,0],this._trackingRectCoordinates=[[[],[],[],[],[]]]}return Object(l.a)(e,[{key:"onAdd",value:function(e){this._parentMap=e;var t=this.options,o=this._container=this._createContainer(e),i=this._miniMap=new m.a.Map({attributionControl:!1,container:o,style:t.style,zoom:t.zoom,center:t.center});return t.maxBounds&&i.setMaxBounds(t.maxBounds),i.on("load",this._load.bind(this)),this._container}},{key:"_load",value:function(){var e=this.options,t=this._parentMap,o=this._miniMap;["dragPan","scrollZoom","boxZoom","dragRotate","keyboard","doubleClickZoom","touchZoomRotate"].forEach(function(t){!0!==e[t]&&o[t].disable()}),"function"===typeof e.zoomAdjust?this.options.zoomAdjust=e.zoomAdjust.bind(this):null===e.zoomAdjust&&(this.options.zoomAdjust=this._zoomAdjust.bind(this));var i=o.getBounds();this._convertBoundsToPoints(i),o.addSource("trackingRect",{type:"geojson",data:{type:"Feature",properties:{name:"trackingRect"},geometry:{type:"Polygon",coordinates:this._trackingRectCoordinates}}}),o.addLayer({id:"trackingRectOutline",type:"line",source:"trackingRect",layout:{},paint:{"line-color":e.lineColor,"line-width":e.lineWidth,"line-opacity":e.lineOpacity}}),o.addLayer({id:"trackingRectFill",type:"fill",source:"trackingRect",layout:{},paint:{"fill-color":e.fillColor,"fill-opacity":e.fillOpacity}}),this._trackingRect=this._miniMap.getSource("trackingRect"),this._update(),t.on("move",this._update.bind(this)),o.on("mousemove",this._mouseMove.bind(this)),o.on("mousedown",this._mouseDown.bind(this)),o.on("mouseup",this._mouseUp.bind(this)),o.on("touchmove",this._mouseMove.bind(this)),o.on("touchstart",this._mouseDown.bind(this)),o.on("touchend",this._mouseUp.bind(this)),this._miniMapCanvas=o.getCanvasContainer(),this._miniMapCanvas.addEventListener("wheel",this._preventDefault),this._miniMapCanvas.addEventListener("mousewheel",this._preventDefault)}},{key:"_mouseDown",value:function(e){this._isCursorOverFeature&&(this._isDragging=!0,this._previousPoint=this._currentPoint,this._currentPoint=[e.lngLat.lng,e.lngLat.lat])}},{key:"_mouseMove",value:function(e){this._ticking=!1;var t=this._miniMap.queryRenderedFeatures(e.point,{layers:["trackingRectFill"]});if(this._isCursorOverFeature&&t.length>0||(this._isCursorOverFeature=t.length>0,this._miniMapCanvas.style.cursor=this._isCursorOverFeature?"move":""),this._isDragging){this._previousPoint=this._currentPoint,this._currentPoint=[e.lngLat.lng,e.lngLat.lat];var o=[this._previousPoint[0]-this._currentPoint[0],this._previousPoint[1]-this._currentPoint[1]],i=this._moveTrackingRect(o);this._parentMap.fitBounds(i,{duration:80,noMoveStart:!0})}}},{key:"_mouseUp",value:function(){this._isDragging=!1,this._ticking=!1}},{key:"_moveTrackingRect",value:function(e){var t=this._trackingRect,o=t._data,i=o.properties.bounds;return i._ne.lat-=e[1],i._ne.lng-=e[0],i._sw.lat-=e[1],i._sw.lng-=e[0],this._convertBoundsToPoints(i),t.setData(o),i}},{key:"_setTrackingRectBounds",value:function(e){var t=this._trackingRect,o=t._data;o.properties.bounds=e,this._convertBoundsToPoints(e),t.setData(o)}},{key:"_convertBoundsToPoints",value:function(e){var t=e._ne,o=e._sw,i=this._trackingRectCoordinates;i[0][0][0]=t.lng,i[0][0][1]=t.lat,i[0][1][0]=o.lng,i[0][1][1]=t.lat,i[0][2][0]=o.lng,i[0][2][1]=o.lat,i[0][3][0]=t.lng,i[0][3][1]=o.lat,i[0][4][0]=t.lng,i[0][4][1]=t.lat}},{key:"_update",value:function(){if(!this._isDragging){var e=this._parentMap.getBounds();this._setTrackingRectBounds(e),"function"===typeof this.options.zoomAdjust&&this.options.zoomAdjust()}}},{key:"_zoomAdjust",value:function(){var e=this._miniMap,t=this._parentMap,o=parseInt(e.getZoom(),10),i=parseInt(t.getZoom(),10),n=this.options.zoomLevels,r=!1;n.forEach(function(n){!r&&i>=n[0]&&(o>=n[1]&&e.setZoom(n[2]),e.setCenter(t.getCenter()),r=!0)}),r||o===this.options.zoom||("object"===typeof this.options.bounds&&e.fitBounds(this.options.bounds,{duration:50}),e.setZoom(this.options.zoom))}},{key:"_createContainer",value:function(e){var t=this.options,o=document.createElement("div");return o.className="mapboxgl-ctrl-minimap mapboxgl-ctrl",o.setAttribute("style","width: "+t.width+"; height: "+t.height+";"),o.addEventListener("contextmenu",this._preventDefault),e.getContainer().appendChild(o),""!==t.id&&(o.id=t.id),o}},{key:"_preventDefault",value:function(e){e.preventDefault()}}]),e}(),_={left:"lefty",center:"centered",right:"righty"};function k(e){var t=e.id,o=e.theme,i=e.title,r=e.image,a=e.flourishID,s=e.embed,l=e.description,c=e.header,u=e.body,h=e.link,d=t===e.currentChapterID?"step active":"step";return n.a.createElement("div",{id:t,className:d},n.a.createElement("div",{className:o},i&&n.a.createElement("h2",{className:"title"},i),r&&n.a.createElement("img",{src:r}),l&&n.a.createElement("p",null,l),c&&n.a.createElement("h3",null,c),u&&n.a.createElement("p",null,u),a&&n.a.createElement("div",{className:"flourish-embed","data-src":"visualisation/".concat(a)}),s&&n.a.createElement("iframe",{src:s,title:t,className:"embed",width:"100%",height:"400",frameBorder:"0"}),h&&n.a.createElement("a",{href:h.url,target:"_blank",rel:"noopener noreferrer"},h.title)))}var w=function(e){function t(e){var o;return Object(s.a)(this,t),(o=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={currentChapter:e.chapters[0],device:Object(y.a)().phone?"mobile":"desktop"},o.setState=o.setState.bind(Object(h.a)(o)),o}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=this.state.device,o=e.chapters[0].location[t];m.a.accessToken=e.accessToken;var i=new m.a.Map({container:this.mapContainer,style:e.style,center:o.center,zoom:o.zoom,pitch:o.pitch,bearing:o.bearing,attributionControl:!1}),n=new m.a.Marker;e.showMarkers&&n.setLngLat(o[t].center).addTo(i);var r=this.setState.bind(this);i.on("load",function(){e.showMiniMap&&i.addControl(new b(e.miniMap),"bottom-right"),f()().setup({step:".step",offset:.5,progress:!0}).onStepEnter(function(o){var a=e.chapters.find(function(e){return e.id===o.element.id});r({currentChapter:a}),i.flyTo(a.location[t]),e.showMarkers&&n.setLngLat(a.location[t].center);var s=a.onChapterEnter.addLayers;s&&s.length>0&&s.forEach(function(e){!function(e){console.log(i.getSource(e.layer.id));for(var t,o=i.getStyle().layers,n=0;n<o.length;n++)if("symbol"===o[n].type){t=o[n].id;break}e.source&&!i.getSource(e.layer.id)&&i.addSource(e.layer.id,e.source),i.addLayer(e.layer,t)}(e)})}).onStepExit(function(t){var o=e.chapters.find(function(e){return e.id===t.element.id}).onChapterExit.removeLayers;o&&o.length>0&&o.forEach(function(e){i.removeLayer(e)})})})}},{key:"render",value:function(){var e=this,t=this.props,o=t.theme,i=this.state.currentChapter.id;return n.a.createElement("div",null,n.a.createElement("div",{ref:function(t){return e.mapContainer=t},className:"absolute top right left bottom"}),n.a.createElement("div",{id:"tooltip",style:{position:"fixed","z-index":1,"pointer-events":"none"}}),n.a.createElement("div",{id:"story"},t.title&&n.a.createElement("div",{id:"header",className:o},n.a.createElement("h1",null,t.title),t.subtitle&&n.a.createElement("h2",null,t.subtitle),t.byline&&n.a.createElement("p",null,t.byline)),n.a.createElement("div",{id:"features",className:_[t.alignment]},t.chapters.map(function(e){return n.a.createElement(k,Object.assign({key:e.id,theme:o},e,{currentChapterID:i}))})),t.footer&&n.a.createElement("div",{id:"footer",className:o},n.a.createElement("p",null,t.footer))))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=o(158),E={style:"mapbox://styles/baffioso/ck2s2efkx13u11cs349t1kitn",accessToken:"pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiT1JTS1lIMCJ9.f5ubY91Bi42yPnTrgiq-Gw",showMiniMap:!0,miniMap:{center:[-6.6037,20.48104],zoom:0,style:"mapbox://styles/baffioso/ck2s2efkx13u11cs349t1kitn",lineColor:"rgb(255, 50, 90)"},showMarkers:!1,theme:"light",alignment:"left",title:"REFUGEES",subtitle:"",byline:"",footer:"Hope you enjoyed the flight",chapters:[{id:"syria",title:"Refugees of the Syrian Civil War",description:"The unrest in Syria, part of a wider wave of the 2011 Arab Spring protests, grew out of discontent with the Syrian government and escalated to an armed conflict after protests calling for Assad's removal were violently suppressed. The conflict has caused a major refugee crisis causing a massive flee to countries around the world. The chart below shows where Syrian refugees where given asylum. (Press play button to se the development over time)",location:{desktop:{center:[34.49802,34.55465],zoom:5.22,pitch:0,bearing:0},mobile:{center:[34.49802,34.55465],zoom:5.22,pitch:0,bearing:0}},onChapterEnter:{addLayers:[{layer:{id:"syria",type:"line",source:{type:"vector",url:"mapbox://baffioso.countries"},"source-layer":"countries",filter:["match",["get","ADMIN"],["Syria"],!0,!1],layout:{},paint:{"line-color":"rgb(255, 0, 0)","line-width":2}}}]},onChapterExit:{removeLayers:[]}},{id:"refugee-arc",title:"Refugees of the Syrian Civil War",description:"The unrest in Syria, part of a wider wave of the 2011 Arab Spring protests, grew out of discontent with the Syrian government and escalated to an armed conflict after protests calling for Assad's removal were violently suppressed. The conflict has caused a major refugee crisis causing a massive flee to countries around the world. The chart below shows where Syrian refugees where given asylum. (Press play button to se the development over time)",flourishID:1104402,location:{desktop:{center:[4.39089,34.63819],zoom:2.84,pitch:47.5,bearing:-16},mobile:{center:[-6.6037,20.48104],zoom:0,pitch:0,bearing:0}},onChapterEnter:{addLayers:[{layer:{id:"syria",type:"line",source:{type:"vector",url:"mapbox://baffioso.refugee"},"source-layer":"syria",filter:["all",["match",["get","ADMIN"],["Syria"],!0,!1]],layout:{},paint:{"line-color":"rgb(255, 0, 0)","line-width":2}}},{layer:new(o(157).a)({id:"refugee-arc",type:C.a,data:"http://baffioso.github.io/data/syria.json",pickable:!0,getHeight:.4,getWidth:function(e){return Math.sqrt(Math.sqrt(e.value))},getSourcePosition:function(e){return[e.origin_long,e.origin_lat]},getTargetPosition:function(e){return[e.target_long,e.target_lat]},getSourceColor:function(e){return[25,156,255]},getTargetColor:function(e){return[168,229,255]},onHover:function(e){var t=e.object,o=e.x,i=e.y;M(t,o,i)}})}]},onChapterExit:{removeLayers:["refugee-arc"]}},{id:"europe",title:"Asylum in Europe",description:"By May 2011, thousands of people had already fled the country and the first refugee camps opened in Turkey. In March 2012, the UNHCR decided to appoint a Regional Refugee Coordinator for Syrian Refugees\u2014recognising the growing concerns surrounding the crisis. Just a year later, in March 2013, the number of Syrian refugees reached 1,000,000. By December 2017, UNHCR counted 1,000,000 asylum applications for Syrian refugees in the European Union. As of March 2018, UNHCR has counted nearly 5.6 million registered Syrian refugees worldwide. The greatest number of refugees fleeing to Europe originate from Syria.",location:{desktop:{center:[15.19653,36.61875],zoom:4.05,pitch:45,bearing:-40,speed:.5},mobile:{center:[15.19653,36.61875],zoom:4.05,pitch:45,bearing:-40,speed:.5}},onChapterEnter:{addLayers:[{layer:{id:"europe",type:"fill-extrusion",source:{type:"vector",url:"mapbox://baffioso.countries"},"source-layer":"countries",filter:["match",["get","CONTINENT"],["Europe"],!0,!1],layout:{},paint:{"fill-extrusion-height":["/",["get","POP_EST"],500],"fill-extrusion-color":"hsl(144, 86%, 63%)","fill-extrusion-opacity":.78}}}]},onChapterExit:{removeLayers:["europe"]}}]},M=function(e,t,o){var i=document.getElementById("tooltip");return e?(i.innerHTML="Origin: ".concat(e.origin," </br> Target: ").concat(e.target," </br> Persons: ").concat(e.value),i.style.display="block",i.style.left=t+"px",i.style.top=o+"px",i.style.padding="10px"):i.style.display="none",i},x=E;a.a.render(n.a.createElement(w,x),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[138,1,2]]]);
//# sourceMappingURL=main.de9f0fa5.chunk.js.map