import React, { useState } from 'react';
import { Button, Input, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import firebase from '../../firebase';
import FileModal from './fileModal';
const MessegesForm = ({ messagesRef }) => {

    const currentCannel = useSelector((state) => state.CurrentChannel.currentCannel);

    const user = useSelector((state) => state.auThentication.Authenticated);
    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState()
    const handelChange = (e) => { setMessage(e.target.value) }

    const sendMesseges = () => {
        const newMessage = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            content: message,

            User: {
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            }
        }
        if (message) {
            messagesRef
                .child(currentCannel.id)
                .push()
                .set(newMessage)
                .then(() => { console.log(11, "messge send succed"); setMessage("") })
        }
    }
    const openmodal = () => {
        setModal(true)
    }
    const Closemodal = () => {
        setModal(false)
    }

    return (
        <Segment className="message__form">
            <Input
                fluid
                size="mini"
                icon="search"
                style={{ marginBottom: '0.7em' }}
                name="messege"
                value={message}
                label={<Button icon={'add'} />}
                labelPosition="left"
                placeholder="Write your message"
                onChange={e => handelChange(e)} />
            <Button.Group icon widths="2">
                <Button color="orange" content="add reply" labelPosition="left"
                    icon="edit" onClick={e => sendMesseges()} />
                <Button color="teal" content="upload Media"
                    labelPosition="right" icon="cloud upload" onClick={e=>openmodal(e)} />
            </Button.Group>
            <FileModal modal={modal} closeModal={e=>Closemodal(e)} />
        </Segment>


    );
}

export default MessegesForm;