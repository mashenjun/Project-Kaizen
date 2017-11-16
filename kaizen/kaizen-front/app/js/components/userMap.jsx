import React, {Component} from "react";
import L from 'leaflet';
import {fetchUploaderPostsRequest} from '../actions/uploaderAction';
import {connect} from 'react-redux';
import moment from 'moment';

class UserMap extends Component {
  constructor(props) {
    super(props);
  }

  fetchPosts = (uploaderId) => {
    console.log("click and fetch", uploaderId);
    this.postmodal.classList.add('is-active');
    this.props.fetchPostList(uploaderId)
  };

  componentWillReceiveProps(nextProps) {
    const {usermapdata}= nextProps;
    console.log('map component render');
    if(this.map){
      console.log('clear map');
      this.map.off();
      this.map.remove();
    }
    this.map = L.map('mapid', {searchControl: {}}).setView([34, 112], 4);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 10,
      attributionControl: false
    }).addTo(this.map);

    for (const user of usermapdata) {
      const [x,y] =user.location.coordinates;
      let circle_user = L.circleMarker([y, x], {
        color: this.getRandomColor(),
        weight: 2,
        fillOpacity: 0.2,
        radius: 8
      }).addTo(this.map);

      const content = L.DomUtil.create('div');
      content.innerHTML = "<div style='width: 80px;'>"+
          "<img src=" + user.photo_url + "></div>" + "<div style='text-align: center'><b>" +
          user.name + "</b><br/><span>" + user.home_town
          + "</span></div>";
      const ele = circle_user.bindPopup(content);
      L.DomEvent.addListener(content, 'click', ()=>{
        this.fetchPosts(user.id);
      });
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  render() {
    moment.locale('zh-cn');
    const postList = [];
    for (let p of this.props.posts) {
      postList.push(<tr onClick={() => {
        window.location.href = '#/upload/post/' + p.id
      }} key={p.id} style={{cursor: 'pointer', fontSize: '1.1rem'}}>
        <td>{p.title}</td>
        <td>{p.catalogue}</td>
        <td>{p.comment_count}</td>
        <td>{moment(p.creadted_at).format('lll')}</td>
      </tr>);
    }
    return (
        <div style={{paddingLeft: "80px", paddingRight: "80px", marginTop: "10px"}}>
          <div id="mapid" style={{height: "420px"}}></div>
          <div ref={(postmodal) => this.postmodal = postmodal} className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">选择要查阅的条目</p>
                <button className="delete" onClick={() => this.postmodal.classList.remove("is-active")}></button>
              </header>
              <section className="modal-card-body">
                <table className="table is-striped">
                  <thead>
                  <tr>
                    <th>标题</th>
                    <th>类别</th>
                    <th>评论</th>
                    <th>创建时间</th>
                  </tr>
                  </thead>
                  <tbody>
                  {postList}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  const {
      usermapdata
  } =  state.uploaders;
  const {
      posts
  } = state.postofUploader;
  return {
    posts,
    usermapdata
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostList(uploaderid){
      dispatch(fetchUploaderPostsRequest(uploaderid));
    }
  }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserMap);

