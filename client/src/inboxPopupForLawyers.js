import React from 'react'
import {Button, Modal, Dropdown, Header, Icon, Label, Menu} from 'semantic-ui-react'


const number = 1; //the number in the inbox is here, pick number 0 and 1 will run different pop up page
const ModalExampleShorthand = () => number>0? ( //when number in the inbox is greater than 0

    <Modal trigger={<Button>Inbox
        <Label circular size="mini">
            {number}
        </Label>
    </Button>}>
        <Modal.Header>Inbox</Modal.Header>
        <div>
            <Header>Your client got the time confirmed!</Header>
            <p>
                Scheduled Date:
            </p>
            <p>Scheduled Time: 00:00</p>
            <p>Zoom Link: www.zoom.com/example</p>
        </div>
    </Modal>
):( //when number in the inbox is equal to 0

    <Modal trigger={<Button>Inbox
        <Label circular size="mini">
            {number}
        </Label>
    </Button>}>
        <Modal.Header>Inbox</Modal.Header>
    <p>You haven't scheduled a meeting with this client.</p>
    </Modal>
)





export default ModalExampleShorthand