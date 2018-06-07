// function mapStateToProps(state) {
//     // console.log(state)
//     // this state is the redux store state
//     return {
//         user: state.user
//     }
// }

// export default connect(mapStateToProps, { getUser })(Private)
// // connect wraps getUser in a dispatch call and merges it with this.props and then it connects state properly

import React, { Component } from "react";
import { getUser } from "./../../ducks/user";
import { connect } from "react-redux";

class Private extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  bankBalance() {
    return "$" + Math.floor((Math.random() + 1) * 1000) + ".00";
  }

  render() {
    let { user_name, picture, auth_id } = this.props.user;
    return (
      <div>
        <h2>Account Information:</h2>
        <hr />
        {user_name ? (
          <div>
            <img src={picture} alt="" />
            <p>Account Name: {user_name}</p>
            <p>Account Number: {auth_id}</p>
            <p>Balance: {this.bankBalance()}</p>
          </div>
        ) : (
          <p>Please login</p>
        )}
        <a href="http://localhost:3005/auth/logout">
          <button type="" className="">
            logout
          </button>
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUser })(Private);

