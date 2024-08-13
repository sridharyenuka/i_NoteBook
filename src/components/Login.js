import React, { useState} from 'react'
import {useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate()
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append(
            "Content-Type", "application/json"
        );
        // myHeaders.append(
        //     "auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNjc0ZmI3NDRlODQwZmIzYzZjNjM1In0sImlhdCI6MTcyMzM2MTI0N30.6r1h4UHDDQtH784NROEaWSAoB7evB0_N4e3EaLHECwc"
        // );

        const request = new Request("http://localhost:5503/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email:credentials.email,password:credentials.password }),
            headers: myHeaders,
        });
        const response = await fetch(request);
        const json=await response.json()
        console.log(json)
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Loggedin Successfully","success")
            navigate("/");
            
        }else{
            props.showAlert("Invalid Details","danger")
        }
    }
    return (
        <div className="mt=3">
            <h2>Login to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
