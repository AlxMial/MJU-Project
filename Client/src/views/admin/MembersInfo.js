import React,{useState,useEffect} from "react";
import Switch from "components/Toggles/Switch";
import { useParams } from "react-router-dom";
import FilesService from '../../services/files'
import { useFormik  } from "formik";
import * as Yup from "yup";
import Select from 'react-select'
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import ValidateService from '../../services/validateValue'
import urlPath from '../../services/urlServer'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import api_province from '../../assets/data/api_province.json'
import api_amphure from '../../assets/data/api_amphure.json'
import api_tombon from '../../assets/data/api_tombon.json'
import Spinner from '../../components/Loadings/spinner/Spinner'
import * as Storage from "../../../src/services/Storage.service";
const locale = require("react-redux-i18n").I18n;
// components

export default function Members() {

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const [value, setValue] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [valueConfirm, setValueConfirm] = useState("");
  const [inputPhoneNumber, setinputPhoneNumber] = useState();
  const [enableControl,setIsEnableControl] = useState(true);
  const [listMembers, setListMembers] = useState([]);
  const [isNew,setIsNew] = useState(false);
  const { addToast } = useToasts();
  let { id } = useParams();
  const [optionsLearning, setOptionsLearning] = useState([])
  const [optionsLearningEng, setOptionsLearningEng] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const defaultDate = {
    year:  new Date().getFullYear(),
    month: new Date().getMonth()+1,
    day: new Date().getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(defaultDate);
  const [dataProvice,setDataProvice]=useState([]);
  const [dataDistrict,setDataDistrict]=useState([]);
  const [dataSubDistrict,setSubDistrict] = useState([]);
  const [dataProviceEng,setDataProviceEng]=useState([]);
  const [dataDistrictEng,setDataDistrictEng]=useState([]);
  const [dataSubDistrictEng,setSubDistrictEng] = useState([]);
  const [dayBirth,setDayBirth] = useState(0);
  const handleFileUpload = async (e) => {
    const base64 = await FilesService.convertToBase64(e.target.files[0]);
    setPostImage(base64);
  }
  const options = [
    { value: '1', label: 'นาย' },
    { value: '2', label: 'นาง' },
    { value: '3', label: 'นางสาว' }
  ];

  const optionsEng = [
      { value: '1', label: 'Mr.' },
      { value: '2', label: 'Mrs.' },
      { value: '3', label: 'Miss.' }
  ];

  const optionsRole = [
    { value: '1', label: 'ผู้ดูแลระบบ'},
    { value: '2', label: 'ผู้เยี่ยมชม' },
    { value: '3', label: 'วิทยากร' },
    { value: '4', label: 'เกษตรกร' }
  ];

  const optionsRoleEng = [
      { value: '1', label: 'Admin'},
      { value: '2', label: 'Guest' },
      { value: '3', label: 'Trainer' },
      { value: '4', label: 'Farmer' }
    ];


  const optionsGender = [
      { value: '1', label: 'ชาย'},
      { value: '2', label: 'หญิง' },
    ];

    const optionsGenderEng = [
      { value: '1', label: 'Male'},
      { value: '2', label: 'Female' },
    ];

  

  const defaultValue = (options, value) => {
    if(value.toString() === "" && options[0] !== undefined)
    { 
        value = options[0].value;
    }
    return options ? options.find(option => option.value.toString()  === value.toString()) : "";
  };

  // render regular HTML input element
  const renderCustomInput = ({ ref }) => (
    <>
      <span className="datepicker-toggle-register">
        <span className="datepicker-toggle-button"><i className="far fa-calendar "></i></span>
        <input ref={ref}
        type="text"
        className="datepicker-input cursor-pointer  mb-4 my-custom-input-class border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" // a styling class
        disabled={enableControl}
        value={selectedDay !== null ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}` :  new Date().toLocaleDateString('en-GB')} />
      </span>
    </>
  )

  /*จำนวนนาทีสำหรับหลักสูตร*/
  const onHandleTelephoneChange = (e) => {
    if(ValidateService.onHandleNumberChange(e.target.value) !== "" || e.target.value === "" )
    {  
      setinputPhoneNumber(e.target.value)
      formik.values.phoneNumber = e.target.value;
    }
  };

  /*ตรวจสอบข้อมูล รหัสผ่านตรงกัน*/
  const validateConfirm = (e) => {
    if(e !==  formik.values.password)
      setConfirmPassword(true)
    else setConfirmPassword(false);
  }

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
      birthDate:new Date(),
      gender:'',
      groupMember:'',
      province:'',
      district:'',
      subDistrict:''
    },
    validationSchema: Yup.object({
      accountCode:Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก รหัสบัญชีผู้ใช้' : '* Please enter your account code'),
      firstName:Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก ชื่อ' : '* Please enter your first name'),
      lastName:Yup.string().required((Storage.GetLanguage() === "th") ?'* กรุณากรอก นามสกุล' : '* Please enter your last name'),
      email:Yup.string().email((Storage.GetLanguage() === "th") ? '* รูปแบบอีเมลไม่ถูกต้อง' : 'Invalid email format').required((Storage.GetLanguage() === "th") ? '* กรุณากรอก อีเมล'  : '* Please enter your email'),
      phoneNumber:Yup.string().matches(phoneRegExp, (Storage.GetLanguage() === "th") ? '* รูปแบบเบอร์โทรศัพท์ ไม่ถูกต้อง' : '* The phone number format is invalid').required((Storage.GetLanguage() === "th") ? '* กรุณากรอก เบอร์โทรศัพท์' : '* Please enter your phone number' ),
      birthDate:Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก วันเกิด' : '* Please enter your date of birth'),
      password:Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก รหัสผ่าน' : '* Please enter your password'),
    }),

    onSubmit: values => {
      formik.values.title = (formik.values.title === "") ? "1" : formik.values.title ;
      formik.values.role = (formik.values.role === "") ? "1" : formik.values.role ;
      formik.values.learningPathId = (formik.values.learningPathId === "") ? "1" : formik.values.learningPathId;
      formik.values.gender = (formik.values.gender === "") ? "1" : formik.values.gender;
      formik.values.province = (formik.values.province === "") ? "1" : formik.values.province;
      formik.values.district = (formik.values.district === "") ? "1001" : formik.values.district;
      formik.values.subDistrict = (formik.values.subDistrict === "") ? "100101" : formik.values.subDistrict;
      formik.values.birthDate = selectedDay;
      if(!isNew)
        if(values.id === undefined)
          values.id = listMembers.filter(x => x.accountCode === formik.values.accountCode )[0].id;

      console.log(formik.values.birthDate)
      axios.get(urlPath+`/members/getAccountCode/${values.accountCode}`,{
        headers: {accessToken : localStorage.getItem("accessToken")}
      }).then((response) => {
        if(response.data === null || response.data.id === values.id) {
          insertAccount(values);
        } else {
          addToast((Storage.GetLanguage() === "th") ? 'ไม่สามารถบันทึกข้อมูลได้ เนื่องจากรหัสบัญชีผู้ใช้ซ้ำ กรุณากรอกรหัสบัญชีผู้ใช้ใหม่' : 'Can not save data due to duplicate user account password Please enter a new user account password.' , { appearance: 'warning', autoDismiss: true });
        }

      });
    },
  });

  const insertAccount = (values) => {
    setIsLoading(true);
    axios.get(urlPath+`/members/getemail/${values.email}`).then((response) => {
      if(response.data === null || (response.data && response.data.id === values.id)) {
        if(!confirmPassword)
        {
          values.isActivated = value;
          values.profilePicture = postImage;
          if(isNew){
              axios.post(urlPath+"/members",values).then((response)=>{
              if(response.data.error) 
              {
                addToast(response.data.error, { appearance: 'error', autoDismiss: true });
              } else {
                addToast((Storage.GetLanguage() === "th") ? 'บันทึกข้อมูลสำเร็จ' : 'Save data successfully', { appearance: 'success', autoDismiss: true });
                setIsEnableControl(true);
                setIsNew(false);
                axios.get(urlPath+"/members",{
                  headers: {accessToken : localStorage.getItem("accessToken")}
                }).then((response) => {
                  if(response){
                      setListMembers(response.data.listMembers);
                    }
                  });
              }
            });
          } else {
              if(values.id === undefined)
                values.id = listMembers.filter(x => x.accountCode === formik.values.accountCode )[0].id;
              axios.put(urlPath+"/members",values,{
                headers: {accessToken : localStorage.getItem("accessToken")}
              }).then((response) => {
              if(response.data.error) 
              {
                addToast(response.data.error, { appearance: 'error', autoDismiss: true });
              } else {
                addToast((Storage.GetLanguage() === "th") ? 'บันทึกข้อมูลสำเร็จ' : 'Save data successfully', { appearance: 'success', autoDismiss: true });
                setIsEnableControl(true);
              }
            });
          }
        }
      }
      else {
        addToast( (Storage.GetLanguage() === "th") ?  'ไม่สามารถบันทึกข้อมูลได้ เนื่องจากอีเมลที่ใช้งานมีการลงทะเบียนเรียบร้อยแล้ว' : 'Can not save data Because the email used is already registered.', { appearance: 'warning', autoDismiss: true });
      }
      setIsLoading(false);
    });
  }

  async function fetchData() {
    setIsLoading(true);
    let response = await axios(
      urlPath+`/members/byId/${id}`,{
        headers: {accessToken : localStorage.getItem("accessToken")}
      }
    );
    let user = await response.data;
    if(user !== null) {
      var ProvinceId = "";
      var District = "";
      var JsonLearning = [];
      var JsonLearningEng = [];
      for(var columns in response.data) {
        JsonLearning = [];
        JsonLearningEng = [];
        if(columns === "province")
          ProvinceId = response.data[columns]
        if(columns === "district")
          District = response.data[columns]

        if(columns === "birthDate")
        {
          const obj = JSON.parse(response.data[columns]);
          CalBirthDay(obj);
          setSelectedDay(obj);
          formik.setFieldValue(columns, obj.toString(), false);
        }else if (columns === "district") {
          api_amphure.filter(e => e.province_id.toString() === ProvinceId.toString()).forEach(field => { 
            JsonLearning.push({value: field.value.toString(), label:  field.label });
            JsonLearningEng.push({value: field.value.toString(), label:  field.name_en });
          });
          setDataDistrict(JsonLearning);
          setDataDistrictEng(JsonLearningEng);
          formik.setFieldValue('district',response.data[columns]);
        }else if (columns === "subDistrict") {
          api_tombon.filter(e => e.value.toString().substring(0, 4) === District.toString()).forEach(field => { 
            JsonLearning.push({value: field.value.toString(), label:  field.label });
            JsonLearningEng.push({value: field.value.toString(), label:  field.name_en });
          });
          setSubDistrict(JsonLearning)
          setSubDistrictEng(JsonLearningEng)
          formik.setFieldValue('subDistrict',response.data[columns]);
        }
        else {
          formik.setFieldValue(columns,(( response.data[columns]===null) ? '' : response.data[columns]), false);
        }
      }

      if(response.data.profilePicture !== null)
        setPostImage(FilesService.buffer64(response.data.profilePicture));
      setValue(response.data.isActivated);
      setValueConfirm(response.data.password)
      setListMembers(user);
      setIsNew(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsNew(true);
      setIsEnableControl(false);
    }
  }

  async function fetchLearning() {
    const response = await axios(urlPath+"/learning");
    const body = await response.data.listLearning;
    var JsonLearning = [];
    body.forEach(field => JsonLearning.push({value: field.id.toString(), label:  field.LearningPathNameTH }))
    setOptionsLearning(JsonLearning)
    JsonLearning = [];
    body.forEach(field => JsonLearning.push({value: field.id.toString(), label:  field.LearningPathNameENG }))
    setOptionsLearningEng(JsonLearning)
  }

  const GetAddress =  async  (type,id)=>{
    if(type === "district"){
      setDataDistrict([]);
      setDataDistrictEng([]);
      var JsonLearning = [];
      var JsonLearningEng = [];
      await api_amphure.filter(e => e.province_id.toString() === id.toString() ).forEach(field => {
          JsonLearning.push({value: field.value.toString(), label:  field.label });
          JsonLearningEng.push({value: field.value.toString(), label:  field.name_en });
      });
      setDataDistrict(JsonLearning);
      setDataDistrictEng(JsonLearningEng);
      formik.setFieldValue('district',((Storage.GetLanguage() === "th") ? JsonLearning[0].value : JsonLearningEng[0].value ));

      setSubDistrict([]);
      setSubDistrictEng([]);
      JsonLearning = [];
      JsonLearningEng = [];
      await api_tombon.filter(e => e.value.toString().substring(0, 4) === (api_amphure.filter(e => e.province_id.toString() === id.toString()))[0].value.toString()).forEach(field => { 
        JsonLearning.push({value: field.value.toString(), label:  field.label });
        JsonLearningEng.push({value: field.value.toString(), label:  field.name_en });
      });
      setSubDistrict(JsonLearning);  
      setSubDistrictEng(JsonLearningEng);
      formik.setFieldValue('subDistrict',((Storage.GetLanguage() === "th") ? JsonLearning[0].value : JsonLearningEng[0].value ));
    }
    else if(type==="subDistrict")
    {
      setSubDistrict([]);
      setSubDistrictEng([]);
      var JsonLearning = [];
      var JsonLearningEng = [];
      api_tombon.filter(e => e.value.toString().substring(0, 4) === id.toString()).forEach(field => { 
          JsonLearning.push({value: field.value.toString(), label:  field.label });
          JsonLearningEng.push({value: field.value.toString(), label:  field.name_en });
      });
      setSubDistrict(JsonLearning);  
      setSubDistrictEng(JsonLearningEng);  
      formik.setFieldValue('subDistrict',((Storage.GetLanguage() === "th") ? JsonLearning[0].value : JsonLearningEng[0].value ));
    }
  }

  const CalBirthDay =(e)=>{
    const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
    const day = diffDays(new Date(e.year+'/'+e.month+'/'+e.day), new Date());
    setDayBirth((day > 365 && new Date(e.year+'/'+e.month+'/'+e.day) < new Date()) ? parseInt(day/365) : 0 )
  }
  
  useEffect(()=>{
      var JsonLearning = [];
      var JsonLearningEng = [];
      api_province.forEach(field => { 
          JsonLearning.push({value: field.value.toString(), label:  field.label });
          JsonLearningEng.push({value: field.value.toString(), label:  field.name_en });
      });
      setDataProvice(JsonLearning)
      setDataProviceEng(JsonLearningEng)
      GetAddress("district",1);
      GetAddress("subDistrict",1001);
      fetchData();
      fetchLearning();
  },[]);

  const EnableControl = (bool) => {
    setIsEnableControl(bool);
    if(bool)
      formik.setErrors({})
  }


  return (
    <>
      {isLoading ? ( <> <Spinner  customText={"Loading"}/></>) : (<></>)}
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 ">
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-blueGray-100 border-0">
            <form onSubmit={formik.handleSubmit}> 
            <div className="rounded-t-2xl bg-white mb-0 px-4 py-4">
              <div className="text-center flex justify-between ">
                <div>
                  <h3 className="text-blueGray-700 text-lg font-bold mt-2">{locale.t("Menu.lblAccount")}</h3>
                </div>
                <div>
                  {(enableControl && !isNew) ? <button
                    className="bg-green-mju text-white active:bg-lightBlue-600 font-bold  text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ () => {EnableControl(false)}}
                  >
                  <i className="fas fa-pencil-alt"></i>&nbsp;{locale.t("Button.lblEdit")}
                  </button> :
                  <>
                    <button
                      className={"bg-rose-mju text-white active:bg-rose-mju font-bold  text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" + ((isNew ? " hidden" : " "))}
                      type="button"
                      onClick={() =>{EnableControl(true)}}
                    >
                    <i className="fas fa-pencil-alt"></i>&nbsp;{locale.t("Button.lblDrop")}
                    </button>     
                    <button
                      className="bg-blue-save-mju text-white active:bg-blueactive-mju font-bold  text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" 
                      type="submit"
                      >
                    <i className="fas fa-save"></i>&nbsp;{locale.t("Button.lblInsert")}
                    </button>
                  </>
                  }
                </div>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="flex flex-wrap  mt-6">
                  <div className="w-full lg:w-2/12 px-4">
                    <div className="relative w-full mb-3">
                      <div className="image-upload">
                        <label htmlFor="file-input" className="cursor-pointer">
                          <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src={  ((postImage) ? postImage  :  require("assets/img/noimg.png").default) }
                          />
                        </label>
                        <input id="file-input" type="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => handleFileUpload(e)}  disabled={enableControl} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-10/12">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative lg:w-6/12  mb-3">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                            {locale.t("Account.info.lblAccountCode")}<span className="text-red-500"> *</span>
                          </label>
                          <input
                            type="text"
                            className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            autoComplete="off"
                            id="accountCode"
                            name="accountCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.accountCode}
                            disabled={enableControl}
                          />
                          {formik.touched.accountCode && formik.errors.accountCode ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.accountCode}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="float-right">
                          <div className="relative w-full mb-3 text-center flex justify-between">
                            <span className="text-sm font-bold text-center flex justify-between"><span className="mt-2">{locale.t("Account.info.lblActive")}</span> &nbsp; 
                            <Switch 
                              isOn={value}
                              id="isActivated"
                              name="isActivated"
                              onColor="#69ac2b"
                              float="right"
                              handleToggle={() => {setValue(!value)}}
                              disble={enableControl}
                            />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-3-1/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                          {locale.t("Account.info.lblTitle")}
                          </label>
                            <Select
                              id="title"
                              name="title"
                              onChange={value => {formik.setFieldValue('title',value.value)}}
                              className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                              options={((Storage.GetLanguage() === "th") ? options : optionsEng)}
                              value={defaultValue(((Storage.GetLanguage() === "th") ? options : optionsEng), formik.values.title)}
                              isDisabled={enableControl}
                              />
                        </div> 
                      </div>
                      <div className="w-full lg:w-3-2/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block  text-blueGray-600 text-sm font-bold mb-2"
                          >
                            {locale.t("Account.info.lblFirstName")}<span className="text-red-500"> *</span>
                          </label> 
                          <input
                            type="text"
                            className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="firstName"
                            name="firstName"
                            autoComplete="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            disabled={enableControl}
                          />
                          {formik.touched.firstName && formik.errors.firstName ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.firstName}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-full lg:w-3-2/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block  text-blueGray-600 text-sm font-bold mb-2"
                          >
                            {locale.t("Account.info.lblLastName")}<span className="text-red-500"> *</span>
                          </label>
                          <input
                            type="text"
                            className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="lastName"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            disabled={enableControl}
                            autoComplete="lastName"
                          />
                          {formik.touched.lastName && formik.errors.lastName ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.lastName}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}

                {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold ">
                  Contact Information
                </h6> */}
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                      {locale.t("Account.list.lblEmail")}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        disabled={enableControl}
                        autoComplete="new-password"
                      />
                      {formik.touched.email && formik.errors.email ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.email}</div>
                          ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-sm font-bold mb-2"
                      >
                        {locale.t("Account.info.lblPhoneNumber")}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="phoneNumber"
                        name="phoneNumber"
                        maxLength={10}
                        onChange={(event) => {
                          onHandleTelephoneChange(event);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        disabled={enableControl}
                        autoComplete="new-password"
                      />
                       {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.phoneNumber}</div>
                          ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-4/12">
                        <div className="w-90">
                          <label
                            className="block  text-blueGray-600 text-sm font-bold mb-2"
                          >
                            {locale.t("Account.info.lblBirthDate")}<span className="text-red-500"> *</span>
                          </label>
                          <DatePicker
                            value={selectedDay}
                            onChange={(e) => {setSelectedDay(e); CalBirthDay(e); }}
                            renderInput={renderCustomInput} // render a custom input
                            shouldHighlightWeekends
                          />
                          {formik.touched.birthDate && formik.errors.birthDate ? (
                                <div className="text-sm py-2 px-2 text-red-500">{formik.errors.birthDate}</div>
                            ) : null}
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12">
                        <div className="w-90">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                            {locale.t("Account.info.lblAge")}
                          </label>
                          <input
                                  type="text"
                                  className="border-0 px-2 py-2  w-80 mb-4 laceholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                  id="NumOfHours"
                                  name="NumOfHours"
                                  value={dayBirth}
                                  onBlur={formik.handleBlur}
                                  readOnly={true}
                                  disabled={enableControl}
                            />
                          <span className="text-xs font-bold"> &nbsp;ปี</span>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12">
                          <label
                            className="block  text-blueGray-600 text-sm font-bold mb-2"
                          >
                            {locale.t("Account.info.lblGender")}
                          </label>
                          <Select
                                id="gender"
                                name="gender"
                                onChange={value => {formik.setFieldValue('gender',value.value)}}
                                className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                                options={((Storage.GetLanguage() === "th") ? optionsGender : optionsGenderEng)}
                                value={defaultValue(((Storage.GetLanguage() === "th") ? optionsGender : optionsGenderEng), formik.values.gender)}
                                isDisabled={enableControl}
                                />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Account.info.lblGroup")}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="groupMember"
                        name="groupMember"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.groupMember}
                        disabled={enableControl}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Account.list.lblRole")}
                      </label>
                      <Select  
                        id="role"
                        name="role"
                        onChange={value => {  formik.setFieldValue('role',value.value)}}
                        //value={formik.values.title}
                        className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm-select shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                        options={((Storage.GetLanguage() === "th") ? optionsRole : optionsRoleEng)} 
                        value={defaultValue(((Storage.GetLanguage() === "th") ? optionsRole : optionsRoleEng), formik.values.role)}
                        isDisabled={enableControl || formik.values.email === "admin@mju.ac.th"}/>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Account.list.lblLearningPath")}
                      </label>
                      <Select
                        id="learningPathId"
                        name="learningPathId"
                        onChange={value => {  formik.setFieldValue('learningPathId',value.value)}}
                        //value={formik.values.title}
                        className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm-select shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                        options={((Storage.GetLanguage() === "th") ? optionsLearning : optionsLearningEng)} 
                        value={defaultValue(((Storage.GetLanguage() === "th") ? optionsLearning : optionsLearningEng), formik.values.learningPathId)}
                        isDisabled={enableControl}/>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-4">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Account.info.lblPassword")}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="password"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="password"
                        name="password"
                        onChange={(e) => {
                          if(e.target.value !== valueConfirm ) 
                          {
                            setConfirmPassword(e.target.value);
                          }
                          else if (e.target.value === "" && valueConfirm === "")
                          {
                            setConfirmPassword(null);
                          }
                          formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        disabled={enableControl}
                      />
                      {formik.touched.password && formik.errors.password ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.password}</div>
                          ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-4">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Account.info.lblConfirmPassword")}
                      </label>
                      <input
                        type="password"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={e=>{ validateConfirm(e.target.value); setValueConfirm(e.target.value); }}
                        disabled={enableControl}
                        value={valueConfirm}
                      />
                      {confirmPassword ? (
                              <div className="text-sm py-2 px-2 text-red-500">* รหัสผ่านไม่ตรงกัน</div>
                          ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-5">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Account.info.lblAddress")}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="address"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        disabled={enableControl}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 mb-4">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                            {locale.t("Account.info.lblProvince")}
                          </label>
                            <Select  
                              id="province"
                              name="province"
                              onChange={value => { 
                                formik.setFieldValue('province',value.value); 
                                GetAddress("district",value.value); 
                              }}
                              className="border-0 placeholder-blueGray-300 w-90 text-blueGray-600 bg-white rounded text-sm-select shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                              options={((Storage.GetLanguage() === "th") ? dataProvice : dataProviceEng)} 
                              menuPlacement="top"
                              value={defaultValue(((Storage.GetLanguage() === "th") ? dataProvice : dataProviceEng), formik.values.province)}
                              isDisabled={enableControl}/>
                        </div>
                        <div className="w-full lg:w-4/12 mb-4">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                            {locale.t("Account.info.lblDistrict")}
                          </label>
                            <Select  
                              id="district"
                              name="district"
                              onChange={value => {  formik.setFieldValue('district',value.value);
                              GetAddress("subDistrict",value.value);}}
                              className="border-0 placeholder-blueGray-300 w-90 text-blueGray-600 bg-white rounded text-sm-select shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                              options={((Storage.GetLanguage() === "th") ? dataDistrict : dataDistrictEng)} 
                              menuPlacement="top"
                              value={defaultValue(((Storage.GetLanguage() === "th") ? dataDistrict : dataDistrictEng), formik.values.district)}
                              isDisabled={enableControl}/>
                        </div>
                        <div className="w-full lg:w-4/12">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                            {locale.t("Account.info.lblSubDistrict")}
                          </label>
                            <Select  
                              id="subDistrict"
                              name="subDistrict"
                              onChange={value => {  formik.setFieldValue('subDistrict',value.value)}}
                              className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm-select shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                              options={ ((Storage.GetLanguage() === "th") ? dataSubDistrict : dataSubDistrictEng)} 
                              menuPlacement="top"
                              value={defaultValue( ((Storage.GetLanguage() === "th") ? dataSubDistrict : dataSubDistrictEng), formik.values.subDistrict)}
                              isDisabled={enableControl}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Account.info.lblDescription")}
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows="6"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        disabled={enableControl}
                        autoComplete="new-password"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
        </div>
      </div>
    </>
  );
}
