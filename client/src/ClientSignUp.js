import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Container } from "semantic-ui-react";

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
                    <div className="container" id="registration-form">
                        <div className="image"></div>
                        <div className="frm">
                            <h1>Create your Abe Legal Account</h1>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <h5>First Name:</h5>
                                    <div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter first name"
                                            name="FirstName"
                                            id="firstName"
                                            onChange={this.handleChange}
                                            value={FirstName || ""}
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <h5>Last Name:</h5>
                                    <div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter last name"
                                            name="LastName"
                                            id="lastName"
                                            onChange={this.handleChange}
                                            value={LastName || ""}
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <h5>Email:</h5>
                                    <div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter email"
                                            name="EmailAddress"
                                            id="emailAddress"
                                            onChange={this.handleChange}
                                            value={EmailAddress || ""}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h5>Cell Phone Number:</h5>
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter cell phone number"
                                            name="CellPhoneNumber"
                                            id="CellPhoneNumber"
                                            onChange={this.handleChange}
                                            // value={CellPhoneNumber || ""}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h5>Office Phone Number:</h5>
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter office phone number"
                                            name="OfficePhoneNumber"
                                            id="OfficePhoneNumber"
                                            onChange={this.handleChange}
                                            // value={OfficePhoneNumber || ""}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h5>How Did You Hear About Us:</h5>
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="How Did You Hear About Us"
                                            name="HowHear"
                                            id="HowHear"
                                            onChange={this.handleChange}
                                            value={HowHear || ""}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h5>Headshot:</h5>
                                    <div>
                                        <input
                                            type="file" id="img" name="img" accept="image/*"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h5>Share your Social Media: (Instagram, Twitter, Linkdin, etc)</h5>
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your social media ID "
                                            name="SocialMedia"
                                            id="SocialMedia"
                                            onChange={this.handleChange}
                                            // value = {SocialMedia || ''}

                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <h5>Password: (Minimum 8 Characters)</h5>
                                    <div>
                                        <input
                                            type="password"
                                            class="form-control"
                                            name="Password"
                                            id="Password"
                                            onChange={this.handleChange}
                                            value={Password || ""}
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <h5>Retype Password: </h5>
                                    <div>
                                        <input
                                            type="password"
                                            class="form-control"
                                            name="RetypePassword"
                                            id="RetypePassword"
                                            onChange={this.handleChange}
                                            value={RetypePassword || ""}
                                        />
                                    </div>
                                </div>



                                <div class="form-group">
                                    <button class="btn btn-success btn-lg">
                                        Submit
                                    </button>
                                </div>
                                <p>
                                    Already have an account? Click{" "}
                                    <a href="/clientdashboard/sign_in">here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ClientSignUp;
