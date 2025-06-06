/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
require('bootstrap');
import {Map, Marker, GeolocateControl} from 'maplibre-gl';

const $ = require('jquery');

const transformRequest = (url, resourceType) => {
    if (isMapboxURL(url)) {
        return transformMapboxUrl(url, resourceType, mapboxKey)
    }

    return {url}
}

let map = new Map({
    container: 'map',
    style: 'https://geoserveis.icgc.cat/contextmaps/osm-bright.json',
    center: [3.8833, 43.6],
    zoom: 9
});

var inputs = $('#menu :input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    let tile;

    if ('osm' === layerId) {
        tile = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const style = {
            "version": 8,
            "sources": {
                "osm": {
                    "type": "raster",
                    "tiles": [tile],
                    "tileSize": 256,
                    "attribution": "&copy; OpenStreetMap Contributors",
                    "maxzoom": 19
                }
            },
            "layers": [
                {
                    "id": "osm",
                    "type": "raster",
                    "source": "osm"
                }
            ]
        };
        map.setStyle(style);
    } else {
        map.setStyle(layerId);
    }
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.addControl(
    new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

var nav = new maplibregl.NavigationControl();
map.addControl(nav, 'top-right');

map.on('click', (e) => {
    let marker = map.getContainer().getElementsByClassName('maplibregl-marker');
    if (marker.length === 0) {
        let marker = new Marker({draggable: true})
            .setLngLat(e.lngLat)
            .addTo(map);
    }
});



