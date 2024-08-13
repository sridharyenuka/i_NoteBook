import React,{useState} from 'react'
import {useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    
    let navigate=useNavigate()
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        // const {name,email,password}=credentials;
        const myHeaders = new Headers();
        myHeaders.append(
            "Content-Type", "application/json"
        );


        const request = new Request("http://localhost:5503/api/auth/createuser", {
            method: "POST",
            body: JSON.stringify({ name:credentials.name,email:credentials.email,password:credentials.password,cpassword:credentials.cpassword }),
            headers: myHeaders,
        });
        const response = await fetch(request);
        const json=await response.json()
        console.log(json)
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken)
            navigate("/");
            props.showAlert("Account Created Successfully","success")
        }else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    return (
        <div className="mt-2">
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={credentials.name} id="name" name="name" onChange={onChange} aria-describedby="emailHelp"  />

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp"  />

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" name="cpassword" onChange={onChange}  minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
