import React, { Component } from "react";
import { Auth } from "aws-amplify";

function waitForInit() {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

export default class FacebookButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await waitForInit();
    this.setState({ isLoading: false });
  }

  statusChangeCallback = response => {
    if (response.status === "connected") {
        console.log(response);
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    window.FB.login(this.checkLoginState, {scope: "public_profile,email"});
  };

  handleError(error) {
    alert(error);
  }

  async handleResponse(data) {
    const { userID, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { userID };
    console.log(userID);
    console.log("data", data);
    this.setState({ isLoading: true });
    
    try {
      const response = await Auth.federatedSignIn(
        "facebook",
        { token, expires_at },
        user
      );
      this.setState({ isLoading: false });
      this.props.onLogin(response);
      console.log(response);
    } catch (e) {
      this.setState({ isLoading: false });
      this.handleError(e);
    }
  }

  render() {
    return (
      <button
        className="mt-4 w-full h-10 bg-blue-700 rounded text-white"
        onClick={this.handleClick}
        disabled={this.state.isLoading}
      >Login with Facebook</button>
    );
  }
}