import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Container, Button, Form } from "semantic-ui-react";
import abeLogo from "./abeLogo.png";
import styles from "./ClientSignUp.module.css";

let endpoint = "http://localhost:8080";

class ClientSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: "",
            LastName: "",
            PhoneNumber: "",
            EmailAddress: "",
            Password: "",
            RetypePassword: "",
            HowHear: "",
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
      
    onSubmit = () => {
        const {
            FirstName,
            LastName,
            PhoneNumber,
            EmailAddress,
            Password,
            RetypePassword,
            HowHear,
        } = this.state;
        var val = true;
        var err = [];
        // check if email is in the correct format
        if(!this.state.EmailAddress.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
            val = false;
            err.push(["Invalid Email Format. The correct format is 'example@example.com'"]);
        }
        // check if first name is in the correct format
        if(!this.state.FirstName.match(/^[a-zA-Z]+[a-zA-Z-']*$/)){
            val = false;
            err.push(["\nInvalid First Name Format. Can only use letters, apostraphes and hyphens"]);
        }
        // check if last name is in the correct format
        if(!this.state.LastName.match(/^[a-zA-Z]+[a-zA-Z-']*$/)){
            val = false;
            err.push(["\nInvalid Last Name Format. Can only use letters, apostraphes and hyphens"]);
        }
        // check if phone number is in the correct format

        // check if password is in the correct format
        if(!this.state.Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
            val = false;
            err.push(["\nInvalid Password. The password should have atleast 1 Upper Case, 1 Lower Case, 1 special character. It should be atleast 8 characters long"]);
        }
        // check if retype password is in the correct format
        if(!this.state.RetypePassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
            if(this.state.RetypePassword != this.state.Password){
                val = false;
                err.push(["\nRetype Password is not the same as Password"]);
            }
        }
        // check if How Hear is in the correct format
        if(!this.state.HowHear.match(/^[a-zA-Z]+[a-zA-Z-']*$/)){
            val = false;
            err.push(["\nInvalid input Format for Referral. Can only use letters, apostraphes and hyphens"]);
        }

            axios
                .post(
                    endpoint + "/clientdashboard/api/signup",
                    {
                        FirstName: FirstName,
                        LastName: LastName,
                        PhoneNumber: PhoneNumber,
                        EmailAddress: EmailAddress,
                        Password: Password,
                        RetypePassword: RetypePassword,
                        HowHear: HowHear,
                    },
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                )
                .then((res) => console.log(FirstName));
    };

    render() {
        const {
            FirstName,
            LastName,
            PhoneNumber,
            EmailAddress,
            Password,
            RetypePassword,
            HowHear,
        } = this.state;
        return (
            <Container>
                <div className="App">
                        <div className={styles.frm}>
                            <img src={abeLogo} className={styles.logo}></img>
                            <p className={styles.font}>Please Sign Up to Your Abe Legal account</p>
                            <Form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    {/*<h5>First Name:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            name="FirstName"
                                            id="firstName"
                                            onChange={this.handleChange}
                                            value={FirstName || ""}
                                            required
                                        />
                                    </div>
                                </div>


                                <div class="form-group">
                                  {/*  <h5>Last Name:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            name="LastName"
                                            id="lastName"
                                            onChange={this.handleChange}
                                            value={LastName || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    {/*<h5>Email:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            name="EmailAddress"
                                            id="emailAddress"
                                            onChange={this.handleChange}
                                            value={EmailAddress || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/*<h5>Cell Phone Number:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="text"
                                            placeholder="Cell Phone Number"
                                            name="CellPhoneNumber"
                                            id="CellPhoneNumber"
                                            onChange={this.handleChange}
                                            // value={CellPhoneNumber || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/*<h5>Office Phone Number:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="text"
                                            placeholder="Office Phone Number"
                                            name="OfficePhoneNumber"
                                            id="OfficePhoneNumber"
                                            onChange={this.handleChange}
                                            // value={OfficePhoneNumber || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/*<h5>How Did You Hear About Us:</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="text"
                                            placeholder="How Did You Hear about Us"
                                            name="HowHear"
                                            id="HowHear"
                                            onChange={this.handleChange}
                                            value={HowHear || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className={styles.formControl}>
                                    <p className={styles.fonts}>Headshot:</p>
                                        <input
                                            type="file" id="img" name="img" accept="image/*"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/*<h5>Share your Social Media: (Instagram, Twitter, Linkdin, etc)</h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="text"
                                            placeholder="Social Media"
                                            name="SocialMedia"
                                            id="SocialMedia"
                                            onChange={this.handleChange}
                                            required
                                            // value = {SocialMedia || ''}

                                        />
                                    </div>
                                </div>

                                <div class="form-group">

                                    <div className={styles.formControl}>
                                        <p className={styles.fonts}>Password (Minimum 8 Characters, 1 letter, 1 number, 1 special character):</p>
                                        <input
                                            type="password"
                                            name="Password"
                                            id="Password"
                                            placeholder='Password'
                                            onChange={this.handleChange}
                                            value={Password || ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    {/*<h5>Retype Password: </h5>*/}
                                    <div className={styles.formControl}>
                                        <input
                                            type="password"
                                            name="RetypePassword"
                                            id="RetypePassword"
                                            placeholder='Retype the password'
                                            onChange={this.handleChange}
                                            value={RetypePassword || ""}
                                            required
                                        />
                                    </div>
                                </div>



                                <div class="form-group">
                                    <Button color='yellow' size='Huge' className={styles.button}>Log in</Button>
                                </div>
                                <p className={styles.font}>
                                    Already a member? {" "}
                                    <a href="/clientdashboard/sign_in">Click here to log in</a>
                                </p>
                            </Form>
                        </div>

                    </div>
            </Container>
        );
    }
}

export default ClientSignUp;
