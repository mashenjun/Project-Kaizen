import React from 'react';
import { hashHistory} from 'react-router';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
    hashHistory.push('/login')//testing
  }

  render() {
    return (
      <div>
        Like : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Like you!!!</button></div>
      </div>
    );
  }

}

export default AwesomeComponent;