import React, { useState,useContext,useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
import { useToasts } from 'react-toast-notifications';
import { useFormik  } from "formik";
import * as Yup from "yup";
import urlPath from 'services/urlServer';

export default function ForgotReturn() {
  const { setAuthState } = useContext(AuthContext); 
  const { addToast } = useToasts();
  let history = useHistory();

  const formik = useFormik({
    initialValues : {
      email:''
   },
   validationSchema: Yup.object({
    email:Yup.string().required('* Please enter email'),
   }),
   onSubmit: values => {
    sendmail(values.email)
   },
 });

 const sendmail=(tomail)=>{
        const fullName = localStorage.getItem('fullName');
        axios.post(urlPath+"/mail",{frommail:'mjuproject@gmail.com',password:'mju@12345',tomail:tomail,fullName:fullName}).then((response)=>{
        if (response.data.msg === 'success'){
            //alert("Email sent, awesome!"); 
        
        }else if(response.data.msg === 'fail'){
            //alert("Oops, something went wrong. Try again")
        }
    })
  }
  
  useEffect( ()=>  {

  },[]);

  return (
    <>
      <div className="container pt-20 mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-left mb-3">
                  <h6 className="text-green-mju text-3xl font-bold">
                    Reset your password
                  </h6>
                </div>
                <br/>
                <div className="text-left mb-3">
                  <span className="text-green-mju text-sm">
                    Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                  </span>
                </div>
              </div>
              <div className="flex-auto px-4 lg:w-9/12 lg:px-10 py-10 pt-0 mx-auto">
                <form>
                  
                  <div className="">
                    <div className="justify-center flex flex-wrap relative">
                        <Link to="/auth/login">
                            <button
                            className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-right"
                            type="submit"
                            >
                            Return to sign in
                            </button>
                        </Link>
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