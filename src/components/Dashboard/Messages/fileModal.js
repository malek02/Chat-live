
import React, { useState } from 'react'
import {Modal , Button, Form, Icon,Input} from 'semantic-ui-react'
import mime from 'mime'

const FileModal=({modal,closeModal})=>{
const [file,setFile]=useState(null);
const [authorized,setAuthorized]=useState(["image/jpg","image/png"])
console.log(6,modal)
const isAuthorize=(x)=>{
    authorized.includes(mime.lookup(x))
}
   
    const addFile=(e)=>{
        const file=e.target.files[0]
    if(file){setFile(file)}
    }
    const sendFile=()=>{
       
        if(file !==null){
      if(isAuthorize(file.name)){
          const medatata ={contetntType:mime.lookup(file.name)};
          uploadFile()
      }
    }
const  uploadFile=(file,medatata)=>{

}
return(
<Modal basic open={modal} onClose={e=>closeModal(e)} >
                <Modal.Header>Select an Image File</Modal.Header>
                <Modal.Content>
                    <Form style={{ maxWidth: '600px' }} >
                        <Form.Field>
                            
                            <Input fluid label="File types: jpg,pnj"
                                name="file"
                                type="file"
                               onChange={e=>addFile(e)}
                                 />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button color="green" inverted onClick={sendFile()} >
                        <Icon name="checkmark" />send
        </Button>
     
                    <Button color="red" inverted onClick={e=>closeModal(e)} >
                        <Icon name="remove" />Cancel
        </Button>
                </Modal.Actions>
            </Modal>)
}
export default FileModal;