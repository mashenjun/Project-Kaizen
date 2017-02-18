import React, {Component} from "react";
import UserList from '../components/userList'
import UserMap from '../components/userMap'
import {connect} from 'react-redux'
import {fetchUploaderDataRequest} from '../actions/dataActions'
class mainpageContainer extends Component{
    componentDidMount(){
        this.props.fetchUsermapData();
    }
    render(){
        const {usermapdata} = this.props;
        return (
            <div>
                <UserMap usermapdata={this.props.usermapdata}/>
                <UserList/>
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
