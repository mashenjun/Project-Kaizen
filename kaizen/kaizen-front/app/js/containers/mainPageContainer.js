import React, {Component} from "react";
import UserList from '../components/userList'
import UserMap from '../components/userMap'

class mainpageContainer extends Component{
    render(){
        return (
            <div>
                <UserMap/>
                <UserList/>
            </div>
        )
    }
}

export default mainpageContainer;
