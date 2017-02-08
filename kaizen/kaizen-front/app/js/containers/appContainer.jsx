import React, {Component} from "react";
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

export default appContainer;