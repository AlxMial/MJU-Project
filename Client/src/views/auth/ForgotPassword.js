import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { useHistory,Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useFormik  } from "formik";
import * as Yup from "yup";
import urlPath from 'services/urlServer';
import urlForgot from 'services/urlForgot';
import { isMobile } from 'react-device-detect';

export default function ForgotPassword() {
  const { addToast } = useToasts();
  let history = useHistory();
  const [windowWidth, setWindowWidth] = useState(0);

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  const formik = useFormik({
    initialValues : {
      email:''
   },
   validationSchema: Yup.object({
    email:Yup.string().required('* Please enter email'),
   }),
   onSubmit: values => {
    axios.get(urlPath+`/members/getemail/${values.email}`).then((response) => {
      if(response.data !== null){
        sendmail(values.email,response.data.id); 
      }else{
        addToast('Email not found in the system. Please enter a new email', { appearance: 'warning', autoDismiss: true });
      }
    });
   },
 });

 const sendmail=(tomail,id)=>{
    const fullName = localStorage.getItem('fullName');
    const key = "mjuproject,";
    axios.post(urlPath+"/mails",{frommail:'mjuproject@gmail.com',password:'mju@12345',tomail:tomail,fullName:fullName,resetUrl:urlForgot+`/auth/resetpassword/${btoa("id="+key+id)}`}).then((response)=>{
      if (response.data.msg === 'success'){

      }else if(response.data.msg === 'fail'){
        addToast("Oops, something went wrong. Try again", { appearance: 'error', autoDismiss: true });
      }
    });
    history.push("/auth/forgotreturn");
  }
  useEffect( ()=>  {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeWindow);
    return () => { window.removeEventListener("resize", resizeWindow); };
  },[]);

  return (
    <>
      <div className={"container px-4 h-full" + ((windowWidth > 911) ? " mx-auto" : " ")}>
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4 vertical-center">
            <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-left mb-3">
                  <h6 className="text-green-mju text-4xl font-bold">
                    Forgot Password?
                  </h6>
                </div>
                <br/>
                <div className="text-left mb-3">
                  <span className="text-green-mju text-sm">
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                  </span>
                </div>
              </div>
              <div className={"flex-auto px-4 lg:w-9/12 lg:px-10 py-10 pt-0" + ((windowWidth > 911) ? " mx-auto" : " ")}>
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
                  <div className="">
                    <div className="justify-center flex flex-wrap relative">
                        <button
                        className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-right"
                        type="submit"
                        >
                          Continue
                        </button>
                        <button
                        className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-right"
                        onClick={() => {history.push("/auth/login");}}
                        >
                          Cancel
                        </button>
                     
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