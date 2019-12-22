(window["webpackJsonpreact-js"]=window["webpackJsonpreact-js"]||[]).push([[0],{132:function(e,t){},163:function(e,t,i){e.exports=i(177)},168:function(e,t,i){},169:function(e,t,i){},175:function(e,t){},177:function(e,t,i){"use strict";i.r(t);var n=i(1),o=i.n(n),r=i(43),a=i.n(r),s=(i(168),i(3)),l=i(2),c=i(5),u=i(4),h=i(6),d=(i(169),i(93)),p=i.n(d),m=i(139),g=i.n(m),y=i(150),f={id:"mapboxgl-minimap",width:"250px",height:"180px",style:"mapbox://styles/mapbox/streets-v10",center:[0,0],zoom:6,zoomAdjust:null,zoomLevels:[[18,14,16],[16,12,14],[14,10,12],[12,8,10],[10,6,8]],lineColor:"rgb(255, 50, 0)",lineWidth:2,lineOpacity:1,fillColor:"#F80",fillOpacity:0,dragPan:!1,scrollZoom:!1,boxZoom:!1,dragRotate:!1,keyboard:!1,doubleClickZoom:!1,touchZoomRotate:!1},v=function(){function e(t){Object(s.a)(this,e),this.options=f,Object.assign(this.options,t),this._ticking=!1,this._lastMouseMoveEvent=null,this._parentMap=null,this._isDragging=!1,this._isCursorOverFeature=!1,this._previousPoint=[0,0],this._currentPoint=[0,0],this._trackingRectCoordinates=[[[],[],[],[],[]]]}return Object(l.a)(e,[{key:"onAdd",value:function(e){this._parentMap=e;var t=this.options,i=this._container=this._createContainer(e),n=this._miniMap=new p.a.Map({attributionControl:!1,container:i,style:t.style,zoom:t.zoom,center:t.center});return t.maxBounds&&n.setMaxBounds(t.maxBounds),n.on("load",this._load.bind(this)),this._container}},{key:"_load",value:function(){var e=this.options,t=this._parentMap,i=this._miniMap;["dragPan","scrollZoom","boxZoom","dragRotate","keyboard","doubleClickZoom","touchZoomRotate"].forEach(function(t){!0!==e[t]&&i[t].disable()}),"function"===typeof e.zoomAdjust?this.options.zoomAdjust=e.zoomAdjust.bind(this):null===e.zoomAdjust&&(this.options.zoomAdjust=this._zoomAdjust.bind(this));var n=i.getBounds();this._convertBoundsToPoints(n),i.addSource("trackingRect",{type:"geojson",data:{type:"Feature",properties:{name:"trackingRect"},geometry:{type:"Polygon",coordinates:this._trackingRectCoordinates}}}),i.addLayer({id:"trackingRectOutline",type:"line",source:"trackingRect",layout:{},paint:{"line-color":e.lineColor,"line-width":e.lineWidth,"line-opacity":e.lineOpacity}}),i.addLayer({id:"trackingRectFill",type:"fill",source:"trackingRect",layout:{},paint:{"fill-color":e.fillColor,"fill-opacity":e.fillOpacity}}),this._trackingRect=this._miniMap.getSource("trackingRect"),this._update(),t.on("move",this._update.bind(this)),i.on("mousemove",this._mouseMove.bind(this)),i.on("mousedown",this._mouseDown.bind(this)),i.on("mouseup",this._mouseUp.bind(this)),i.on("touchmove",this._mouseMove.bind(this)),i.on("touchstart",this._mouseDown.bind(this)),i.on("touchend",this._mouseUp.bind(this)),this._miniMapCanvas=i.getCanvasContainer(),this._miniMapCanvas.addEventListener("wheel",this._preventDefault),this._miniMapCanvas.addEventListener("mousewheel",this._preventDefault)}},{key:"_mouseDown",value:function(e){this._isCursorOverFeature&&(this._isDragging=!0,this._previousPoint=this._currentPoint,this._currentPoint=[e.lngLat.lng,e.lngLat.lat])}},{key:"_mouseMove",value:function(e){this._ticking=!1;var t=this._miniMap.queryRenderedFeatures(e.point,{layers:["trackingRectFill"]});if(this._isCursorOverFeature&&t.length>0||(this._isCursorOverFeature=t.length>0,this._miniMapCanvas.style.cursor=this._isCursorOverFeature?"move":""),this._isDragging){this._previousPoint=this._currentPoint,this._currentPoint=[e.lngLat.lng,e.lngLat.lat];var i=[this._previousPoint[0]-this._currentPoint[0],this._previousPoint[1]-this._currentPoint[1]],n=this._moveTrackingRect(i);this._parentMap.fitBounds(n,{duration:80,noMoveStart:!0})}}},{key:"_mouseUp",value:function(){this._isDragging=!1,this._ticking=!1}},{key:"_moveTrackingRect",value:function(e){var t=this._trackingRect,i=t._data,n=i.properties.bounds;return n._ne.lat-=e[1],n._ne.lng-=e[0],n._sw.lat-=e[1],n._sw.lng-=e[0],this._convertBoundsToPoints(n),t.setData(i),n}},{key:"_setTrackingRectBounds",value:function(e){var t=this._trackingRect,i=t._data;i.properties.bounds=e,this._convertBoundsToPoints(e),t.setData(i)}},{key:"_convertBoundsToPoints",value:function(e){var t=e._ne,i=e._sw,n=this._trackingRectCoordinates;n[0][0][0]=t.lng,n[0][0][1]=t.lat,n[0][1][0]=i.lng,n[0][1][1]=t.lat,n[0][2][0]=i.lng,n[0][2][1]=i.lat,n[0][3][0]=t.lng,n[0][3][1]=i.lat,n[0][4][0]=t.lng,n[0][4][1]=t.lat}},{key:"_update",value:function(){if(!this._isDragging){var e=this._parentMap.getBounds();this._setTrackingRectBounds(e),"function"===typeof this.options.zoomAdjust&&this.options.zoomAdjust()}}},{key:"_zoomAdjust",value:function(){var e=this._miniMap,t=this._parentMap,i=parseInt(e.getZoom(),10),n=parseInt(t.getZoom(),10),o=this.options.zoomLevels,r=!1;o.forEach(function(o){!r&&n>=o[0]&&(i>=o[1]&&e.setZoom(o[2]),e.setCenter(t.getCenter()),r=!0)}),r||i===this.options.zoom||("object"===typeof this.options.bounds&&e.fitBounds(this.options.bounds,{duration:50}),e.setZoom(this.options.zoom))}},{key:"_createContainer",value:function(e){var t=this.options,i=document.createElement("div");return i.className="mapboxgl-ctrl-minimap mapboxgl-ctrl",i.setAttribute("style","width: "+t.width+"; height: "+t.height+";"),i.addEventListener("contextmenu",this._preventDefault),e.getContainer().appendChild(i),""!==t.id&&(i.id=t.id),i}},{key:"_preventDefault",value:function(e){e.preventDefault()}}]),e}(),b=i(0);function _(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,n)}return i}function k(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?_(i,!0).forEach(function(t){Object(b.a)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):_(i).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}var w={point:{width:10,height:10,borderRadius:"50%"},line:{width:20,height:3},polygon:{width:20,height:20}},E=function(e){var t,i=(t=e.layout,o.a.createElement("table",null,o.a.createElement("tbody",null,t.map(function(e){return o.a.createElement("tr",{key:e.text},o.a.createElement("td",null,o.a.createElement("div",{className:"legend-signature",style:k({},w[e.geomType],{backgroundColor:e.color})})),o.a.createElement("td",null,o.a.createElement("span",null,e.text)))}))));return o.a.createElement("div",{className:"legend"},o.a.createElement("h3",null,e.title),i)},C=i(142),M=i.n(C),x=i(143),j=i.n(x),O=i(207),z=i(208),P=function(e){return o.a.createElement("div",{className:"map-interactive",onClick:e.clicked},o.a.createElement(z.a,{title:e.isActive?"Disable interactive map":"Enable interactive map",placement:"left"},o.a.createElement(O.a,{"aria-label":"delete"},e.isActive?o.a.createElement(M.a,{fontSize:"medium"}):o.a.createElement(j.a,{fontSize:"medium"}))))},S={left:"lefty",center:"centered",right:"righty"};function R(e){var t=e.id,i=e.theme,n=e.title,r=e.image,a=e.flourishID,s=e.embed,l=e.description,c=e.header,u=e.body,h=e.link,d=e.currentChapterID,p=e.legend,m=t===d?"step active":"step";return o.a.createElement("div",{id:t,className:m},o.a.createElement("div",{className:i},n&&o.a.createElement("h2",{className:"title"},n),r&&o.a.createElement("img",{src:r}),l&&o.a.createElement("p",null,l),c&&o.a.createElement("h3",null,c),u&&o.a.createElement("p",null,u),a&&o.a.createElement("div",{className:"flourish-embed","data-src":"visualisation/".concat(a)}),s&&o.a.createElement("iframe",{src:s,title:t,className:"embed",width:"100%",height:"400",frameBorder:"0"}),h&&o.a.createElement("a",{href:h.url,target:"_blank",rel:"noopener noreferrer"},h.title),p&&o.a.createElement(E,{title:p.title,layout:p.layout})))}var T=function(e){function t(e){var i;return Object(s.a)(this,t),(i=Object(c.a)(this,Object(u.a)(t).call(this,e))).toogleMapInteractivity=function(){i.setState({interactiveMap:!i.state.interactiveMap})},i.state={currentChapter:e.chapters[0],device:Object(y.a)().phone?"mobile":"desktop",interactiveMap:!1},i}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=this.state.device,i=e.chapters[0].location[t];p.a.accessToken=e.accessToken;var n=new p.a.Map({container:this.mapContainer,style:e.style,center:i.center,zoom:i.zoom,pitch:i.pitch,bearing:i.bearing,attributionControl:!1}),o=new p.a.Marker;e.showMarkers&&o.setLngLat(i[t].center).addTo(n);var r=this.setState.bind(this),a=g()();n.on("load",function(){e.showMiniMap&&n.addControl(new v(e.miniMap),"bottom-right"),a.setup({step:".step",offset:.9,progress:!0}).onStepEnter(function(i){var a=e.chapters.find(function(e){return e.id===i.element.id});r({currentChapter:a}),n.flyTo(a.location[t]),e.showMarkers&&o.setLngLat(a.location[t].center);var s=a.onChapterEnter.addLayers;s&&s.length>0&&s.forEach(function(e){!function(e){for(var t,i=n.getStyle().layers,o=0;o<i.length;o++)if("symbol"===i[o].type){t=i[o].id;break}e.source&&!n.getSource(e.layer.id)&&n.addSource(e.layer.id,e.source),n.getLayer(e.layer.id)?n.setLayoutProperty(e.layer.id,"visibility","visible"):n.addLayer(e.layer,t)}(e)})}).onStepExit(function(t){var i=e.chapters.find(function(e){return e.id===t.element.id}).onChapterExit.removeLayers;i&&i.length>0&&i.forEach(function(e){n.setLayoutProperty(e,"visibility","none")})})}),window.addEventListener("resize",a.resize)}},{key:"render",value:function(){var e=this,t=this.props,i=t.theme,n=this.state.currentChapter.id;return o.a.createElement("div",null,o.a.createElement("div",{ref:function(t){return e.mapContainer=t},className:"absolute top right left bottom",id:"map",style:this.state.interactiveMap?{zIndex:10}:{zIndex:-5}}),o.a.createElement(P,{clicked:this.toogleMapInteractivity,isActive:this.state.interactiveMap}),o.a.createElement("div",{id:"tooltip",style:{position:"fixed",zIndex:11,pointerEvents:"none"}}),o.a.createElement("div",{id:"story"},t.title&&o.a.createElement("div",{id:"header",className:i},o.a.createElement("h1",null,t.title),t.subtitle&&o.a.createElement("h2",null,t.subtitle),t.byline&&o.a.createElement("p",null,t.byline)),o.a.createElement("div",{id:"features",className:S[t.alignment]},t.chapters.map(function(e){return o.a.createElement(R,Object.assign({key:e.id,theme:i},e,{currentChapterID:n}))})),t.footer&&o.a.createElement("div",{id:"footer",className:i},o.a.createElement("p",null,t.footer))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var L=i(209),D={style:"mapbox://styles/baffioso/ck2s2efkx13u11cs349t1kitn",accessToken:"pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiT1JTS1lIMCJ9.f5ubY91Bi42yPnTrgiq-Gw",showMiniMap:!1,miniMap:{center:[-6.6037,20.48104],zoom:0,style:"mapbox://styles/baffioso/ck2s2efkx13u11cs349t1kitn",lineColor:"rgb(255, 50, 90)"},showMarkers:!1,theme:"light",alignment:"left",title:"REFUGEES",subtitle:"",byline:"",footer:"Bye Bye",chapters:[{id:"syria",title:"Refugees of the Syrian Civil War",description:"The unrest in Syria, part of a wider wave of the 2011 Arab Spring protests, grew out of discontent with the Syrian government and escalated to an armed conflict after protests calling for Assad's removal were violently suppressed. The conflict has caused a major refugee crisis causing a massive flee to countries around the world. The chart below shows where Syrian refugees where given asylum. (Press play button to se the development over time)",location:{desktop:{center:[34.49802,34.55465],zoom:5.22,pitch:0,bearing:0,speed:.5},mobile:{center:[38.58316,34.45603],zoom:5,pitch:3,bearing:-1.15,speed:.5}},onChapterEnter:{addLayers:[{layer:{id:"syria",type:"line",source:{type:"vector",url:"mapbox://baffioso.countries"},"source-layer":"countries",filter:["match",["get","ADMIN"],["Syria"],!0,!1],layout:{},paint:{"line-color":"rgb(255, 0, 0)","line-width":2}}}]},onChapterExit:{removeLayers:[]}},{id:"refugee-arc",title:"Refugees of the Syrian Civil War",description:"The unrest in Syria, part of a wider wave of the 2011 Arab Spring protests, grew out of discontent with the Syrian government and escalated to an armed conflict after protests calling for Assad's removal were violently suppressed. The conflict has caused a major refugee crisis causing a massive flee to countries around the world. The chart below shows where Syrian refugees where given asylum. (Press play button to se the development over time)",flourishID:1104402,location:{desktop:{center:[4.39089,34.63819],zoom:2.84,pitch:47.5,bearing:-16,speed:.5},mobile:{center:[22.32586,44.24128],zoom:2,pitch:41,bearing:-38.75,speed:.5}},onChapterEnter:{addLayers:[{source:{type:"vector",url:"mapbox://baffioso.refugee"},layer:{id:"syria",type:"line","source-layer":"syria",filter:["all",["match",["get","ADMIN"],["Syria"],!0,!1]],layout:{},paint:{"line-color":"rgb(255, 0, 0)","line-width":2}}},{layer:new(i(206).a)({id:"refugee-arc",type:L.a,data:"http://baffioso.github.io/data/syria.json",pickable:!0,getHeight:.4,getWidth:function(e){return Math.sqrt(Math.sqrt(e.value))},getSourcePosition:function(e){return[e.origin_long,e.origin_lat]},getTargetPosition:function(e){return[e.target_long,e.target_lat]},getSourceColor:function(e){return[25,156,255]},getTargetColor:function(e){return[168,229,255]},onHover:function(e){var t=e.object,i=e.x,n=e.y;A(t,i,n)}})}]},onChapterExit:{removeLayers:["refugee-arc"]}},{id:"europe",title:"Asylum in Europe",description:"By May 2011, thousands of people had already fled the country and the first refugee camps opened in Turkey. In March 2012, the UNHCR decided to appoint a Regional Refugee Coordinator for Syrian Refugees\u2014recognising the growing concerns surrounding the crisis. Just a year later, in March 2013, the number of Syrian refugees reached 1,000,000. By December 2017, UNHCR counted 1,000,000 asylum applications for Syrian refugees in the European Union. As of March 2018, UNHCR has counted nearly 5.6 million registered Syrian refugees worldwide. The greatest number of refugees fleeing to Europe originate from Syria.",legend:{title:"Number og asylum seekers",layout:[{color:"hsl(195, 88%, 86%)",geomType:"polygon",text:"> 1000"},{color:"hsl(195, 88%, 67%)",geomType:"polygon",text:"> 10000"},{color:"hsl(195, 88%, 46%)",geomType:"polygon",text:"> 100000"}]},location:{desktop:{center:[.27873,47.64381],zoom:3,pitch:0,bearing:0,speed:.5},mobile:{center:[6.51434,48.89563],zoom:3,pitch:0,bearing:0,speed:.5}},onChapterEnter:{addLayers:[{layer:{id:"europe",type:"fill-extrusion",source:{type:"vector",url:"mapbox://baffioso.96il3e8d"},"source-layer":"countries_poly_refugee-871n5z",minzoom:2,layout:{},paint:{"fill-extrusion-color":["interpolate",["linear"],["get","value"],1e3,"hsl(195, 88%, 86%)",1e4,"hsl(195, 88%, 67%)",1e5,"hsl(195, 88%, 46%)"],"fill-extrusion-height":["/",["get","value"],4],"fill-extrusion-vertical-gradient":["step",["zoom"],!0,22,!0]}}}]},onChapterExit:{removeLayers:["europe"]}}]},A=function(e,t,i){var n=document.getElementById("tooltip");return e?(n.innerHTML="Origin: ".concat(e.origin," </br> Target: ").concat(e.target," </br> Persons: ").concat(e.value),n.style.display="block",n.style.left=t+"px",n.style.top=i+"px",n.style.padding="10px"):n.style.display="none",n},B=D;a.a.render(o.a.createElement(T,B),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[163,1,2]]]);
//# sourceMappingURL=main.98441bc0.chunk.js.map