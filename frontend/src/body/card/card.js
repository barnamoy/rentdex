import React from 'react'
import {Card} from 'react-bootstrap';
import './card.css'


class card extends React.Component {
constructor(props){
  super(props);
  console.log('props are : ' , props)
}

render(){
  return <div class="card">
  
  <div class="photo">
    <img src={"http://localhost:4000/"+this.props.url} height="100px"/>
  </div>
  <div class="description">
    <h2>{this.props.name}</h2>
    <br/>
    <h4>Sold by: {this.props.seller}</h4>
    <br/>
    {/* <h4>{this.props.description}</h4> */}
    <h3>₹ {this.props.price}</h3>
    
  </div>
</div>
}

  // render() {
  //     return <div> 
  //       <Card style={{ width: '18rem' }}>
  //       <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/81VrYv5MQkL._SL1500_.jpg" />
  //       <Card.Body>
  //         <Card.Title>{this.props.name}  price:{this.props.price}</Card.Title>
  //       <Card.Text>
  //        {this.props.description}
  //       </Card.Text>
  //     </Card.Body>
  //       </Card>
  //       <br/>
  //     </div>
  //   }
 }
  export default  card