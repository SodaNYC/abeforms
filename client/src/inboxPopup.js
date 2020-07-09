import React from 'react'
import { Button, Modal, Dropdown,Header, Icon } from 'semantic-ui-react'

const friendOptions = [
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
    {
        key: 'Time4',
        text: 'Time4',
        value: 'Time4',
    },
]

const ModalExampleShorthand = () => (
    <Modal trigger={<Button>Inbox</Button>}>
        <Modal.Header>Inbox</Modal.Header>
            <Modal.Description>
                <Header>Pick the time works for you the best</Header>
                <p></p>
                <Icon name='calendar' />Available Date:
            </Modal.Description>
        <p></p>
    <span>
    <Icon name='clock' /> Available Time: {' '}
        <Dropdown
            inline
            options={friendOptions}
            defaultValue={friendOptions[0].value}
        />
    </span>
        <p></p>
        <Button>Submit</Button>
    </Modal>
)



export default ModalExampleShorthand