import React, {Component} from "react";

class NavbarComponent extends Component {
    render() {
        return (
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
                        <a className="nav-item is-tab">Upload</a>
                        <a className="nav-item is-tab">About</a>
                        <span className="nav-item">
                            <a className="button">
                                Log in
                            </a>
                            <a className="button is-info">
                                Sign up
                            </a>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}


export default NavbarComponent;

