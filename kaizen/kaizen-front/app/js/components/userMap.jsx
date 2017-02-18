import React, {Component} from "react";
import L from 'leaflet';
import Api from '../sagas/Api'

class UserMap extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const  {usermapdata }= nextProps;
        console.log(usermapdata);
        const map =  L.map('mapid', {searchControl: {}}).setView([34, 112], 4);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 3,
            maxZoom: 10,
            attributionControl: false
        }).addTo(map);

        for(const user of usermapdata){
            const [x,y] =user.location.coordinates;
            let circle_user = L.circleMarker([x, y], {
                color: this.getRandomColor(),
                weight: 2,
                fillOpacity: 0.2,
                radius: 8
            }).addTo(map);
            circle_user.bindPopup("<b>"+user.name+"</b><br><a href=''></a>")
        }
    }

    getRandomColor() {
        const  letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }



    render() {
        return (
            <div style={{paddingLeft:"40px",paddingRight:"40px"}}>
                <div id="mapid" style={{height: "330px"}}></div>
            </div>
        )
    }
}


export default UserMap;

