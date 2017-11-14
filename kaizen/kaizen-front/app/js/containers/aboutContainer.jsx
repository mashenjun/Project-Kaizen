import React, {Component} from "react";
import '../../less/aboutContainer.less';

class  aboutContainer extends Component{
    render(){
        return (
            <div className="aboutContainer">
                <div className="container">
                  <section className="hero is-medium">
                    <div className="hero-body">
                      <div className="container has-text-centered">
                        <h1 className="title">
                          关于我们
                        </h1>
                        <h2 className="subtitle">
                          网站初衷
                        </h2>
                        <p>
                           待定
                        </p>
                      </div>
                    </div>
                    <div className="hero-body">
                      <div className="container has-text-centered">
                        <h1 className="title">
                            网站工作人员
                        </h1>
                        <div>
                          <h2 className="subtitle">
                            发起人
                          </h2>
                          <div className="columns">
                            <div className="column">
                              <div className="profile">
                                <img className="img-circle" src="/static/images/admin0.png"></img>
                                <div>
                                  梁宇佳
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr/>
                        <div>
                          <h2 className="subtitle">
                            开发者
                          </h2>
                          <div className="columns">
                            <div className="column">
                              <div className="profile">
                                <img className="img-circle" src="/static/images/boy2.png"></img>
                                <div>
                                  Steven
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div className="profile">
                                <img className="img-circle" src="/static/images/boy1.png"></img>
                                <div>
                                  Shenjun
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr/>
                        <div>
                          <h2 className="subtitle">
                            支持者
                          </h2>
                          <div className="columns">
                            <div className="column">
                              <div className="profile">
                                <img className="img-circle" src="/static/images/admin1.png"></img>
                                <div>
                                  Zoe
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div className="profile">
                                <img className="img-circle" src="/static/images/admin2.png"></img>
                                <div>
                                  Stella
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div className="profile">
                                <img className="img-circle" src="/static/images/admin4.png"></img>
                                <div>
                                  Alex
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div className="profile">
                                <img className="img-circle" src="/static/images/admin3.png"></img>
                                <div>
                                  Green
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hero-body">
                      <div className="container has-text-centered">
                        <h1 className="title">
                          如何支持我们
                        </h1>
                        <div className="columns">
                          <div className="column">
                            微信
                            <div className="qr-wrapper">
                              <img className="image"  src="/static/images/qr.png" alt="Description"/>
                            </div>
                          </div>
                          <div className="column">
                            支付宝
                            <div className="qr-wrapper">
                              <img className="image" src="/static/images/qr.png" alt="Description"/>
                            </div>
                          </div>
                          <div className="column">
                            比特币
                            <div className="qr-wrapper">
                              <img  className="image" src="/static/images/qr.png" alt="Description"/>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </section>
                </div>
            </div>
        )
    }
}

export default aboutContainer;
