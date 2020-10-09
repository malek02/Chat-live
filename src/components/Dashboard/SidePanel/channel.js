import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Icon, Modal, Form, Button, Input } from 'semantic-ui-react'
import firebase from '../../firebase';
import { setCurrentchannel } from '../../actions/action-currentChannel'

const Channel = () => {
    const user = useSelector((state) => state.auThentication.Authenticated);
    const [modal, setModal] = useState(false);
    const [textchanel, setTextchanel] = useState({ channelName: '', channelDetails: '' })
    const [uref, setUref] = useState(firebase.database().ref('Channels'))
    const [allchannels, setAllchannels] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        addListenners()
        return ()=>{

            removeListeners() }
    }, [])


    const displayChannel = (x) => {

        return (
            x.length > 0 && x.map(channel => (
                <Menu.Item key={channel.id}
                    name={channel.name}
                    style={{ opacity: 0.7 }}
                    onClick={e => dispatch(setCurrentchannel(channel))}
                >
                    #{channel.name}
                </Menu.Item>
            ))
        )
    }
    useEffect(
        () => {
          
            firstChannel()
          
        },
        [allchannels]
      );
    const addListenners = () => {
        let loadchannels = []
        uref.on('child_added', data => {
            loadchannels.push(data.val()); setTextchanel({ channelName: '', channelDetails: '' });

            setAllchannels(loadchannels);
           
        })
    }

    const firstChannel = () => {
        const firstOne =allchannels[0] 
        console.log(8, allchannels)
        console.log(7, firstOne)
        if (allchannels.length>0) {
            
            dispatch(setCurrentchannel(firstOne))

        }
    }

    const openmodal = () => {
        setModal(true)
    }
    const Closemodal = () => {
        setModal(false)
    }
    const handelChange = (e) => {
        const { value, name } = e.target
        setTextchanel({ ...textchanel, [name]: value })
        console.log(1111111, textchanel)
    }
    const { channelName, channelDetails } = textchanel
    const removeListeners = () => {
        uref.off();
      };
    const handelSubmit = (e) => {
        e.preventDefault()

        let key = uref.push().key

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        uref.child(key)
            .update(newChannel)
            .then(() => {
                console.log('channel add');
                setTextchanel({ channelName: '', channelDetails: '' });
                Closemodal()
            })



    }





    return (
        <>

            <Menu.Menu style={{ paddingBottom: '1em' }} >
                <Menu.Item>

                    <span >
                        <Icon name="exchange" />CHANNELS    </span>
        (  {allchannels.length}   )<Icon name='add' onClick={e => openmodal()} />
                </Menu.Item>
                {displayChannel(allchannels)}

            </Menu.Menu>
            <Modal basic open={modal} onClose={(e) => Closemodal(e)} >
                <Modal.Header>add a Channel</Modal.Header>
                <Modal.Content>
                    <Form style={{ maxWidth: '600px' }} onSubmit={e => handelSubmit(e)}>
                        <Form.Field>
                            <Input fluid label="Name of channel"
                                name="channelName"
                                value={channelName}
                                onChange={e => handelChange(e)} />
                            <Input fluid label="About the channel"
                                name="channelDetails"
                                value={channelDetails}
                                onChange={e => handelChange(e)} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={e => handelSubmit(e)} >
                        <Icon name="checkmark" />ADD
        </Button>
                    <Button color="red" inverted onClick={(e) => Closemodal(e)} >
                        <Icon name="remove" />Cancel
        </Button>
                </Modal.Actions>
            </Modal>

        </>

    )



}
export default Channel;