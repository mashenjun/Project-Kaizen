import React, {Component} from "react";
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import Cropper from 'react-cropper';
import {localstore} from '../store/localstore';
import {fetchuseruploadersrequest} from '../actions/useraction';
import '../../less/navbar.less';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'cropperjs/dist/cropper.css';
import 'whatwg-fetch';
import {Map, Marker} from 'react-amap';
import * as consts from '../constants/const';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      src: "",
      cropResult: "",
      provinces: [],
      citys: [],
      finalCity: "",
      markerVisible: false,
      markerPosition: {
        longitude: 116,
        latitude: 39
      }
    };
  }

  onUploaderClick = () => {
    this.modal.classList.add("is-active");
    const {uid, kaizenToken} = localstore.getToken();
    if (uid && kaizenToken) {
      this.props.onUploadClick(uid, kaizenToken);
    }
  };

  onProvinchange = () => {
    this.setState({finalCity: ""});
    if (this.proveList.value) {
      fetch('/upload/query/province/' + this.proveList.value).then((response) => response.json()).then((data) => {
        this.setState({citys: data})
      });
    }
  };

  onCitychange = () => {
    this.errorHint.style.display = "none";
    this.setState({finalCity: this.cityList.value})
  };


  componentDidMount = () => {
    fetch('/upload/query/province/').then((response) => response.json()).then((data) => {
      this.setState({provinces: data})
    });
  };

  onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  };

  mapEvents = {
    click: (e) => {
      fetch(`http://restapi.amap.com/v3/geocode/regeo?output=json&key=${consts.AK}&location=${[e.lnglat.lng,e.lnglat.lat]}`)
      .then((response) => response.json())
      .then((data) =>{
        const address = data.regeocode.addressComponent;
        this.setState({
          finalCity:address.city&&address.city.length?address.city:address.province
        })
      });
      this.setState({
        markerVisible: true,
        markerPosition: {longitude: e.lnglat.lng, latitude: e.lnglat.lat},
      })
    }
  };

  onFetchDatahandler = (data) => {
    const postUrl = '/testrestful/OSSpage/';
    window.location.href = postUrl + "?uploaderid=" + data.id;
  };

  onFetchErrorHandler = (err) => {
    console.log(err);
  };

  onCreateHandler = () => {
    const {uid} = localstore.getToken();
    let formData = new FormData();
    formData.append('name', this.name.value);
    formData.append('birth_day', this.state.startDate.format('YYYY-MM-DD'));
    formData.append('sex', this.sex.value);
    formData.append('user', uid);
    formData.append('home_town', this.state.finalCity);
    if (!this.state.finalCity) {
      console.log('error');
      this.errorHint.style.display = "inline"
    } else {
        formData.append('location', [this.state.markerPosition.longitude, this.state.markerPosition.latitude]);
        if (!this.cropper.getCroppedCanvas() || typeof this.cropper.getCroppedCanvas() === 'undefined') {
          fetch('/upload/uploader/', {
            method: 'POST',
            body: formData
          }).then((response) => response.json()).then(this.onFetchDatahandler).catch(this.onFetchErrorHandler);
        } else {
          this.cropper.getCroppedCanvas().toBlob((blob) => {
            formData.append('photo', blob);
            fetch('/upload/uploader/', {
              method: 'POST',
              body: formData
            }).then(this.onFetchDatahandler).catch(this.onFetchErrorHandler);
          });
        }
    }
  };

  componentWillReceiveProps(nextProps) {
    const {isAuthenticated} = localstore.getToken();
    console.log(isAuthenticated, nextProps);
    if (isAuthenticated && nextProps.errorMessage === 200) {
      this.loading.style.display = 'none'
    }
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const imageStyle = {
      marginRight: '40px',
      border: 'solid',
      borderWidth: '1px',
      borderColor: '#eee',
      minHeight: '35px'
    };

    let uploaderList = [];
    const postUrl = '/testrestful/OSSpage/';
    for (let up of this.props.userUploaders) {
      uploaderList.push(
          <div key={up.id} className="media uploader-wrapper" onClick={() => {
            window.location.href = postUrl + "?uploaderid=" + up.id;
          }}>
            <figure style={imageStyle} className="media-left">
              <img width={35} height={35} src={up.photo_url}></img>
            </figure>
            <div className="media-content">
              <div className="content">
                <div className="columns">
                  <div className="column is-half">
                    <span style={{marginRight: '1rem'}}><strong>{up.name}</strong> <small>@{up.home_town}</small></span>
                  </div>
                  <div className="column is-half">
                    <span>已有 <strong>{up.post_count}</strong> 条目 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }

    const {username, isAuthenticated} = localstore.getToken();
    if (uploaderList.length === 0) {
      uploaderList = 'You do not have any uploaders. You should create one'
    }
    const provinceList = [];
    for (let p of this.state.provinces) {
      provinceList.push(<option key={p.code} value={p.code}>{p.name}</option>);
    }
    const cityList = [];
    for (let c of this.state.citys) {
      cityList.push(<option key={c.code} value={c.name}>{c.name}</option>);
    }

    return (
        <div>
          <div ref={(modal) => this.modal = modal} className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">选择一个上传者</p>
                <button className="delete" onClick={() => this.modal.classList.remove("is-active")}></button>
              </header>
              <section className="modal-card-body">
                {
                  isAuthenticated && this.props.errorMessage === 200 ?
                      <div>
                        <div ref={(loading) => {
                          this.loading = loading
                        }} style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center'
                        }}>
                          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                        </div>
                        {uploaderList}
                      </div> :
                      "请先登录！"
                }
              </section>
              <footer className="modal-card-foot">
                {isAuthenticated && this.props.errorMessage === 200 ?
                    <a className="button is-success" onClick={() => {
                      this.formModal.classList.add("is-active");
                      this.modal.classList.remove("is-active");
                    }}><i className="fa fa-plus" style={{marginRight: '5px'}}></i>创建新的上传者</a> :
                    <a className="button is-success" onClick={() => hashHistory.push('/login')}>登录</a>}
                <a className="button" onClick={() => this.modal.classList.remove("is-active")}>取消</a>
              </footer>
            </div>
          </div>

          <div>
            <div ref={(modal) => {
              this.formModal = modal
            }} className="modal">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">创建上传者</p>
                  <button className="delete" onClick={() => this.formModal.classList.remove("is-active")}></button>
                </header>
                <section className="modal-card-body">
                  <div className="form">
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">名字</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" ref={(name) => {
                              this.name = name
                            }} type="text" placeholder="请输入名字！"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">性别</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                             <span className="select">
                              <select ref={(sex) => {
                                this.sex = sex
                              }}>
                                <option value={'M'}>男</option>
                                <option value={'F'}>女</option>
                              </select>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">头像</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input type="file" accept="image/*" onChange={this.onChange}/>
                            <Cropper
                                style={{maxHeight: 180, maxWidth: 180}}
                                aspectRatio={1}
                                preview=".img-preview"
                                guides={false}
                                src={this.state.src}
                                ref={cropper => {
                                  this.cropper = cropper
                                }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">出生日期</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <DatePicker
                                selected={this.state.startDate}
                                className={'dateWrapper'}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                onChange={this.handleChange}
                                dropdownMode="select"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">家乡</label>
                      </div>
                      <div className="field-body">
                        <div style={{paddingTop: '8px'}}>
                          <div style={{marginBottom: '10px'}}>
                            <span>当前选择城市：{this.state.finalCity}</span>
                          </div>
                          <div style={{width: '500px', height: '300px'}}>
                            <Map amapkey={consts.AmapKey}  plugins={['ToolBar']} zoom={4} center={this.state.markerPosition}
                                 events={this.mapEvents}>
                              <Marker position={this.state.markerPosition} visible={this.state.markerVisible}/>
                            </Map>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </section>
                <footer className="modal-card-foot">
                  <a className="button is-success" onClick={this.onCreateHandler}><i className="fa fa-plus"
                                                                                     style={{marginRight: '5px'}}></i>创建</a>
                  <a className="button" onClick={() => {
                    this.formModal.classList.remove("is-active");
                    window.location.reload();
                  }}>取消</a>
                </footer>
              </div>
            </div>
          </div>

          <nav className="nav is-dark has-shadow" id="top">
            <div className="container">
              <div className="nav-left">
                <a className="nav-item" href="/pages/#/home">
                  <img style={{maxHeight: '2.5rem'}} src="/static/images/bulma.png" alt="Description"/>
                </a>
              </div>
              <span className="nav-toggle">
                          <span></span>
                          <span></span>
                          <span></span>
                    </span>
              <div className="nav-right nav-menu">
                <a ref={(a) => this.hometab = a} onClick={(e) => {
                  hashHistory.push('/home');
                  e.target.classList.add('is-active');
                  this.aboutab.classList.remove('is-active')
                }} className="nav-item is-tab is-active">主页</a>
                <a className="nav-item is-tab" ref={(upload) => this.uploadtab = upload} onClick={this.onUploaderClick}>上传</a>
                <a ref={(a) => this.aboutab = a} onClick={(e) => {
                  hashHistory.push('/about');
                  e.target.classList.add('is-active');
                  this.hometab.classList.remove('is-active')
                }} className="nav-item is-tab">关于</a>
                <span className="nav-item">
                          { isAuthenticated ?
                              <span>用户:{username}</span> :
                              (<span><a className="button" onClick={() => hashHistory.push('/login')}>
                                  登录
                              </a>
                              <a className="button is-info" onClick={() => hashHistory.push('/signup')}>
                                  注册
                              </a></span>)
                          }
                        </span>
              </div>
            </div>
          </nav>
        </div>

    )
  }
}

function mapStateToProps(state, ownProps) {
  const {userUploaders, errorMessage} = state.useractions;
  return {userUploaders, errorMessage}
}

function mapDispatchToProps(dispatch) {
  return {
    onUploadClick(uid, kaizenToken) {
      dispatch(fetchuseruploadersrequest(
          uid, kaizenToken
      ))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarComponent);

