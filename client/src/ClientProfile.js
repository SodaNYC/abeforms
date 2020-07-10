import React, { Component } from "react";
import "./App.css";
import {Label, Menu, Card, Image, Icon, List, Container} from "semantic-ui-react";
import abeLogo from "./abeLogo.png";
import avatar from "./avatar.png"
import Inbox from "./inboxPopupForClients";

class ClientProfile extends Component{
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return(
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

                    <div class="ui centered cards">
                        <Card>
                            <Image src={avatar} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>First Name Last Name</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined since Month Date Year</span>
                                </Card.Meta>
                                <Card.Description>



                                    <List>

                                        <List.Item>
                                            <List.Icon name='phone' />
                                            <List.Content>cell phone number </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Icon name='marker' />
                                            <List.Content>Location of Legal Issue</List.Content>
                                        </List.Item>


                                        <List.Item>
                                            <List.Icon name='pencil alternate' />
                                            <List.Content>Description of Legal Issue</List.Content>
                                        </List.Item>


                                        <List.Item>
                                            <List.Icon name='file' />
                                            <List.Content>List of the docs I reference relate to my legal problems</List.Content>
                                        </List.Item>


                                        <List.Item>
                                            <List.Icon name='mail' />
                                            <List.Content>
                                                <a href='mailto:email@email.com'>email@email.com</a>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Icon name='linkify' />
                                            <List.Content>
                                                <a href='http://www.linkedin.com'>Social media</a>
                                            </List.Content>
                                        </List.Item>

                                    </List>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
            </Container>
        )

    }

}
export default ClientProfile;