import React from 'react';
import './App.css';
import List from './List';
import Lista_producto from './Lista_producto';
import ListaprecioH from './ListaprecioH';
import ListaprecioS from './ListaprecioS';
import ListaprecioP from './ListaprecioP';
import ListaprecioA from './ListaprecioA';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar} from 'react-bootstrap';



class App extends React.Component{

  constructor(props){
    super(props);
    
    
    this.state = {
      books:[], 
      childVisible: false,   
      childVisible1: false, 
      childVisible2: false, 
      childVisible3: false,
      childVisible4: false, 
    };
   
   
  }

  handleClick(event) {  
    
    var id = event.target.value;
    if (id === "0"){      
      this.setState(prevState => ({ childVisible: !prevState.childVisible }));   
      this.setState ({ childVisible1: false }); 
      this.setState ({ childVisible2: false });
      this.setState ({ childVisible3: false });  
      this.setState ({ childVisible4: false }); 
    }else if(id === "1"){      
      this.setState(prevState => ({ childVisible1: !prevState.childVisible1 })); 
      this.setState ({ childVisible : false });  
      this.setState ({ childVisible2: false });
      this.setState ({ childVisible3: false });
      this.setState ({ childVisible4: false });

    }else if(id === "2"){      
      this.setState(prevState => ({ childVisible2: !prevState.childVisible2 }));
      this.setState ({ childVisible4: false });
      this.setState({ childVisible3: false });
      this.setState({ childVisible1: false }); 
      this.setState({ childVisible : false });   
    }else if(id === "3"){      
      this.setState(prevState => ({ childVisible3: !prevState.childVisible3 })); 
      this.setState ({ childVisible4: false });
      this.setState ({ childVisible2: false }); 
      this.setState ({ childVisible1:false }); 
      this.setState ({ childVisible: false });  
    }
    else if(id === "4"){      
      this.setState(prevState => ({ childVisible4: !prevState.childVisible4 })); 
      this.setState ({ childVisible3: false }); 
      this.setState ({ childVisible2: false }); 
      this.setState ({ childVisible1:false }); 
      this.setState ({ childVisible: false });  
    }
  }

 
  

  //Consumo el Api Rest que esta en AWS
  async fetchData(){
    const url = 'https://7ubmxobnpb.execute-api.us-east-2.amazonaws.com/Prueba/productos';
    const response = await fetch(url);
    const data = await response.json();   
    this.setState({books: data.productos});  
    console.log(this.state.books);
    }

  
  componentDidMount(){    
    this.fetchData();
   
  }



  

  render(){
    var {childVisible,childVisible1,childVisible2,childVisible3,childVisible4} = this.state
    return (
      <>
      <div className="app">
      
      
        
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
    
      <img
        alt=""
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      React Bootstrap
    </Navbar.Brand>
  </Navbar> 

 


  {this.state.books.map(item => 
  <>
     <div className="item">
     <div className="image"><img src={'img/' + item.image} width="100%" /></div>
     <div className="title">{item.title}</div>
     <div className="rating">
                   
                    Calificación: 
                    <select value={item.rating}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
               
                <div className="actions">
                <button  onClick={(e) => this.handleClick(e)} value={item.id}>Ver Lista</button>
                </div>

     </div>
    
   </> 
    )} 

    
        {
         childVisible
            ? <Lista_producto />
            : null
        }

{
         childVisible1
            ? <ListaprecioH />
            : null
        }
{
         childVisible2
            ? <ListaprecioS />
            : null
        }
{
         childVisible3
            ? <ListaprecioP />
            : null
        }
{
         childVisible4
            ? <ListaprecioA />
            : null
        }
    
              
       
      </div>
      </>
    );
  }
  
  
  
}

export default App;
