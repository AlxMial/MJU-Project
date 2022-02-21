import React, { useState,useContext,useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
import { useToasts } from 'react-toast-notifications';
import { useFormik  } from "formik";
import * as Yup from "yup";
import urlPath from 'services/urlServer';
import FilesService from 'services/files';
import { isMobile } from 'react-device-detect';

export default function Login() {
  const { setAuthState } = useContext(AuthContext); 
  const { addToast } = useToasts();
  let history = useHistory();

  const formik = useFormik({
    initialValues : {
      email:'',
      password:'',
      isRemember: false
   },
   validationSchema: Yup.object({
    email:Yup.string().required('* Please enter your email'),
    password: Yup.string().required('* Please enter your password'),
   }),
   onSubmit: values => {
    const data = {email:values.email, password:values.password};
    axios.post(urlPath+"/users/login",data).then((response)=>{
    if(response.data.error) 
    {  
      addToast("Can't login because Invalid email or password", { appearance: 'error', autoDismiss: true });
    }
    /*ปรับการ Login Mobile ให้ตรวจสอบเฉพาะ Admin*/
    else if (isMobile &&  response.data.role === 1)
    {
      addToast("Can't open Adminstrator management page, must use on Computer only.", { appearance: 'error', autoDismiss: true });
    }
    else
    {
        if(response.data.isActivated){
          if(formik.values.isRemember)
            localStorage.setItem('login', JSON.stringify( { email: values.email, password: values.password }));
          else  
            localStorage.removeItem('login');
          addToast('Login Successfully', { appearance: 'success', autoDismiss: true});
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("roleUser", response.data.role);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("learningPathId", response.data.learningPathId);
          localStorage.setItem("fullName", response.data.firstName + ' ' + response.data.lastName);
          localStorage.setItem("profilePicture",FilesService.buffer64(response.data.profilePicture));
          setAuthState({
              email : response.data.email,
              id: response.data.id,
              status:true,
              role:response.data.role,
              profilePicture:response.data.profilePicture,
              learningPathId:response.data.learningPathId
            });
          if(response.data.role === "1")
            history.push("/admin");
          else 
            history.push("/home");
        } else {
          addToast("Unable to login because the email for access to the system has been deactivated.", { appearance: 'error', autoDismiss: true });
        }
      }
    });
   },
 });

  useEffect( ()=>  {
    var retrievedObject = JSON.parse(localStorage.getItem('login'));

    if(retrievedObject !== null) {
        formik.setFieldValue('email',retrievedObject.email);
        formik.setFieldValue('password',retrievedObject.password);
        formik.setFieldValue('isRemember',true);
    }
  },[]);

  return (
    <>
      <div className={"container px-4 h-full" + ((isMobile) ? " " : " mx-auto")} >
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4 vertical-center">
            <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 mt-4 ">
                <div className="text-center mb-3">
                  <h6 className="text-green-mju text-4xl font-bold">
                    SIGN IN
                  </h6>
                </div>
              </div>
              <div className={
                "flex-auto px-4 lg:w-9/12 lg:px-10 py-10 pt-0" + ((isMobile) ? " " : " mx-auto")}>
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                            <div className="text-sm py-2 px-2 text-red-500">{formik.errors.email}</div>
                        ) : null}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                            <div className="text-sm py-2 px-2 text-red-500">{formik.errors.password}</div>
                        ) : null}
                  </div>
             
                  <div className="bg-white mb-0">
                    <div className="text-center flex justify-between ">
                      <div>
                        <label className="inline-flex items-center cursor-pointer mt-2">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-1 rounded text-green-200-mju pt-4 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            name="isRemember"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.isRemember}
                          />
                          <span className="ml-2 text-sm font-semibold text-blueGray-600">
                            Remember me
                          </span>
                        </label>
                      </div>
                      <div>
                      <label className="inline-flex items-center cursor-pointer mt-2">
                          <span className="ml-2 text-sm font-semibold text-blueGray-600">
                            <Link className="cursor-pointer text-sm font-bold text-blue-mju" to="/auth/forgotpassword"> Forgot Password? </Link>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex flex-wrap relative">
                      <div className="w-1/2 mt-4">
                        <span className="ml-2 text-sm font-semibold text-blueGray-600 text-left">
                        No Account? 
                        </span>
                        <Link className="cursor-pointer text-sm font-bold text-blue-mju" to="/auth/register"> Signup</Link>
                      </div>
                      <div className="w-1/2 text-right">
                        <button
                        className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-right"
                        type="submit"
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
