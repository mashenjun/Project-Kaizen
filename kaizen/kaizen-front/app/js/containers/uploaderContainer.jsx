import React, {Component} from "react";

class uploaderContainer extends Component{
  render(){
    return (
        <div>
          <div className="container">
            {this.props.params.uploaderid}
          </div>
        </div>
    )
  }
}

export default uploaderContainer;

