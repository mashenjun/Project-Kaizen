import React, {Component} from "react";
import UserList from '../components/userList'
import UserMap from '../components/userMap'
import Footer from '../components/footer'
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
                <UserMap usermapdata={this.props.usermapdata}/>
                <UserList usermapdata={this.props.usermapdata}/>
                <Footer/>
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
