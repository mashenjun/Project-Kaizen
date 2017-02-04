import React from 'react';
import {hashHistory} from 'react-router';

class AwesomeComponent extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div>
                <nav className="nav is-dark has-shadow" id="top">
                    <div className="container">
                        <div className="nav-left">
                            <a className="nav-item" href="../index.html">
                                <img src="./static/dist/images/bulma.png" alt="Description"/>
                            </a>
                        </div>
                        <span className="nav-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                          </span>
                        <div className="nav-right nav-menu is-hidden-tablet">
                            <a className="nav-item is-tab is-active">
                                Dashboard
                            </a>
                            <a className="nav-item is-tab">
                                Activity
                            </a>
                            <a className="nav-item is-tab">
                                Timeline
                            </a>
                            <a className="nav-item is-tab">
                                Folders
                            </a>
                        </div>
                    </div>
                </nav>
                <div className="section">
                        <div className="container">
                            <div className="title is-2">Overview</div>
                            <div className="nav menu">
                                <div className="container">
                                    <div className="nav-left">
                                        <a className="nav-item is-tab is-active"><span className="icon-btn"><i className="fa fa-plus"></i></span></a>
                                        <a className="nav-item is-tab">
                                          <span className="icon-btn">
                                            <i className="fa fa-print"></i>
                                          </span>
                                                                    </a>
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
                                            <strong>2 items selected</strong>
                                        </div>
                                    </div>
                                    <div className="nav-right is-hidden-mobile">
                                        <a className="nav-item is-tab">Name</a>
                                        <a className="nav-item is-tab">Size</a>
                                        <a className="nav-item is-tab">Views</a>
                                        <a className="nav-item"><span className=" button is-success">Uploaded</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column is-3">
                                    <div className="panel">1</div>
                                </div>
                                <div className="column is-3">
                                    <div className="panel">1</div>
                                </div>
                                <div className="column is-3">
                                    <div className="panel">1</div>
                                </div>
                                <div className="column is-3">
                                    <div className="panel">1</div>
                                </div>
                            </div>
                        </div>
                </div>
                <footer className="footer">
                    <div className="container">
                        <div className="has-text-centered">
                            <p>
                                <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code
                                is licensed
                                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

        );
    }

}

export default AwesomeComponent;