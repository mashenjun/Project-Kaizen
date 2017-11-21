import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {uploaderPageNavigate} from '../actions/navigationAction';
import {fetchUploaderPostsRequest} from '../actions/uploaderAction';
import {searchUploaderDataRequest,fetchUploaderDataRequest,filterUploaderDataRequest} from '../actions/dataActions';
import * as consts from '../constants/const';
import '../../less/userList.less';
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

  filterItemClick = (e)=>{
    this.catagory.innerText = e.target.innerText;
    this.props.filterUploaders(e.target.innerText);
  };

  render() {
    moment.locale('zh-cn');
    const postList = [];
    for(let p of this.props.posts){
      postList.push(<tr onClick={()=>{window.location.href = '#/upload/post/' + p.id}} key={p.id} style={{cursor:'pointer',fontSize: '1.1rem'}}><td>{p.title}</td><td>{p.catalogue}</td><td>{p.comment_count}</td><td>{moment(p.creadted_at).format('lll')}</td></tr>);
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
                      <div className="field is-grouped">
                        <p className="control is-expanded" style={{minWidth: '230px'}}>
                          <input className="input" ref={(keyword)=>{this.keyword = keyword}} onKeyPress={(e)=>{if(e.key==='Enter'){this.props.searchUploaders(this.keyword.value)}}}type="text" placeholder="关键词"></input>
                        </p>
                        <p className="control">
                          <button className="button is-info" onClick={()=>{this.props.searchUploaders(this.keyword.value)}}>Search</button>
                        </p>
                      </div>
                  </div>
                  <div className="nav-right">
                    <div className="navbar-item has-dropdown is-hoverable">
                      <a className="navbar-link" ref={(cat)=>(this.catagory = cat)}>
                        类别
                      </a>
                      <div className="navbar-dropdown">
                        <a className="navbar-item" onClick={this.filterItemClick}>
                          民间游戏
                        </a>
                        <a className="navbar-item" onClick={this.filterItemClick}>
                          传说/故事
                        </a>
                        <a className="navbar-item" onClick={this.filterItemClick}>
                          儿歌/童谣
                        </a>
                        <a className="navbar-item" onClick={this.filterItemClick}>
                          玩意/把式
                        </a>
                        <a className="navbar-item" onClick={this.filterItemClick}>
                          地方特色
                        </a>
                        <a className="navbar-item" onClick={this.filterItemClick}>
                          其他
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns is-multiline">
                {this.props.totalCount==0?<div className="no-result-span">没有符合条件的记录</div>:upload_currentPage}
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
    },
    searchUploaders(keyword){
      if(keyword){
        dispatch(searchUploaderDataRequest(keyword));
      }else{
        dispatch(fetchUploaderDataRequest());
      }
    },
    filterUploaders(filter){
      dispatch(filterUploaderDataRequest(filter));
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
