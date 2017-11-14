import React, {Component} from "react";
import L from 'leaflet';
import {connect} from 'react-redux'
class UserMap extends Component {
    constructor(props) {
        super(props);
    }



    componentWillReceiveProps(nextProps) {
        const  {usermapdata }= nextProps;
        console.log('map component render');
        const map =  L.map('mapid', {searchControl: {}}).setView([34, 112], 4);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 3,
            maxZoom: 10,
            attributionControl: false
        }).addTo(map);

      for(const user of usermapdata){
            const [x,y] =user.location.coordinates;
            let circle_user = L.circleMarker([y, x], {
                color: this.getRandomColor(),
                weight: 2,
                fillOpacity: 0.2,
                radius: 8
            }).addTo(map);
            circle_user.bindPopup("<divstyle='width: 80px;'><a href=#/upload/uploader/"+user.id+"><img src="+
                user.photo_url+"></a></div>"+"<div style='text-align: center'><b>"+
                user.name+"</b><br/><span>"+user.home_town
                +"</span></div>")
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
            <div style={{paddingLeft:"80px",paddingRight:"80px",marginTop:"10px"}}>
                <div id="mapid" style={{height: "420px"}}></div>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
  const {
      usermapdata
  } =  state.uploaders;
  return {
    usermapdata
  }
}

export default connect(
    mapStateToProps,
    ()=>{return {}}
)(UserMap);

