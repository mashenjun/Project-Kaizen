import React, {Component} from "react";
import {hashHistory} from 'react-router';
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

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      src: "",
      cropResult: "",
    };
  }

  onUploaderClick = () => {
    this.modal.classList.add("is-active");
    const {uid} = localstore.getToken();
    if (uid) {
      this.props.onUploadClick(uid);
    }
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

  _crop = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  };

  onFetchDatahandler = (data)=>{
    const postUrl = '/testrestful/OSSpage/';
    window.location.href = postUrl+ "?uploaderid=" + data.id;
  };

  onFetchErrorHandler = (err)=>{
    console.log(err);
  };

  onCreateHandler = () => {
    const {uid} = localstore.getToken();
    let formData = new FormData();
    formData.append('name', this.name.value);
    // formData.append('birth_day', this.state.startDate.format());
    formData.append('birth_day', '2012-03-08T00:12')
    formData.append('sex', this.sex.value);
    formData.append('user', uid);
    formData.append('home_town', 'shanghai');
    formData.append('location', [11,22]);
    if (!this.cropper.getCroppedCanvas() || typeof this.cropper.getCroppedCanvas() === 'undefined') {
        fetch('/upload/uploader/', {
          method: 'POST',
          body: formData
        }).then((response)=>response.json()).then(this.onFetchDatahandler).catch(this.onFetchErrorHandler);
    } else {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        formData.append('photo', blob);
        fetch('/upload/uploader/', {
          method: 'POST',
          body: formData
        }).then(this.onFetchDatahandler).catch(this.onFetchErrorHandler);
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.loading.style.display = 'none'
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
                    <span>Already has <strong>{up.post_count}</strong> post </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }
    console.log('rererer...rerender', this.props.userUploaders);
    const {username, isAuthenticated} = localstore.getToken();
    if (uploaderList.length === 0) {
      uploaderList = 'You do not have any uploaders. You should create one'
    }
    return (
        <div>
          <div ref={(modal) => this.modal = modal} className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Choose a Uploader</p>
                <button className="delete" onClick={() => this.modal.classList.remove("is-active")}></button>
              </header>
              <section className="modal-card-body">
                {
                  isAuthenticated ?
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
                      "In order to upload a post, You have to Log in First"
                }
              </section>
              <footer className="modal-card-foot">
                {isAuthenticated ?
                    <a className="button is-success" onClick={() => {
                      this.formModal.classList.add("is-active");
                      this.modal.classList.remove("is-active");
                    }}><i className="fa fa-plus" style={{marginRight: '5px'}}></i>Create
                      New Uploader</a> :
                    <a className="button is-success" onClick={() => hashHistory.push('/login')}>Login</a>}
                <a className="button" onClick={() => this.modal.classList.remove("is-active")}>Cancel</a>
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
                  <p className="modal-card-title">Create a Uploader</p>
                  <button className="delete" onClick={() => this.formModal.classList.remove("is-active")}></button>
                </header>
                <section className="modal-card-body">
                  <div className="form">
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Name</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" ref={(name) => {
                              this.name = name
                            }} type="text" placeholder="Name"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Sex</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                             <span className="select">
                              <select ref={(sex)=>{this.sex=sex}}>
                                <option value={'M'}>Male</option>
                                <option value={'F'}>Female</option>
                              </select>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Picture</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input type="file" accept="image/*" onChange={this.onChange}/>
                            <Cropper
                                style={{maxHeight: 150, maxWidth: 150}}
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
                        <label className="label">BirthDay</label>
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
                        <label className="label">HomeTown</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="text" placeholder="Home town"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <a className="button is-success" onClick={this.onCreateHandler}><i className="fa fa-plus"
                                                                                     style={{marginRight: '5px'}}></i>Create</a>
                  <a className="button" onClick={() => this.formModal.classList.remove("is-active")}>Cancel</a>
                </footer>
              </div>
            </div>
          </div>

          <nav className="nav is-dark has-shadow" id="top">
            <div className="container">
              <div className="nav-left">
                <a className="nav-item" href="../home.html">
                  <img src="/static/images/bulma.png" alt="Description"/>
                </a>
              </div>
              <span className="nav-toggle">
                          <span></span>
                          <span></span>
                          <span></span>
                    </span>
              <div className="nav-right nav-menu">
                <a className="nav-item is-tab is-active">Home</a>
                <a className="nav-item is-tab">Map</a>
                <a className="nav-item is-tab" ref={(upload) => this.uploadtab = upload} onClick={this.onUploaderClick}>Upload</a>
                <a className="nav-item is-tab">About</a>
                <span className="nav-item">
                          { isAuthenticated ?
                              <span>profile: Login as {username}</span> :
                              (<span><a className="button" onClick={() => hashHistory.push('/login')}>
                                  Log in
                              </a>
                              <a className="button is-info" onClick={() => hashHistory.push('/signup')}>
                                  Sign up
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
  const {userUploaders} = state.useractions;
  return {userUploaders}
}

function mapDispatchToProps(dispatch) {
  return {
    onUploadClick(uid) {
      dispatch(fetchuseruploadersrequest(
          uid
      ))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarComponent);

