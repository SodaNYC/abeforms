import React, { Component } from "react";
import "./App.css";
import { Button, Modal, Form, Icon, Header } from "semantic-ui-react";
import DayPicker from "react-day-picker";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import axios from "axios";

// Or import the input component
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";

let endpoint = "http://localhost:8080";

class NestedModal extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      SelectedDay: undefined,
      FirstTime: "",
      SecondTime: "",
      ThirdTime: "",
    };
  }

  firstTimeChange = time => {
    console.log(time)
    this.setState({FirstTime: time})
  }
  secondTimeChange = time => {
    console.log(time)
    this.setState({SecondTime: time})
  }
  thirdTimeChange = time => {
    console.log(time)
    this.setState({ThirdTime: time})
  }

  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => {
    console.log(this.state)
    this.setState({ open: false });
    const { SelectedDay, FirstTime, SecondTime, ThirdTime } = this.state;
    axios
        .post(
            endpoint + "/lawyerdashboard/api/schedulemeeting",
            {
              SelectedDay: SelectedDay,
              FirstTime: FirstTime,
              SecondTime: SecondTime,
              ThirdTime: ThirdTime,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
        )
        .then((res) => {
          console.log(res.data)
        });
  }

  handleDayClick(day, { selected }) {
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day });
    console.log(this.state)
  }

 

  render() {
    const { open, firstTime, secondTime, thirdTime } = this.state;

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button primary icon>
            Schedule a Zoom meeting <Icon name="right chevron" />
          </Button>
        }
      >
        <Modal.Header>Schedule a Zoom Meeting with your Client</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Preferred Date</label>
              <DayPicker
                className="preferredDate"
                disabledDays={{ daysOfWeek: [0, 6] }}
                onDayClick={this.handleDayClick}
                selectedDays={this.state.selectedDay}
              />
              {this.state.selectedDay ? (
                <p>
                  You selected {this.state.selectedDay.toLocaleDateString()}
                </p>
              ) : (
                <p>Please select a day.</p>
              )}
              
            </Form.Field>
            <Form.Field
            >
              <label>Preferred Time (First Choice)</label>
              <TimePicker
                className="firstTime"
                use12Hours
                minuteStep={15}
                format="h:mm a"
                value ={firstTime}
                name = "firstTime"
                onChange = {this.firstTimeChange}
                
                style={{ width: 140 }}
              />
              
            </Form.Field>
            <Form.Field
            name = "secondTime"
            onChange = {this.handleChange}>
              <label>Preferred Time (Second Choice)</label>
              <TimePicker
                className="firstTime"
                use12Hours
                minuteStep={15}
                format="h:mm a"
                style={{ width: 140 }}
                value ={secondTime}
                name = "secondTime"
                onChange = {this.secondTimeChange}
               
                
              />
              
            </Form.Field>
            <Form.Field
            name = "thirdTime"
            onChange = {this.handleChange}>
              <label>Preferred Time (Third Choice)</label>
              <TimePicker
                className="firstTime"
                use12Hours
                minuteStep={15}
                format="h:mm a"
                style={{ width: 140 }}
                value ={thirdTime}
                name = "thirdTime"
                onChange = {this.thirdTimeChange}
                
                
              />
            </Form.Field>
            <Form.Field>
              <Header as="h4">What to Expect for your Consultation</Header>
              <ul>
                <li>
                  You will be able to speak with your client through Zoom for
                  30-60 minutes
                </li>

                <li>
                  There will be a 5-minute period at the end of the consultation
                  for your client to ask questions
                </li>
                <li>
                  The consultation will be recorded for your client's future
                  reference
                </li>
              </ul>
            </Form.Field>

            <Form.Field>
              <Button
                floated="right"
                color="blue"
                type="submit"
                icon="check"
                content="Submit"
                onClick={this.close}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default NestedModal;
