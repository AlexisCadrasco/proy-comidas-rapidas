import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card,ListGroup,ListGroupItem,Button,Form,Modal } from 'react-bootstrap';
import axios from 'axios';



class ListaprecioA extends React.Component{

constructor(props){
   super(props);
   
    this.state={
        Nombre: '',
        est : [],
        showing: false, 

    
      };
}



componentDidMount(){      
    this.fetchData();   
    
  }
async fetchData(){
    const url = 'https://7ubmxobnpb.execute-api.us-east-2.amazonaws.com/Prueba/productos/listaprecioasados';
    const response = await fetch(url);
    const data = await response.json();   
    this.setState({est: data.lista_productos});
    

  }

  handleShow(){
    this.setState({showing:!this.state.showing});

  }

  //Capturar el campo Nombre
  onInputChange (e) {
    this.setState({ Nombre: e.target.value });
  }

  //Enviar los datos a el Api Rest
  onSubmit (e) {
    e.preventDefault()
   console.log(this.state.Nombre);
   axios.post('https://7ubmxobnpb.execute-api.us-east-2.amazonaws.com/Prueba/productos/enviarpedido',this.state)
    .then(response => {      
    alert(response.data.body);
    this.setState({showing:false});
      }).catch(error =>{
        console.log(error)
      });
  }
    
    
    
 


render(){
  


    var {Nombre, est } = this.state;
    return(

       

<div className="Lista_producto">

<Card border="danger" style={{ width: '38rem' , marginLeft: '18rem'}} >
            
            <Card.Header>Listado de Precios</Card.Header>            
            <Card.Body>
              <Card.Title>Asados</Card.Title>              
              <Card.Text>
              <ul>
    {est.map((task,index) =>  {
            return (
  <tr key={index}>
    <li key={index}>
          {task.Name} - {task.precio}
        </li>
  </tr> 
            )}  
     )}
    </ul>

            </Card.Text>
            
            </Card.Body>
            <ListGroup className="list-group-flush">
               <ListGroupItem >  <Button className="btn btn-danger" onClick={()=>{this.handleShow()}}>
        Hacer Pedido
      </Button>  </ListGroupItem>              
            </ListGroup>
            <Card.Footer className="text-muted">Copyright Alexis Cadrasco García</Card.Footer>
     </Card>

     <>
     

      <Modal show={this.state.showing} onHide={()=>{this.handleShow()}} animation={false} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Datos del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.onSubmit.bind(this)}>
  <Form.Group controlId="nombreForm.ControlInput1">
    <Form.Label>Nombre y Apellido</Form.Label>
    <Form.Control type="text" placeholder="Juan Perez" value={Nombre} onChange={this.onInputChange.bind(this)}/>
  </Form.Group>
  <Form.Group controlId="direccionForm.ControlInput2">
    <Form.Label>Dirección</Form.Label>
    <Form.Control type="text" placeholder="Cl 20 69-74" />
  </Form.Group>
  <Form.Group controlId="celularForm.ControlInput3">
    <Form.Label>Número de Celular</Form.Label>
    <Form.Control type="text" placeholder="(300)(000)(0000)" />
  </Form.Group>
  <Form.Group controlId="listForm.ControlSelect1">
    <Form.Label>Seleccione tipo de perro</Form.Label>
    <Form.Control as="select">
      <option value="1">Carne</option>
      <option  value="2">Pollo</option>
      <option  value="3">Cerdo</option>
      <option  value="4">Trifásico</option>      
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="ListForm.ControlSelect2">
    <Form.Label>Cantidad</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  
  <Button type="submit"  className="btn btn-danger" >
            Pedir
          </Button>
</Form>

        </Modal.Body>
        <Modal.Footer>
          
         
        </Modal.Footer>
      </Modal>
    </>

    

      </div>

       
        
    );
}



}
export default ListaprecioA;



    