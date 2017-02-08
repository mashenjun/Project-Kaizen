var map = L.map('mapid',{searchControl: {}}).setView([31,112],5);

L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
	minZoom: 4,
	maxZoom: 14,
	tms: false
}).addTo(map);