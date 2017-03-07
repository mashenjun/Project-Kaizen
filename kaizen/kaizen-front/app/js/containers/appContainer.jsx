import React, {Component} from "react";
import {connect} from 'react-redux'
import NavbarComponent from '../components/navbar'
import '../../less/bulma.css';

class appContainer extends Component{
  render(){
      console.log('render appcontainer');
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


export default appContainer;