import React, {Component} from "react";

class UserMap extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{paddingLeft:"40px",paddingRight:"40px"}}>
                <div id="mapid" style={{height: "300px"}}></div>
            </div>
        )
    }
}


export default UserMap;

