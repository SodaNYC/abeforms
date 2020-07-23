import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Card, Container, Image, Button, Icon } from "semantic-ui-react";
import abeLogo from "./abeLogo.png";
import styles from './landing.module.css';
import client from "./client.jpeg";
import lawyer from "./lawyer.jpeg";


let endpoint = "http://localhost:8080";

class LandingPage extends Component {
  render() {
    return (
        <Container>
          <img src={abeLogo} className="logo"></img>
          <div className="App">
            <h1>Welcome to Abe Legal</h1>

            <div className="ui centered card">
              <Card.Group>
                <Card>
                  <img src={lawyer}  wrapped ui={false}></img>
                  <Card.Content style={{
                    backgroundColor: "#efefef",
                  }}>
                    <Card.Header className={styles.font}>For Lawyers</Card.Header>
                    <Card.Meta>
                      <span className={styles.font}>Sign in to Pick Available Cases</span>
                    </Card.Meta>
                    <Card.Description>
                      <Button color='yellow' href="/lawyerdashboard/sign_in">
                        Enter
                      </Button>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user"  className={styles.font}/>
                      Current Users:
                    </a>
                  </Card.Content>
                </Card>
                <Card>
                  <img src={client}  wrapped ui={false}></img>
                  <Card.Content style={{
                    backgroundColor: "#efefef",
                  }}>
                    <Card.Header className={styles.font}>For Clients</Card.Header>
                    <Card.Meta>
                      <span className={styles.font}>Sign in to Check on Your Case</span>
                    </Card.Meta>
                    <Card.Description>
                      <Button color='yellow' href="/clientdashboard/sign_in" className={styles.font}>
                        Enter
                      </Button>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user" />
                      Current Users:
                    </a>
                  </Card.Content>
                </Card>
              </Card.Group>
            </div>
          </div>
        </Container>
    );
  }
}

export default LandingPage;
