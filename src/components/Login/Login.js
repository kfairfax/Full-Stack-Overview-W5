import React, { Component } from 'react';
import logo from './communityBank.svg'
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className='App'>

                <img src={logo} alt="" />
                {/* <a href='https://www.espn.com' this changes directions and takes the user to another site or target='_blank' takes them to a blank page i think> */}
                <a href={process.env.REACT_APP_LOGIN} target='_blank'> 
                    <button>Login</button>
                </a>
            </div>
        )
    }
}