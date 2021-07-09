import React, { Component ,forwardRef , useImperativeHandle ,useState} from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl  from 'react-bootstrap/FormControl'
import Button from "react-bootstrap/Button"

const RentUI = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            open() {
                setshow(true)
            }
        }),
    )
    const [show, setshow] = useState(false)
    const [input, setinput] = useState(0)
    function handleSubmit(){
      
        // props.duraction = parseInt(input)
        // console.log(props , parseInt(input))
          axios.post('http://localhost:4000/addrent?duration=' , {adid:props.id , giverid: props.giverid, duration:parseInt(input)}).then(result => {
            console.log(result)
      
            // props.history.push("/dashboard")
      
          })
        setshow(false)
    }
    return (
       <div>
           <Modal show={show}>
                     <Modal.Header closeButton>
                       <Modal.Title>Modal title</Modal.Title>
                     </Modal.Header>

                     <Modal.Body>
                       <p>Enter the Duration of the Rent.</p>
                       <InputGroup size="sm" className="mb-3">
     {/* <InputGroup.Text id="inputGroup-sizing-sm">Duration</InputGroup.Text> */}
     <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(event)=>{setinput(event.target.value)}} />
   </InputGroup>
                     </Modal.Body>

                     <Modal.Footer>
                       <Button variant="secondary" onClick={()=>{setshow(false)}} >Close</Button>
                       <Button variant="primary " onClick={handleSubmit} >Save changes</Button>
                     </Modal.Footer>
                   </Modal>
       </div>
    )
})
export default RentUI