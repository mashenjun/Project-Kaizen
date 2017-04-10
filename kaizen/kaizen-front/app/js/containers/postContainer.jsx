import React, {Component} from "react";
import 'whatwg-fetch';
import {fetchpostDetailRequest} from '../actions/postActions';
import {connect} from 'react-redux';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';

class postContainer extends Component {
  componentDidMount() {
    this.props.fetchpostDetail(this.props.params.postid)
  }

  render() {
    const {postDetail} = this.props;
    return (
        <div>
          <div className="container">
            <div style={{padding: '24px'}} className="card">
              <div className="card-content">
                <div className="content">
                  <h3>Content</h3>
                  {postDetail.title}

                  <hr/>
                  <h3>Images</h3>
                  { postDetail.img_url &&
                    postDetail.img_url.map((url) =>
                      <img width='300px' src={url}/>)
                  }

                  <hr/>
                  <h3>Videos</h3>
                  { postDetail.video_url &&
                  <div style={{width: '50%', height: '50%'}}>
                    <Video
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        onCanPlayThrough={() => {
                          // Do stuff
                        }}>
                      <source src={postDetail.video_url[0]} type="video/webm"/>
                    </Video>
                  </div>
                  }

                  <hr/>
                  <h3>Audios</h3>
                  { postDetail.audio_url &&
                      <div>
                        <div style={{paddingTop: '40px'}}>
                          <audio controls src={postDetail.audio_url[0]}>
                            Your browser does not support the <code>audio</code> element.
                          </audio>
                        </div>
                      </div>

                  }

                  <hr/>
                  <h3>Content</h3>
                  {postDetail.text}

                  <br/>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {
      postDetail
  } =  state.postDetail;
  return {
    postDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchpostDetail(postid) {
      dispatch(fetchpostDetailRequest(postid));
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(postContainer);