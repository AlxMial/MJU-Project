import React, { useState,useContext } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';

export default function Login() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext); 

  let history = useHistory();

  const login =() => {
      const data = {email:username, password:password};
      axios.post("http://localhost:3001/users/login",data).then((response)=>{
      if(response.data.error) 
      {alert(response.data.error)}
      else{
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
              email : response.data.email,
              id: response.data.id,
              status:true,
            });
          history.push("/admin");
        }
      });
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-green-mju text-3xl font-bold">
                    SIGN IN
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:w-9/12 lg:px-10 py-10 pt-0 mx-auto">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer mt-2">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-1 rounded text-blueGray-700 pt-4 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-xs font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="">
                    <div className="flex flex-wrap relative">
                      <div className="w-1/2 mt-4">
                        <span className="ml-2  text-xs font-semibold text-blueGray-600 text-left">
                        No Account? 
                        </span>
                        <Link className="cursor-pointer text-xs font-bold text-blue-mju" to="/auth/register"> Signup</Link>
                      </div>
                      <div className="w-1/2 text-right">
                        <button
                        className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-right"
                        type="button"
                        onClick={login}
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
