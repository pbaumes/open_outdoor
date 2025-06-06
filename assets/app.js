/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
require('bootstrap');
import {Map} from 'maplibre-gl';

const $ = require('jquery');

const transformRequest = (url, resourceType) => {
    if (isMapboxURL(url)) {
        return transformMapboxUrl(url, resourceType, mapboxKey)
    }

    return {url}
}

let map = new Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/voyager/style.json?key=rrASqj6frF6l2rrOFR4A',
    center: [3.8833, 43.6],
    zoom: 9
});

var inputs = $('#menu :input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle(layerId);
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


