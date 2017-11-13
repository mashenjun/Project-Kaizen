import React, {Component} from "react";
import 'whatwg-fetch';
import {fetchpostDetailRequest} from '../actions/postActions';
import {connect} from 'react-redux';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';
import '../../less/postDetail.less'

class postContainer extends Component {
  componentDidMount() {
    this.props.fetchpostDetail(this.props.params.postid)
  }

  render() {
    const {postDetail} = this.props;
    console.log(postDetail);
    return (
        <div>
          <div className="container">
            <div className="columns post-header">
              <div className="column">
                <h3 className="post-header-title">标题</h3>
                {postDetail.title}
              </div>
              <div className="column">
                <h3 className="post-header-title">类别</h3>
                {postDetail.catalogue}
              </div>
              <div className="column">
                <h3 className="post-header-title">作者</h3>
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src={postDetail.author_avatar_url} alt="Image"/>
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4"></p>
                    <p className="subtitle is-6">{postDetail.author_name}</p>
                  </div>
                </div>
              </div>

            </div>
            <div style={{padding: '24px'}} className="card">
              <div className="card-content">
                <div className="content">

                  <h3>描述</h3>
                  {postDetail.text}
                  <hr/>


                  <h3>图片</h3>
                  { postDetail.img_url &&
                    postDetail.img_url.map((url) =>
                      <img width='300px' src={url}/>)
                  }
                  <hr/>

                  <h3>音频</h3>
                  { postDetail.audio_url &&
                  <div>{
                    postDetail.audio_url.map((audio_url) =>
                        <div style={{paddingTop: '40px'}}>
                          <audio controls src={audio_url}>
                            Your browser does not support the <code>audio</code> element.
                          </audio>
                        </div>
                    )}
                  </div>
                  }

                  <hr/>
                  <h3>视频</h3>
                  { postDetail.video_url &&
                      <div>
                        {
                          postDetail.video_url.map((video_url)=>
                          <div style={{width: '50%', height: '50%'}}>
                            <Video
                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                onCanPlayThrough={() => {
                                  // Do stuff
                                }}>
                              <source src={video_url} type="video/webm"/>
                            </Video>
                          </div>)
                        }
                      </div>
                  }

                </div>
              </div>
            </div>
            <div style={{padding: '24px'}} className="card">
              <div className="card-content">
                <div className="content">
                  <h3>Comments</h3>
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