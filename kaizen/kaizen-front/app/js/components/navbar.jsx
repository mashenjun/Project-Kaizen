import React, {Component} from "react";

class NavbarComponent extends Component {
    render() {
        return (
            <nav className="nav is-dark has-shadow" id="top">
                <div className="container">
                    <div className="nav-left">
                        <a className="nav-item" href="../index.html">
                            <img src="/static/images/bulma.png" alt="Description"/>
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
        )
    }
}


export default NavbarComponent;

