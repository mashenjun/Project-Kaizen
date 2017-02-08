var map = L.map('mapid',{searchControl: {}}).setView([31,112],5);

L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
	minZoom: 4,
	maxZoom: 14,
	tms: false
}).addTo(map);

var circle = L.circle([31,112], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5000
}).addTo(map);