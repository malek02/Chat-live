import React, { useEffect, useState } from 'react';
import { Button, Input, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import firebase from '../../firebase';
import FileModal from './fileModal';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

const MessegesForm = ({ messagesRef }) => {

    const currentCannel = useSelector((state) => state.CurrentChannel.currentCannel);

    const user = useSelector((state) => state.auThentication.Authenticated);

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState();
    const [progres, setProgres] = useState();
    const [uploadSt,setUploadSt]=useState();
    const [uploadTask,setUploadTask]=useState(null);
    const [storegeref,setStoregeref]=useState(firebase.storage().ref())

    const handelChange = (e) => { setMessage(e.target.value) }

    const sendMesseges = (fileUrl=null) => {
       
            const newMessage = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
           

            User: {
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            }
        }
        
        if(fileUrl !==null){
            newMessage['image']=fileUrl

        }else{
            newMessage['content']=message
        }
      
            messagesRef
                .child(currentCannel.id)
                .push()
                .set(newMessage)
                .then(() => { console.log(11, "messge send succed"); setMessage("") })
        
    }
    const openmodal = () => {
        setModal(true)
    }
    const Closemodal = () => {
        setModal(false)
    }
    useEffect(()=>{
        
    
        if(uploadTask){
            uploadTask.on('state_changed', 
  data=> {
    
    const progress = Math.round((data.bytesTransferred / data.totalBytes)) * 100;
   setProgres(progress)},
   err=>{console.error(err)},
   ()=>{uploadTask.snapshot.ref.getDownloadURL().then(data=>{
    
    sendMesseges(data)
    setProgres(0)
})})

        }
        }
        
    ,[uploadTask])
    const  uploadFile=(file,medatata)=>{
const pathToupload= currentCannel.id
const ref=messagesRef
const filePath=`chat/public/${uuidv4()}.jpg`
setUploadTask((storegeref.child(filePath).put(file,medatata)))


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
            <FileModal uploadFile={e=>uploadFile(e)} modal={modal} closeModal={e=>Closemodal(e)} />
        </Segment>


    );
}

export default MessegesForm;