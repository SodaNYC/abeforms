import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Container, Form, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import abeLogo from "./abeLogo.png";
import styles from './ClientSignIn.module.css';

let endpoint = "http://localhost:8080";

class ClientSignIn extends Component {
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
                endpoint + "/clientdashboard/api/signin",
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
                        pathname: "/ClientProfile",
                    }}
                />
            );
        }
        return (
            <div className={styles.wholeBox}>
            <Container>
                <div className="App">
                    <div className="container" id="registration-form">
                        <div className="frm">
                            <img src={abeLogo} className={styles.logo}></img>

                            <p>Please log in to your Abe Legal account</p>
                            <Form onSubmit={this.onPress}>
                                <div class="form-group">
                                    {/*<h5>Email Address:</h5>*/}
                                    <div>
                                        <input
                                            type="text"
                                            className={styles.formControl}
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
                                    <div>
                                        <input
                                            type="password"
                                            className={styles.formControl}
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
                                <p>
                                    Not an Abe Legal member?{" "}
                                    <a href="/clientdashboard/sign_up">join now</a>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
            </div>
        );
    }
}

export default ClientSignIn;