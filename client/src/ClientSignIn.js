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
            <Container>
                <div className="App">
                        <div className={styles.frm}>
                            <img src={abeLogo} className={styles.logo}></img>
                            <p className={styles.font}>Please log in to your Abe Legal account</p>
                            <Form onSubmit={this.onPress}>
                                <div class="form-group">
                                    {/*<h5>Email Address:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            name="EmailAddress"
                                            id="EmailAddress"
                                            onChange={this.handleChange}
                                            value={EmailAddress || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    {/*<h5>Password:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="Password"
                                            id="Password"
                                            onChange={this.handleChange}
                                            value={Password || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <Button color='yellow' size='Huge' className={styles.button}>Login</Button>
                                </div>
                                <p className={styles.font}>
                                    Not an Abe Legal member?{" "}
                                    <a href="/clientdashboard/sign_up">Join now</a>
                                </p>
                            </Form>
                        </div>
                    </div>
            </Container>
        );
    }
}

export default ClientSignIn;