import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {uploaderPageNavigate} from '../actions/navigationAction';
import {fetchUploaderPostsRequest} from '../actions/uploaderAction'
import * as consts from '../constants/const';
import '../../less/userList.less'
import moment from 'moment';

class UserList extends React.Component {

  constructor(props) {
    super(props);
  }

  onPreClick = () => {
    if (this.props.currentPage > 1) {
      this.props.uploaderPageNavigate(this.props.currentPage - 1);
    }
  };

  onNextClick = () => {
    const maxPage = Math.floor(this.props.totalCount / consts.PAGE_SIZE) + 1;
    if (this.props.currentPage < maxPage) {
      this.props.uploaderPageNavigate(this.props.currentPage + 1);
    }
  };

  render() {
    const postList = [];
    for(let p of this.props.posts){
      postList.push(<tr onClick={()=>{window.location.href = '#/upload/post/' + p.id}} key={p.id} style={{cursor:'pointer',fontSize: '1.1rem'}}><td>{p.title}</td><td>{p.catalogue}</td><td>{p.comment_count}</td><td>{moment(p.creadted_at).format('MMMM Do YYYY, h:mm:ss a')}</td></tr>);
    }
    const maxPage = Math.floor(this.props.totalCount / consts.PAGE_SIZE) + 1;
    const {currentPage} = this.props;
    const pagi_list = [];
    const upload_currentPage = [];
    for (let i = 1; i <= maxPage && this.props.usermapdata.length > 0; i++) {
      pagi_list.push(<li key={i}><a onClick={() => this.props.uploaderPageNavigate(i)}
                                    className={"pagination-link " + (this.props.currentPage == i ? "is-current" : "")}>{i}</a>
      </li>);
    }
    for (let j = (currentPage - 1) * consts.PAGE_SIZE; j < (currentPage) * consts.PAGE_SIZE && this.props.usermapdata.length; j++) {
      if (j < this.props.totalCount) {
        upload_currentPage.push(
            <div key={j} className="column is-3" onClick={() => {
              this.postmodal.classList.add('is-active');
              this.props.fetchPostList(this.props.usermapdata[j].id)
            }}>
              <div className="panel panel-wrapper">
                <div className="panel-photo">
                  <img width="300" height="300" src={this.props.usermapdata[j].photo_url}/>
                </div>
                <div className="panel-block" style={{borderRadius: "0 0 4px 4px"}}>
                  <div className="columns" style={{width: '100%', paddingLeft: '10px'}}>
                    <div className="column">
                      <span className="panel-block-item">{this.props.usermapdata[j].name}</span>
                    </div>
                    <div className="column has-text-right">
                      <span className="panel-block-item">{this.props.usermapdata[j].home_town}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
      }
    }
    return (
        <div>
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

          <div className="section">
            <div className="container">
              <div className="title is-2">总览</div>
              <div className="nav menu" style={{marginBottom: "10px"}}>
                <div className="container">
                  <div className="nav-left">
                    <a className="nav-item is-tab is-active"><span className="icon-btn"><i
                        className="fa fa-plus"></i></span></a>
                    <a className="nav-item is-tab">
                                          <span className="icon-btn thin">
                                            <i className="fa fa-lock"></i>
                                          </span>
                    </a>
                    <a className="nav-item is-tab">
                                          <span className="icon-btn">
                                            <i className="fa fa-trash"></i>
                                          </span>
                    </a>
                    <div className="nav-item is-tab">
                      <strong>testing</strong>
                    </div>
                  </div>
                  <div className="nav-right is-hidden-mobile">
                    <a className="nav-item is-tab">名字</a>
                    <a className="nav-item is-tab">大小</a>
                    <a className="nav-item is-tab">查看</a>
                    <a className="nav-item"><span className=" button is-success">已上传</span></a>
                  </div>
                </div>
              </div>

              <div className="columns is-multiline">
                {upload_currentPage}
              </div>
              <div className="container">
                <nav className="pagination is-centered">
                  <a ref={(previous) => {
                    this.previous = previous;
                  }} onClick={this.onPreClick} className="pagination-previous">上一页</a>
                  <a ref={(nextPage) => {
                    this.nextPage = nextPage;
                  }} onClick={this.onNextClick} className="pagination-next">下一页</a>
                  <ul className="pagination-list">
                    {pagi_list}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
      totalCount, currentPage, usermapdata
  } =  state.uploaders;
  const {
    posts
  } = state.postofUploader;
  return {
    usermapdata,
    totalCount,
    currentPage,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uploaderPageNavigate(page) {
      dispatch(uploaderPageNavigate(page));
    },
    fetchPostList(uploaderid){
      dispatch(fetchUploaderPostsRequest(uploaderid));
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);