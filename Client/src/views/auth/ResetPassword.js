import React, { useState,useContext,useEffect } from 'react'
import axios from 'axios';
import { useHistory,useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
import { useToasts } from 'react-toast-notifications';
import { useFormik  } from "formik";
import * as Yup from "yup";
import urlPath from 'services/urlServer';
import FilesService from 'services/files';

export default function ResetPassword() {
  const { setAuthState } = useContext(AuthContext); 
  const { addToast } = useToasts();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [valueConfirm, setValueConfirm] = useState("");
  let { id } = useParams();
  let history = useHistory();

    const formik = useFormik({
      initialValues : {
        password:'',
        confirmPassword:'',
    },
    validationSchema: Yup.object({
      password:Yup.string().required('* Please enter your password')
    }),
    onSubmit: values => {
      if(!confirmPassword)
      {
        const decrypt = atob(id).split(',');
        if(decrypt.length >1)
        {
          const data = {id:decrypt[1], password:values.password};
    
          axios.put(urlPath+"/members/updatePassword",data).then((response) => {
            if(!response.data.errors)
            {
              addToast("Reset password successfully", { appearance: 'success', autoDismiss: true });
              history.push('/auth/login');
            } else {
              addToast("Oops, something went wrong. Try again", { appearance: 'error', autoDismiss: true });
            }
          });

        }
      }
    },
  });

  /*ตรวจสอบข้อมูล รหัสผ่านตรงกัน*/
  const validateConfirm = (e) => {
    if(e !==  formik.values.password)
      setConfirmPassword(true)
    else setConfirmPassword(false);
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
                <div className="text-center mb-3">
                  <h6 className="text-green-mju text-3xl font-bold">
                    RESET PASSWORD
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:w-9/12 lg:px-10 py-10 pt-0 mx-auto">
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      New Password
                    </label>
                    <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={(e) => {
                          if(e.target.value !== valueConfirm ) 
                          {
                            setConfirmPassword(e.target.value);
                          }
                          else if (e.target.value === "" && valueConfirm === "" || e.target.value === valueConfirm)
                          {
                            setConfirmPassword(null);
                          }
                          formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                       {formik.touched.password && formik.errors.password ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.password}</div>
                          ) : null}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    >
                      Confirm New Password
                    </label>
                    <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={e=>{ validateConfirm(e.target.value); setValueConfirm(e.target.value); }}
                        value={valueConfirm}
                      />
                      {confirmPassword ? (
                              <div className="text-sm py-2 px-2 text-red-500">* Passwords do not match</div>
                          ) : null}
                  </div>
             

                  <div className="">
                    <div className="flex flex-wrap relative">
                      <div className="w-1/2 mt-4">
                        <Link className="cursor-pointer text-xs font-bold text-blue-mju" to="/auth/login"> go to sign in</Link>
                      </div>
                      <div className="w-1/2 text-right">
                        <button
                        className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-right"
                        type="submit"
                        >
                         RESET PASSWORD 
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
