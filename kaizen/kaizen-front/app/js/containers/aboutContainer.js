import React, {Component} from "react";
import Footer from '../components/footer'
import {connect} from 'react-redux'

class  aboutContainer extends Component{
    render(){
        return (
            <div>
                <div className="container">
                    about page
                </div>
                <Footer/>
            </div>
        )
    }
}

export default aboutContainer;
