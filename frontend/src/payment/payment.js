import {React , useState} from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'
import axios from 'axios'






function Payment (props){
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const onSubmit = async values => {
          
        axios.post("http://localhost:4000/payment" ,{id:1 , value:values} ).then(res=>{
            console.log(res)
            if(res.status == 400){
                ShowError("payment failed" ,res.data.error);
            }
            else{
                showSucess("payment recieved")
            }
        }).catch((err)=>{
            ShowError("payment failed" ,err);
        })
        
        //   window.alert(JSON.stringify(values, 0, 2))
        }
        
    const showSucess= async (msg)=>{
        
        setShowSuccessMsg(1)
        await sleep(3000)
        props.history.push('/dashboard')
    }
    const ShowError=async (msg)=>{
        setShowErrMsg(1)
        await sleep(300)
        props.history.push('/additem')
    }
    const [showSuccessMsg , setShowSuccessMsg ]= useState(0)
    const [showErrMsg , setShowErrMsg ]= useState(0)
    
    return(
  <Styles>
   
      
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active
      }) => {
        return (
            <>
            <div>
                {showSuccessMsg==1 &&
                    <p style={{background:'#228B22',display:"" , borderRadius:'10px' , fontSize:'20px',height: '34px',color:'white', display:{showSuccessMsg}}}>payment successfull you will be redirected</p>

                }
                {showErrMsg==1 &&
                    <p style={{background:'#DC143C',display:"" , borderRadius:'10px' , fontSize:'20px',height: '34px' ,color:'white' }}>Sorry payment failed , Try again later</p>

                }
            </div>
          <form onSubmit={handleSubmit}>
            <Card
              number={values.number || ''}
              name={values.name || ''}
              expiry={values.expiry || ''}
              cvc={values.cvc || ''}
              focused={active}
            />
            <div>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
                style={{width:'100pxf'}}
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            
          </form>
          </>
        )
      }}
    />
  </Styles>
)
    }
export default Payment