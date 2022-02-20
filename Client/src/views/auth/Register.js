import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useFormik  } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import Select from 'react-select'
import urlPath from 'services/urlServer';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { isMobile } from 'react-device-detect';
//import DatePicker from '@mui/lab/DatePicker';
export default function Register() {

  const [confirmPassword, setConfirmPassword] = useState(false);
  const [valueConfirm, setValueConfirm] = useState("");
  const [isTerm,setIsTerm] = useState("");
  const { addToast } = useToasts();
  const [register,setRegister] = useState(false);
  const EmailRegExp = /^[A-Za-z0-9_.@]+$/;
  const defaultDate = {
    year:  new Date().getFullYear(),
    month: new Date().getMonth()+1,
    day: new Date().getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(defaultDate);
  let history = useHistory();

  const [optionsLearning, setOptionsLearning] = useState([])
  const optionsRole = [
    { value: '3', label: 'Trainer' },
    { value: '4', label: 'farmer' }
  ];

  const optionsGender = [
    { value: '1', label: 'Male'},
    { value: '2', label: 'Female' },
  ];

  // render regular HTML input element
  const renderCustomInput = ({ ref }) => (
    <>
      <span className="datepicker-toggle">
        <span className="datepicker-toggle-button"><i className="far fa-calendar "></i></span>
        <input ref={ref}
        type="text"
        readOnly
        className="datepicker-input cursor-pointer  mb-4  border-0 py-1-input px-1-input placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" // a styling class
        value={selectedDay !== null ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}` :  new Date().toLocaleDateString('en-GB')} />
      </span>
    </>
  )

  const formik = useFormik({
    initialValues : {
      accountCode:'',
      title:'',
      firstName:'',
      lastName:'',
      email:'',
      phoneNumber:'',
      address:'',
      description:'',
      role:'',
      learningPathId:'',
      password:'',
      profilePicture:'',
      isActivated:false,
      IsDeleted:false,
      gender:'',
      birthDate:new Date(),
      province:'',
      district:'',
      subDistrict:''

   },
   validationSchema: Yup.object({
     firstName:Yup.string().required('* Please enter your name'),
     lastName:Yup.string().required('* Please enter your last name'),
     email:Yup.string().matches(EmailRegExp,'* Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.').email('* Invalid email format').required('* Please enter email'),
     password:Yup.string().required('* Please enter your password'),
   }),

   onSubmit: values => {
      formik.values.role = (formik.values.role === "") ? "3" : formik.values.role ;
      formik.values.learningPathId = (formik.values.learningPathId === "") ? "1" : formik.values.learningPathId ;
      formik.values.gender = (formik.values.gender === "") ? "1" : formik.values.gender ;
      formik.values.province = (formik.values.province === "") ? "1" : formik.values.province;
      formik.values.district = (formik.values.district === "") ? "1001" : formik.values.district;
      formik.values.subDistrict = (formik.values.subDistrict === "") ? "100101" : formik.values.subDistrict;
      formik.values.birthDate = selectedDay;
      if(!confirmPassword && isTerm)
      {
        values.isActivated = false;
        values.IsDeleted = false;
        axios.get(urlPath+`/members/getemail/${values.email}`).then((response) => {
          if(response.data === null) {
              axios.post(urlPath+"/members",values).then((response)=>{
                if(response.data.error) 
                {
                  addToast(response.data.error, { appearance: 'error', autoDismiss: true });
                } else {
                  addToast('Successful registration', { appearance: 'success', autoDismiss: true });
                  history.push("/auth/login");
                }
              });
          }
          else {
            addToast('Can not save data Because the email used is already registered.', { appearance: 'warning', autoDismiss: true });
          }
        });
      }
   },
  });

  /*ตรวจสอบข้อมูล รหัสผ่านตรงกัน*/
  const validateConfirm = (e) => {
    if(e !==  formik.values.password)
      setConfirmPassword(true)
    else setConfirmPassword(false);
  }

  async function fetchLearning() {
    const response = await axios(urlPath+"/learning");
    const body = await response.data.listLearning;
    var JsonLearning = [];
    body.forEach(field => JsonLearning.push({value: field.id.toString(),label: field.LearningPathNameENG }))
    setOptionsLearning(JsonLearning)
  }

  const defaultValue = (options, value) => {
    if(value.toString() === "" && options[0] !== undefined)
    { 
        value = options[0].value;
    }
    return options ? options.find(option => option.value === value.toString()) : "";
  };
  
  useEffect( ()=>  {
    setSelectedDay(selectedDay);
    fetchLearning();
  },[]);


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-12/12 px-4">
          <div className="flex flex-wrap relative min-w-0 break-words w-full shadow-lg rounded-lg border-0">
            <div className={"w-1/2 bg-darkgreen-mju  text-white rounded-t-l-lg rounded-b-l-lg  pt-12 pl-4 pr-4 pb-2" + ((isMobile) ? " hidden" : " block")}>
                <h2 className="text-2xl text-bold THSarabunBold">INFORMATION</h2>
                <br/>
                <div className="text-indent">
                  <span className="text-xs">
                    Organic farming is an agricultural system that uses fertilizers of organic origin such as compost manure, green manure, and bone meal and places emphasis on techniques such as crop rotation and companion planting. It originated early in the 20th century in reaction to rapidly changing farming practices. Certified organic agriculture accounts for 70 million hectares globally, with over half of that total in Australia. Organic farming continues to be developed by various organizations today. Biological pest control, mixed cropping and the fostering of insect predators are encouraged. Organic standards are designed to allow the use of naturally-occurring substances while prohibiting or strictly limiting synthetic substances.
                  </span>
                </div>
                <br/>
                <br/>
                <div className="text-indent">
                  <span  className="text-xs">
                    Since 1990, the market for organic food and other products has grown rapidly, reaching $63 billion worldwide in 2012. This demand has driven a similar increase in organically-managed farmland that grew from 2001 to 2011 at a compounding rate of 8.9% per annum.
                  </span>
                </div>
                <br/>
                <br/>
                <div className="text-indent">
                  <span  className="text-xs">
                    As of 2019, approximately 72,300,000 hectares (179,000,000 acres) worldwide were farmed organically, representing approximately 1.5 percent of total world farmland.
                  </span>
                </div>
            </div>
            <div className={"bg-white  text-black  pt-12 pl-4 pr-4 pb-2"  + ((isMobile) ? " rounded-t-lg rounded-r-lg" : " w-1/2 rounded-t-r-lg rounded-b-r-lg")}>
              <form onSubmit={formik.handleSubmit}>
                <h2 className="text-2xl text-bold text-green-mju THSarabunBold">REGISTER FORM</h2>
                <div className="flex flex-wrap relative mt-5">
                  <div className="w-full lg:w-6/12">
                      <div className="relative w-full mb-3 px-2">
                        <label
                          className="block  text-blueGray-600 text-xs font-bold mb-2"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="border-0 py-1-input px-1-input placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="First Name"
                          id="firstName"
                          name="firstName"
                          maxLength={255}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstName}
                          autoComplete="new-password"
                        />
                         {formik.touched.firstName && formik.errors.firstName ? (
                              <div className="text-validate py-2 px-2 text-red-500">{formik.errors.firstName}</div>
                          ) : null}
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12">
                      <div className="relative w-full mb-3 px-2">
                        <label
                          className="block  text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="border-0 py-1-input px-1-input placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Last Name"
                          id="lastName"
                          name="lastName"
                          maxLength={255}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastName}
                          autoComplete="new-password"
                        />
                         {formik.touched.lastName && formik.errors.lastName ? (
                              <div className="text-xs py-2 px-2 text-red-500">{formik.errors.lastName}</div>
                          ) : null}
                      </div>
                    </div>
                </div>
                <div className="relative w-full px-2 mt-2">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                    >
                      Role
                    </label>
                      <Select  
                        id="role"
                        name="role"
                        onChange={value => {  formik.setFieldValue('role',value.value)}}
                        //value={formik.values.title}
                        className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs-select shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                        options={optionsRole} 
                        value={defaultValue(optionsRole, formik.values.role)}
                        />      
                </div>
                <div className="relative w-full px-2 mt-4">
                  <label className="block text-blueGray-600 text-xs font-bold mb-2">
                    Your Email
                  </label>
                  <input
                    type="text"
                    className="border-0 py-1-input px-1-input placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Your Email"
                    id="email"
                    name="email"
                    maxLength={255}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    autoComplete="new-password"
                  />
                   {formik.touched.email && formik.errors.email ? (
                              <div className="text-xs py-2 px-2 text-red-500">{formik.errors.email}</div>
                          ) : null}
                </div>
                <div className="flex flex-wrap relative mt-4">
                  <div className="w-full lg:w-6/12">
                    <div className="relative w-full px-2">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                      >
                        Date of Birth
                      </label>
                      <DatePicker
                          value={selectedDay}
                          onChange={(e) => {setSelectedDay(e);}}
                          renderInput={renderCustomInput} // render a custom input
                    
                        />          
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12">
                    <div className="relative w-full px-2">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                      >Gender
                      </label>
                      <Select
                        id="gender"
                        name="gender"
                        onChange={value => {formik.setFieldValue('gender',value.value)}}
                        className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                        options={optionsGender}
                        value={defaultValue(optionsGender, formik.values.gender)}
                        />
                    </div>
                  </div>
                </div>
                <div className="relative w-full px-2 mt-4">
                  <label
                    className="block text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Interesting Learning Path
                  </label>
                  {/* <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="learningPathId"
                    name="learningPathId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.learningPathId}
                    autoComplete="new-password">
                    <option value={1}>Rice</option>
                    <option value={2}>Mangosteen</option>
                  </select> */}
                    <Select
                      id="learningPathId"
                      name="learningPathId"
                      onChange={value => {  formik.setFieldValue('learningPathId',value.value)}}
                      //value={formik.values.title}
                      className="border-0 p-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs-select shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      options={optionsLearning} 
                      value={defaultValue(optionsLearning, formik.values.learningPathId)}
                      />
                  {/* <Select  className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" options={options} /> */}

                </div>
                <div className="flex flex-wrap relative mt-4">
                  <div className="w-full lg:w-6/12">
                    <div className="relative w-full mb-3 px-2">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 py-1-input px-1-input placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        maxLength={255}
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
                              <div className="text-xs py-2 px-2 text-red-500">{formik.errors.password}</div>
                          ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12">
                    <div className="relative w-full mb-3 px-2">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        
                      >Confirm Password
                      </label>
                      <input
                        type="password"
                        maxLength={255}
                        className="border-0 py-1-input px-1-input placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={e=>{ validateConfirm(e.target.value); setValueConfirm(e.target.value); }}
                        value={valueConfirm}
                      />
                      {confirmPassword ? (
                              <div className="text-xs py-2 px-2 text-red-500">* Passwords do not match</div>
                          ) : null}
                    </div>
                  </div>
                </div>
                <div className="mt-4 px-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox  rounded text-green-200-mju ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        onClick={(e) => {setIsTerm(e.target.checked)}}
                      />
                      <span className="ml-2 text-xs font-semibold text-blueGray-600">
                        I agree to the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Terms and Conditions
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="text-center px-2 mt-2">
                    <button
                      className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-xs font-bold  px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      REGISTER
                    </button>
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
