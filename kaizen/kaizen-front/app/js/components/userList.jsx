import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {uploaderPageNavigate} from '../actions/navigationAction';
import * as consts from '../constants/const';

class UserList extends React.Component {

    constructor(props) {
        super(props);
    }

    onPreClick = () => {
        if(this.props.currentPage >1 ){
            this.props.uploaderPageNavigate(this.props.currentPage-1);
        }
    };

    onNextClick = () => {
       const maxPage = Math.floor(this.props.totalCount/consts.PAGE_SIZE) + 1;
       if(this.props.currentPage < maxPage){
           this.props.uploaderPageNavigate(this.props.currentPage+1);
       }
    };

    render() {
        const maxPage = Math.floor(this.props.totalCount/consts.PAGE_SIZE) + 1;
        const pagi_list = [];
        for(let i=1;i<=maxPage;i++){
            pagi_list.push(<li key={i}><a onClick={()=>this.props.uploaderPageNavigate(i)} className={"pagination-link "+ (this.props.currentPage==i?"is-current":"")}>{i}</a></li>);
        }
        return (
            <div>
                <div className="section">
                    <div className="container">
                        <div className="title is-2">Overview</div>
                        <div className="nav menu">
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

                        <div className="columns is-multiline">
                            <div className="column is-3">
                                <div className="panel">1</div>
                            </div>
                            <div className="column is-3">
                                <div className="panel">2</div>
                            </div>
                            <div className="column is-3">
                                <div className="panel">3</div>
                            </div>
                            <div className="column is-3">
                                <div className="panel">4</div>
                            </div>
                            <div className="column is-3">
                                <div className="panel">5</div>
                            </div>
                            <div className="column is-3">
                                <div className="panel">6</div>
                            </div>
                            <div className="column is-3">
                                <div className="panel">7</div>
                            </div>
                            <div className="column is-3">
                                <div className="panel">8</div>
                            </div>
                        </div>
                        <div className="container">
                            <nav className="pagination is-centered">
                                <a ref={(previous) => {
                                    this.previous = previous;
                                }} onClick={this.onPreClick} className="pagination-previous">Previous</a>
                                <a ref={(nextPage) => {
                                    this.nextPage = nextPage;
                                }} onClick={this.onNextClick} className="pagination-next">Next page</a>
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
        totalCount,currentPage
    } =  state.uploaders;
    return {
        totalCount,
        currentPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploaderPageNavigate(page) {
            dispatch(uploaderPageNavigate(page));
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);