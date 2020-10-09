import React,{useState,useEffect} from 'react';
import { Segment,Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeadr';
import MessegesForm from './MessageForm';
import firebase from '../../firebase'
import CallMessage from './Message'
import {useSelector,useDispatch}from 'react-redux';
import {setCurrentMessage} from '../../actions/action-currentChannel'
const Messages=()=> {

  const dispatch = useDispatch()
  const  currentCannel = useSelector((state) => state.CurrentChannel.currentCannel);
  const [loding,setLoding]=useState(false)
  console.log(888888888888,currentCannel)
  useEffect(()=>{
      getmessage();
    },[currentCannel,loding])
  const getmessage=()=>{
    let loadchannels = []
    if(currentCannel){
    useref.child(currentCannel.id).on('child_added', data => {console.log(9777,data.val())
            loadchannels.push(data.val());
            console.log(5,loadchannels)
            setAllmessage(loadchannels);setLoding(true);dispatch(setCurrentMessage(loadchannels))
           console.log(9999,allmessage)
        })}
  }
  const  currentMessege = useSelector((state) => state.CurrentChannel.currentMessege);
  const [allmessage,setAllmessage]=useState([])
  
  const [ useref,setUseref]=useState(firebase.database().ref('messages'))
  

 
  
  return (
    <React.Fragment >
    <MessagesHeader />
     <Segment >
         <Comment.Group className="messages">
                                            
        { currentMessege ? currentMessege.map(message=>(<CallMessage messages={message} key={message.id} />)):""}
         </Comment.Group>
         </Segment>   
         <MessegesForm  messages={allmessage} messagesRef={useref}/> 
    </React.Fragment>
  );
}

export default Messages;