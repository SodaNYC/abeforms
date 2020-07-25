import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import {Button, Container, Form} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import abeLogo from "./abeLogo.png";
import styles from './LawyerSignIn.module.css';

let endpoint = "http://localhost:8080";

class LawyerSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailAddress: "",
      Password: "",
      redirect: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount(){
    document.title = "Abe Dashboard"
  }

  onPress = () => {
    const { EmailAddress, Password } = this.state;
    axios
        .post(
            endpoint + "/lawyerdashboard/api/signin",
            {
              EmailAddress: EmailAddress,
              Password: Password,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
        )
        .then((res) => {
          this.setState({
            redirect: true,
          })
        });
  };

  render() {
    const { EmailAddress, Password } = this.state;
    if (this.state.redirect) {
      return (
          <Redirect
              to={{
                pathname: "/lawyerprofile",
              }}
          />
      );
    }
    return (
        <Container>
          <div className="App">
            {/*<div className="container" id="registration-form">*/}
            {/*  <div className="image"></div>*/}
            <div className={styles.frm}>
                <img src={abeLogo} className={styles.logo}></img>
                <p className={styles.font}>Please log in to your Abe Legal account</p>
                <p className={styles.font}>to continue to Abe</p>
                <Form onSubmit={this.onPress}>
                  <div class="form-group">
                    {/*<h5>Email Address:</h5>*/}
                    <div className={styles.formControl}>
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Enter email address"
                          name="EmailAddress"
                          id="EmailAddress"
                          onChange={this.handleChange}
                          value={EmailAddress || ""}
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    {/*<h5>Password:</h5>*/}
                    <div className={styles.formControl}>
                      <input
                          type="password"
                          class="form-control"
                          placeholder="Enter password"
                          name="Password"
                          id="Password"
                          onChange={this.handleChange}
                          value={Password || ""}
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <Button color='yellow' size='large' className={styles.button}>Log in</Button>
                  </div>
                  <p className={styles.font}>
                    Don't have an account? Click{" "}
                    <a href="/lawyerdashboard/sign_up">here</a>
                  </p>
                </Form>
            {/*  </div>*/}
            </div>
          </div>
        </Container>
    );
  }
}

export default LawyerSignIn;
