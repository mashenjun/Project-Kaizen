import React, {Component} from "react";
import {connect} from 'react-redux'
import NavbarComponent from '../components/navbar'
import '../../less/bulma.css';

class appContainer extends Component{
  render(){
    return (
          <div>
            <NavbarComponent/>
            {this.props.children}
          </div>
      )
  }
}

appContainer.propTypes = {
  children: React.PropTypes.node
};

function mapStateToProps(state, ownProps) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

        }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(appContainer);