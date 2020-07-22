import React, { Component } from "react";
import axios from "axios";
import NestedModal from "./NestedModal.js";
import Inbox from "./inboxPopupForLawyers"
import abeLogo from "./abeLogo.png";
import "./App.css";
import {
  Card,
  Container,
  Image,
  Button,
  Modal,
  Menu,
  Segment,
  Label,
  Header,
  ModalActions,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
let endpoint = "http://localhost:8080";
var userEmail;
var clientEmail;
class LawyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      case: "",
      open_items: [],
      my_items: [],
      redirect: "",
      lawyerEmail: "",
      selectedTime: "2020-06-24T22:00:00Z",
      clientEmail: "",
    };
  }
  componentDidMount() {
    this.getOpenCase();
    this.getMyCase();
  }

  scheduleMeeting = () => {
    //TODO: This part, Posting info
    const { selectedTime } = this.state;
    axios
      .post(
        endpoint + "/lawyerdashboard/api/schedulemeeting",
        {
          userEmail: userEmail,
          selectedTime: selectedTime,
          clientEmail: clientEmail,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((data) => {
        console.log(userEmail);
        console.log(selectedTime);
        console.log(clientEmail);
      });
  };

  getOpenCase = () => {
    console.log("Here");
    console.log(this.state);
    axios
      .get(endpoint + "/lawyerdashboard/api/opencases", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log("setting open cases info");
          this.setState({
            open_items: res.data.map((item) => {
              return (
                <Card>
                  <Card.Content>
                    <Image
                      floated="right"
                      size="mini"
                      src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                    />
                    <Card.Header>
                      {item.firstname + " " + item.lastname}
                    </Card.Header>
                    <Card.Meta>{item.stateofissue}</Card.Meta>
                    <Card.Description>{item.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Modal
                      trigger={
                        <Button basic color="green" content="Green">
                          Details
                        </Button>
                      }
                    >
                      <Modal.Header>Some Details Go here</Modal.Header>
                      <Modal.Content image>
                        <Image
                          wrapped
                          size="medium"
                          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                        />
                        <Modal.Description>
                          <Header>Client Details</Header>
                          <p>
                            Name: {item.firstname} {item.lastname}
                            <br></br>
                            Description: {item.description} <br></br>
                            Location: {item.stateofissue} <br></br>
                            Available Times: Times go here...
                          </p>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button basic color="red">
                          Close
                        </Button>
                        <Modal
                          trigger={
                            <Button basic color="green">
                              Accept
                            </Button>
                          }
                          basic
                          size="small"
                        >
                          <Header
                            icon="archive"
                            content="Archive Old Messages"
                          />
                          <Modal.Content>
                            <p>
                              By accepting this, you agree to the terms and
                              conditions.
                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              basic
                              color="green"
                              onClick={() => this.caseComplete(item._id)}
                            >
                              Accept
                            </Button>
                            <Button basic color="red">
                              Decline
                            </Button>
                          </Modal.Actions>
                        </Modal>
                      </Modal.Actions>
                    </Modal>
                  </Card.Content>
                </Card>
              );
            }),
          });
          console.log(this.setState);
        } else {
          this.setState({
            open_items: [],
          });
        }
      });
  };
  caseComplete = (id) => {
    axios
      .post(endpoint + "/lawyerdashboard/api/takecase/" + id, id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        this.getMyCase();
        this.getOpenCase();
      });
  };
  getMyCase = () => {
    axios.get(endpoint + "/lawyerdashboard/api/mycases").then((res) => {
      if (res.data) {
        console.log("setting my cases info");
        this.setState({
          my_items: res.data.map((item) => {
            console.log(item);
            return (
              <Card>
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                  />
                  <Card.Header>
                    {item.firstname + " " + item.lastname}
                  </Card.Header>
                  <Card.Meta>{item.stateofissue}</Card.Meta>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui buttons">
                    <Modal
                      trigger={
                        <Button basic color="violet" content="Violet">
                          Details
                        </Button>
                      }
                    >
                      <Modal.Header>Some Details Go here</Modal.Header>
                      <Modal.Content image>
                        <Image
                          wrapped
                          size="medium"
                          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                        />
                        <Modal.Description>
                          <Header>Client Details</Header>
                          Name: {item.firstname} {item.lastname}
                          <br></br>
                          Description: {item.description} <br></br>
                          Location: {item.stateofissue} <br></br>
                          Available Times: Times go here...
                        </Modal.Description>
                      </Modal.Content>
                      <ModalActions>

                        <NestedModal />

                      </ModalActions>
                    </Modal>
                  </div>
                </Card.Content>
              </Card>
            );
          }),
        });
        console.log(this.setState);
      } else {
        this.setState({
          my_items: [],
        });
      }
    });
  };

  // this.setState({userEmail: this.props.location.state.email})
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;
    try {
      const { lawyerEmail, selectedTime, clientEmail } = this.state;
      console.log("HERE");
      console.log(this.state);
    } catch (e) {
      return <Redirect to={"/lawyerdashboard/sign_in"} />; //Check if user is authenticated
    }

    return (
      <Container>
        <div className="App">

          <Menu pointing secondary>
            <img src={abeLogo} className="logo"></img>
            <Menu.Item
              name="dashboard"
              active={activeItem === "dashboard"}
              onClick={this.handleItemClick}
              href='/lawyerdashboard'
            />
            <Menu.Item
              name="profile"
              active={activeItem === "profile"}
              onClick={this.handleItemClick}
              href='/lawyerprofile'
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


          <Header as="h1">Available Cases</Header>
          <div className="row">
            <Card.Group>{this.state.open_items}</Card.Group>
          </div>

          <Header as="h1">My Cases</Header>
          <div className="row">
            <Card.Group>{this.state.my_items}</Card.Group>
          </div>
        </div>
      </Container>
    );
  }
}
export default LawyerDashboard;
