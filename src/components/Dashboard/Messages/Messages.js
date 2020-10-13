import React, { useState, useEffect } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeadr';
import MessegesForm from './MessageForm';
import firebase from '../../firebase'
import CallMessage from './Message'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentMessage } from '../../actions/action-currentChannel'
const Messages = () => {
 
  const dispatch = useDispatch()
  const currentCannel = useSelector((state) => state.CurrentChannel.currentCannel);
  const [loding, setLoding] = useState(false)
  const [allchannels, setAllchannels] = useState([])
  useEffect(() => {
    getmessage();setLoding(false)
  }, [currentCannel,loding])
  const getmessage = () => {
    let loadchannels = []
    if (currentCannel) {
      useref.child(currentCannel.id).on('child_added', data => {
        
        loadchannels.push(data.val());
        
        setAllchannels(loadchannels);setLoding(true)
       console.log(11,allchannels)
      })
    }
  }
 
  

  const [useref, setUseref] = useState(firebase.database().ref('messages'))

 const displayMessage=x=>{
return(
  x  &&  x.map(message => <CallMessage messages={message}  />))
}


  return (
 <React.Fragment >


           <MessagesHeader />


<Segment >
     <Comment.Group className="messages">

     {displayMessage(allchannels)}
            


    </Comment.Group>
 </Segment>


            <MessegesForm messages={allchannels} messagesRef={useref} />


 </React.Fragment>
  );
}

export default Messages;