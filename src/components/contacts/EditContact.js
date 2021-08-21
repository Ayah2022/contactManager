import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import {v1 as uuid} from "uuid";
import axios from 'axios';
  
class EditContact extends Component {
    state = {
        name: '',
        email:'',
        phone:'',
        errors: {}
    }
    async componentDidMount(){
        const { id } =this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;

        this.setState({
            name:contact.name,
            email:contact.email,
            phone:contact.phone
        });
    }

    onSubmit = async (dispatch,e) =>{
        e.preventDefault();
        const {name, email,phone} =this.state;
        //check for errors
        if(name === ''){
           this.setState({errors: {name: 'Name is required'}});
           return; 
        }
        if(email === ''){
            this.setState({errors: {email: 'Email is required'}}) ;
            return;
         }
         if(phone === ''){
            this.setState({errors: {phone: 'Phone is required'}}) ;
            return;
         }

         const updContact={
             name,
             email,
             phone
         }
         const {id} =this.props.match.params;

         const res= await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact);
         dispatch({type:'UPDATE_CONTACT',payload:res.data});
     
        //clear state
        this.setState({
            name:'',
            email:'',
            phone:'',
            errors: {}
        });

        //redirect to anothar link
        this.props.history.push('/');
    }
    onChange= e => this.setState({[e.target.name]: e.target.value});

    render() {
        const { name , email, phone,errors }= this.state;
        return(
            <Consumer>
                {value => {
                    const { dispatch } =value;
                    return(
                        <div className="card mb-3">
                        <div className="card-header">
                            Add Contact
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                               <TextInputGroup 
                                name="name"
                                label="Name" 
                                placeholder="Enter Name"
                                value={name}
                                onChange={this.onChange}
                                error={errors.name} />
                               <TextInputGroup 
                                name="email"
                                type="email"
                                label="Email" 
                                placeholder="Enter Email"
                                value={email}
                                onChange={this.onChange} 
                                error={errors.email}/>
                              <TextInputGroup 
                                name="phone"
                                label="Phone" 
                                placeholder="Enter Phone"
                                value={phone}
                                onChange={this.onChange} 
                                error={errors.phone}/>
                                <input 
                                type="submit"
                                defaultValue="Update Contact"
                                className="btn btn-light btn-block w-100 mt-3"/>
                            </form>
                        </div>
                    </div>
                    )
                }}
            </Consumer>
        )
      
    }
}
export default EditContact;