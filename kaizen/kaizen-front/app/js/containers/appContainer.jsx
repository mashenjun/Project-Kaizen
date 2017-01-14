import React, {Component} from "react";

class appContainer extends Component{
  render(){
    return (
          <div>
            this is mock application container
            {this.props.children}
          </div>
      )
  }
}

appContainer.propTypes = {
  children: React.PropTypes.node
}

export default appContainer;