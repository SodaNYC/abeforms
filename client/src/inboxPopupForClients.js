import React from 'react'
import {Button, Modal, Dropdown, Header, Icon, Label, Menu} from 'semantic-ui-react'



const timeOptions = [
    {
        key: 'Time1',
        text: 'Time1',
        value: 'Time1',
    },
    {
        key: 'Time2',
        text: 'Time2',
        value: 'Time2',
    },
    {
        key: 'Time3',
        text: 'Time3',
        value: 'Time3',
    },
]
const number = 1; //the number in the inbox is here
const ModalExampleShorthand = () => number>0? ( //when number in the inbox is greater than 0

    <Modal trigger={<Button>Inbox
            <Label circular size="mini">
                {number}
            </Label>
    </Button>}>
        <Modal.Header>Inbox</Modal.Header>
            <Modal.Description>
                <Header>You got a meeting time confirmation message!</Header>
                <p></p>
                <h3>Pick the time works for you the best</h3>
                <p></p>
                <Icon name='calendar' />Available Date:
            </Modal.Description>
        <p></p>
    <span>
    <Icon name='clock' /> Available Time: {' '}
        <Dropdown
            inline
            options={timeOptions}
            defaultValue={timeOptions[0].value}
        />
    </span>
        <p></p>
        <Button>Submit</Button>
    </Modal>
):( //when number in the inbox is equal to 0
    <Modal trigger={<Button>Inbox
    <Label circular size="mini">
        {number}
    </Label>
</Button>}>
    <Modal.Header>Inbox</Modal.Header>
    <Modal.Description>
        <Header>You have no new message!</Header>
        <p></p>

    </Modal.Description>
</Modal>)





export default ModalExampleShorthand