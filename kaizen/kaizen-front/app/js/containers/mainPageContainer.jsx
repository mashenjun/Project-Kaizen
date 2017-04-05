import React, {Component} from "react";
import UserList from '../components/userList'
import UserMap from '../components/userMap'
import {connect} from 'react-redux'
import {fetchUploaderDataRequest} from '../actions/dataActions'

class mainpageContainer extends Component{
    componentDidMount(){
        console.log('testing map');
        this.props.fetchUsermapData();
    }
    render(){
        console.log('render mainpage');
        const {usermapdata} = this.props;
        return (
            <div>
                <UserMap/>
                <UserList/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsermapData() {
            dispatch(fetchUploaderDataRequest());
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)( mainpageContainer);
