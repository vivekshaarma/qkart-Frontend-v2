import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

/**
 * @class Login component handles the Login page UI and functionality
 *
 * Contains the following fields
 *
 * @property {boolean} state.loading
 *    Indicates background action pending completion. When true, further UI actions might be blocked
 * @property {string} state.username 
 *    User given field for username
 * @property {string} state.password 
 *    User given field for password
 */
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: "",
      password: "",
    };
  }

  validateInput = () => {
    // CRIO_SOLUTION_START_MODULE_LOGIN
    if (!this.state.username) {
      message.error("Username is a required field");
      return false;
    }
    if (!this.state.password) {
      message.error("Password is a required field");
      return false;
    }
    return true;
    // CRIO_SOLUTION_END_MODULE_LOGIN
  };
  // TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement the login() function to display a message, "Login logic not implemented yet"
  /**
   * Definition for login handler
   * This is the function that is called when the user clicks on the login button or submits the login form
   *    - Display a message, "Login logic not implemented yet"
   */
  validateResponse = (errored, response) => {
    // CRIO_SOLUTION_START_MODULE_LOGIN
    if (errored || (!response.success && !response.message)) {
      message.error(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }
    if (!response.success) {
      message.error(response.message);
      return false;
    }
    return true;
    // CRIO_SOLUTION_END_MODULE_LOGIN
  };

  performAPICall = async () => {
    // CRIO_SOLUTION_START_MODULE_LOGIN
    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try {
      response = await (
        await fetch(`${config.endpoint}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        })
      ).json();
    } catch (e) {
      errored = true;
    }
    this.setState({
      loading: false,
    });
    if (this.validateResponse(errored, response)) {
      return response;
    }
    // CRIO_SOLUTION_END_MODULE_LOGIN
  };

  persistLogin = (token, username, balance) => {
    // CRIO_SOLUTION_START_MODULE_LOGIN
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
    // CRIO_SOLUTION_END_MODULE_LOGIN
  };

  login = async () => {

    if (this.validateInput()) {
      const response = await this.performAPICall();
      if (response) {
        this.persistLogin(response.token, response.username, response.balance);
        this.setState({
          username: "",
          password: "",
        });
        message.success("Logged in successfully");
        this.props.history.push("/products");
      }
    }
  };

  /**
   * JSX and HTML goes here
   * We have a text field and a password field (each with data binding to state), and a submit button that calls login()
   */
  render() {
    return (
      <>
        {/* Display Header */}
        <Header history={this.props.history} />

        {/* Display Login fields */}
        <div className="flex-container">
          <div className="login-container container">
            <h1>Login to QKart</h1>

            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />

            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.login}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Display the footer */}
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(Login);