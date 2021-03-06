var extent = Cesium.Rectangle.fromDegrees(11.573737, 55.950614, 11.586137, 55.959686);

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NGM3NDNkYy0yZWM0LTQ0ODQtYjFmNS0zMDY4MGIxNDVmYmQiLCJpZCI6MTgyMzEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzM1MDc5NTd9.VF54ufCrlaAEna_iHaCn47njpuMz1qgjrone4WnuCuA';

var viewer = new Cesium.Viewer('cesiumContainer', {
    geocoder: false,
    baseLayerPicker: false,
    imageryProvider: new Cesium.MapboxImageryProvider({
        mapId: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiY2s2cDNna2ZkMDkxYzNrcWxsOWhnMXpncSJ9.GDRxMk2269dec-HR2TAk-w'
    }),
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(343935)
    }),
    shadows: true,
    terrainShadows: Cesium.ShadowMode.ENABLED,
});

const onChangeTerrain = (event) => {
    const ionId = event.value;
    viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(ionId)
    })
}

var shadowMap = viewer.shadowMap;
//shadowMap.maxmimumDistance = 10000.0;
var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(344047),
    })
);

var promise = Cesium.IonResource.fromAssetId(343952)
    .then(function (resource) {
        return Cesium.GeoJsonDataSource.load(resource, {
            stroke: Cesium.Color.RED,
            fill: new Cesium.Color(1, 1, 1, 0.4),
            strokeWidth: 10,
            markerSymbol: '?',
            clampToGround: true

        });
    })
    .then(function (dataSource) {
        return viewer.dataSources.add(dataSource);
    })
    .then(function (dataSource) {
        return viewer.zoomTo(dataSource);
    })
    .otherwise(function (error) {
        console.log(error);
    });
