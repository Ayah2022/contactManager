import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Consumer } from '../../context';
import {Link} from 'react-router-dom';

class Contact extends Component {
 //   constructor(){
    //    super();
  //      this.state={};
   //     this.onShowClick= this.onShowClick.bind(this);
 //   }
 state={
     showContactInfo:false
 }
 //using arrow function so you dont have to do bind
//    onShowClick= e =>{
 //       
 //   }
 onDeleteClick = async (id,dispatch) => {
     //there is no data returned so await added withoud const variable
 try{

await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

  dispatch({type: 'DELETE_CONTACT', payload:id})
} catch (e){
    
  dispatch({type: 'DELETE_CONTACT', payload:id})
}
     ;
 };
    render() {
        const {showContactInfo} =this.state;
        const { id, name, email, phone }= this.props.contact;
        return (
            <Consumer>
                {value =>{
                    const { dispatch } = value;
                    return(
                        <div className="card card-body mb-3 ">
                        <h4>{name} 
                       {' '}{' '} <i className="fas fa-sort-down" style={{cursor:"pointer"}} onClick={() => this.setState ({
                    showContactInfo: !this.state.showContactInfo})}></i>
                    <i className="fas fa-times" style={{cursor:"pointer", float:"right" , color:"red"}} onClick={this.onDeleteClick.bind(this,id, dispatch)}></i>
                    <Link to={`contact/edit/${id}`}>
                        <i className="fas fa-pencil-alt" style={{cursor: 'pointer',float:'right', color:'black', marginRight:'1rem'}}></i>
                        </Link></h4>
                       { showContactInfo ?( <ul className="list-group ">
                        <li className="list-group-item">
                            email: {email}
                        </li>
                        <li className="list-group-item">
                            Phone: {phone}
                        </li>
                        </ul>):null}
                    </div>
                    )
                }}
            </Consumer>
          
        )
    }
}
Contact.propTypes={
    contact:PropTypes.object.isRequired 
}
export default Contact;
