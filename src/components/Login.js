import React, { Component } from 'react'
import {
    withRouter
  } from "react-router-dom";

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            invalid: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){

    }

    login(){
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('//localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept':  'application/json',
                'Content-Type':  'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.ok){
                this.props.history.push('/');
            } else if(data.message && JSON.stringify(data.message).includes('Incorrect')) {
                console.log('ok');
                this.setState({invalid:true})
            }
        })
        .catch(err => console.log(err));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        
    }
    render() {
        return (
            <div className="container">
                <h1>Mind Login</h1>
                <div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input name="email" onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input name="password" onChange={this.handleChange} type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    { this.state.invalid ? <div className="form-group" style={{color:'#DE3207'}}>Incorrect credentials</div> : null }
                    <button onClick={()=>this.login()} type="submit" className="btn btn-primary">Submit</button>
                 
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
