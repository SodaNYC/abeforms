import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import abeLogo from "./abeLogo.png";
import {Container, Menu} from "semantic-ui-react";
import Inbox from "./inboxPopupForClients";


let endpoint = "http://localhost:8080";

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      EmailAddress: "",
      Description: "",
      StateOfIssue: "",
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
      Description,
      StateOfIssue,
      FindHow,
      SocialMedia,
    } = this.state;
    axios
      .post(
        endpoint + "/client/api/client",
        {
          FirstName: FirstName,
          LastName: LastName,
          PhoneNumber: PhoneNumber,
          EmailAddress: EmailAddress,
          Description: Description,
          StateOfIssue: StateOfIssue,
          findHow: FindHow,
          socialMedia: SocialMedia,
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
    const { activeItem } = this.state
    const {
      FirstName,
      LastName,
      PhoneNumber,
      EmailAddress,
      Description,
      StateOfIssue,
      FindHow,
      SocialMedia,
    } = this.state;
    return (
    <Container>
      <div>

        <Menu pointing secondary>
          <img src={abeLogo} className="logo"></img>
          <Menu.Item
              name="dashboard"
              active={activeItem === "dashboard"}
              onClick={this.handleItemClick}
              href='/clientdashboard'
          />
          <Menu.Item
              name="profile"
              active={activeItem === "profile"}
              onClick={this.handleItemClick}
              href='/ClientProfile'
          />

          <Menu.Item
              name="caseForm"
              active={activeItem === "caseForm"}
              onClick={this.handleItemClick}
              href='/client'
          />

          <Inbox />

          <Menu.Menu position="right">
            <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={this.handleItemClick}
                href='/'
            />
          </Menu.Menu>
        </Menu>
        <div className="App">
          <div className="container" id="registration-form">
            <div className="image"></div>

            <div className="frm">
              <h1>Case Form</h1>
              <form className="containerWithoutTitle" onSubmit={this.onSubmit}>
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

                <div class="form-group">
                  <h5>Location of Legal Issue:</h5>
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter location of legal issue"
                      name="StateOfIssue"
                      id="locationOfLegalIssue"
                      onChange={this.handleChange}
                      value={StateOfIssue || ""}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <h5>Description:</h5>
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter description of legal issue"
                      name="Description"
                      id="Description"
                      onChange={this.handleChange}
                      value={Description || ""}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <h5>Doc:</h5>
                  <div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="List the name of any doc you reference relate to your legal problem"
                        name="Doc"
                        id="Doc"
                        onChange={this.handleChange}
                        // value={Doc || ""}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <h5>How did you find Abe Legal?</h5>
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter the way you find Abe Legal"
                      name="FindHow"
                      id="FindHow"
                      onChange={this.handleChange}
                      value={FindHow || ""}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <h5>Share your Social Media: (Instagram, Twitter, Linkedin etc)</h5>
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your social media ID "
                      name="SocialMedia"
                      id="SocialMedia"
                      onChange={this.handleChange}
                      value={SocialMedia || ""}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn-success btn-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
    );
  }
}

export default Clients;
