import React,{useState,useEffect} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from "react-tag-input-component";
import Modal from "react-modal";
import axios from "axios";
import FilesService from '../../services/files'
import ValidateService from '../../services/validateValue'
import DateTimesService from '../../services/datetimes'


Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding:'0%',
    width:'80%',
    height:'90%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'auto',
    overflowX: 'auto',
  },overlay: {zIndex: 1000, backgroundColor: 'rgba(70, 70, 70, 0.5)',}
};


export default function Courses() {
  
  const [state, setState] = useState({ value: null });
  const [stateEng, setStateEng] = useState({ value: null });
  const [listCourse, setListCourse] = useState([]);
  const [numberMinute, setNumberMinute] = useState("0");
  const [numberHour, setNumberHour] = useState("0");
  const [selected, setSelected] = useState([]);
  const [enableInput,setEnableInput] = useState(true);
  const [headName , setHeadName] = useState("หลักสูตร");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [stateModalEng, setStateModalEng] = useState({ value: null });


  
  const handleChangeEng = value => {
    setStateEng({ value });
  };

  const handleChange = value => {
    setState({ value });
  };

  /*จำนวนนาทีสำหรับหลักสูตร*/
  const onHandleTelephoneChange = (e) => {
    if(ValidateService.onHandleNumberChange(e.target.value) !== "" || e.target.value === "" )
      setNumberMinute(e.target.value)
  };

  /*จำนวนชั่วโมงสำหรับหลักสูตร*/
  const onHandleHourChange = (e) => {
      if(ValidateService.onHandleNumberChange(e.target.value) !== "" || e.target.value === "" )
        setNumberHour(e.target.value)
  };

  const PageChange = (e) => {
      setHeadName(e);
  }

 
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.   
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [stateModal, setStateModal] = useState({ value: null });
  const handleChangeModal = value => {
    setStateModal({ value });
  };

  const handleChangeModalEng = value => {
    setStateModalEng({ value });
  };

  const handleFileUpload = async (e) => {
    const base64 = await FilesService.convertToBase64(e.target.files[0]);
    const data = {title:e.target.files[0].name, type:e.target.files[0].type,filebase64:base64 ,size:e.target.files[0].size};
    onSubmit(data);
  };

  const onSubmit = (data) => {
      axios.post("http://localhost:3001/courses",data).then((response)=>{
      if(response.data.error) 
      {
        console.log(response.data.error);
      }else{
        console.log("success");
        setListCourse([...listCourse, data]);
      }
    });
  };

  useEffect(()=>{
        axios.get("http://localhost:3001/courses").then((response) =>  {
        setListCourse(response.data.listOfCourses);
      });
  },[]);

  return (
    <>
      <div className="flex flex-wrap lg:w-6/12 ">
        <div className="w-full lg:w-6/12 px-4">
          <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 " + ((headName === "หลักสูตร") ? "bg-green-mju" : "bg-blueGray-100")}>
            <div className="flex flex-wrap cursor-pointer " onClick={()=> {PageChange("หลักสูตร")}}>
              <div className="w-full lg:w-2/12 py-2 px-2 text-sm text-center align-middle  ">
                <span className={"w-10 h-10 text-sm  inline-flex items-center justify-center  rounded-full " + ((headName === "หลักสูตร") ? "bg-white" : "bg-green-mju")}>
                  <label className={"w-full align-middle font-bold cursor-pointer " + ((headName === "หลักสูตร") ? "text-green-mju" : "text-white") } onClick={()=> {PageChange("หลักสูตร")}}>1</label>
                </span>
              </div>
              <div className="w-full lg:w-10/12 py-2 px-2 text-base  align-middle ">
                <span className="text-sm inline-flex">
                  <label className={"w-full align-middle font-bold pt-3 cursor-pointer " + ((headName === "หลักสูตร") ? "text-white" : "text-black")} onClick={()=> {PageChange("หลักสูตร")}}>จัดการหลักสูตร</label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "bg-green-mju" : "bg-blueGray-100")}>
            <div className="flex flex-wrap cursor-pointer" onClick={()=> {PageChange("หัวข้อการเรียนรู้ / เนื้อหา")}}>
              <div className="w-full lg:w-2/12 py-2 px-2 text-sm text-center align-middle ">
                <span className={"w-10 h-10 text-sm  inline-flex items-center justify-center rounded-full " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "bg-white" : "bg-green-mju")}>
                  <label className={"w-full align-middle font-bold cursor-pointer " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "text-green-mju" : "text-white") } onClick={()=> {PageChange("หัวข้อการเรียนรู้ / เนื้อหา")}}>2</label>
                </span>
              </div>
              <div className="w-full lg:w-10/12 py-2 px-2 text-base align-middle ">
                <span className="text-sm inline-flex">
                  <label className={"w-full align-middle font-bold pt-3 cursor-pointer " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "text-white" : "text-black")}  onClick={()=> {PageChange("หัวข้อการเรียนรู้ / เนื้อหา")}}>หัวข้อการเรียนรู้ / เนื้อหา</label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-4 py-4">
              <div className="text-center flex justify-between">
                <div className="">
                  
                  <h6 className="text-blueGray-700 text-xl font-bold mt-2">จัดการหลักสูตร {'>'} <label className="text-green-200-mju">{headName}</label></h6>
                </div>
                <div className="">
                  <button
                  className="bg-purple-mju text-white active:bg-purple-active font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  >
                    <i className="fas fa-book-reader"></i> &nbsp;จัดการหัวข้อการเรียนรู้
                  </button>
                  <button
                    className="bg-green-mju text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button">
                    <i className="fas fa-pencil-alt"></i>&nbsp;แก้ไข
                  </button>
                </div>
              </div>
            </div>
            <div className={"flex-auto px-4 lg:px-10 py-10 pt-4 " + ((headName === "หลักสูตร") ? "block" : "hidden") }>
              <form>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        รหัสหลักสูตร
                      </label>
                      <input
                        type="text"
                        disabled={(enableInput) ? "disabled" : ""}
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                            
                          >
                            ประเภทหลักสูตร
                          </label>
                          <select 
                            disabled={(enableInput) ? "disabled" : ""}
                            className="border-0  mb-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-90 ease-linear transition-all duration-150">
                            <option>Rice</option>
                            <option>Mangosteen</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                            
                          >
                            จำนวนชั่วโมง
                          </label>
                          <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 mb-3">
                              <input
                                type="text"
                                maxLength="2"
                                className="border-0 px-2 py-2  laceholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear w-60 transition-all duration-150"
                                onChange={(event) => {
                                  onHandleHourChange(event);
                                }}
                                value={numberHour}
                              />
                              <span className="text-xs font-bold"> &nbsp;ชั่วโมง</span>
                            </div>
                            <div className="w-full lg:w-6/12 mb-3">
                              <input
                                type="text"
                                maxLength="2"
                                className="border-0 px-2 py-2  laceholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear w-60 transition-all duration-150"
                                onChange={(event) => {
                                  onHandleTelephoneChange(event);
                                }}
                                value={numberMinute}
                              /><span className="text-xs font-bold"> &nbsp;นาที</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        ชื่อหลักสูตร (ไทย)
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        ชื่อหลักสูตร (ENG)
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                        onChange={(event) => {
                          console.log(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        >
                        ขอบเขตเนื้อหา (ไทย)
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={state.value}
                        onChange={handleChange}
                        placeholder={"Write something awesome..."}
                        modules={{
                          // syntax: true,
                          toolbar: [ 
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline','strike', 'blockquote'],
                            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
                            ['link', 'image'], 
                            ['clean'] 
                          ]
                        }}
                        formats={[
                          'header',
                          'bold', 'italic', 'underline', 'strike', 'blockquote',
                          'list', 'bullet', 'indent',
                          'link', 'image',
                          'align',
                          'code-block'
                        ]}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        ขอบเขตเนื้อหา (ENG)
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={stateEng.value}
                        onChange={handleChangeEng}
                        placeholder={"Write something awesome..."}
                        modules={{
                          // syntax: true,
                          toolbar: [ 
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline','strike', 'blockquote'],
                            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
                            ['link', 'image'], 
                            ['clean'] 
                          ]
                        }}
                        formats={[
                          'header',
                          'bold', 'italic', 'underline', 'strike', 'blockquote',
                          'list', 'bullet', 'indent',
                          'link', 'image',
                          'align',
                          'code-block'
                        ]}

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-3"
                        
                      >
                        สื่อวัสดุ / อุปกรณ์
                      </label>
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                      /> 
                       <label className="text-sm font-bold px-3 text-blueGray-600">คอมพิวเตอร์</label>
                       <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                      />
                       <label className="text-sm font-bold px-3 text-blueGray-600">LCD</label>
                       <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                      />
                       <span className="pt-2"><label className="text-sm font-bold px-3 text-blueGray-600">อื่นๆ</label></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        แท็ก
                      </label>
                      <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="tags"
                        placeHolder="enter tags"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-3"
                        
                      >
                        สื่อวัสดุ / อุปกรณ์
                      </label>
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <label className="text-sm font-bold px-3 text-blueGray-600">เอกสารอบรม</label>
                      &nbsp;
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <label className="text-sm font-bold px-3 text-blueGray-600">สื่อ VDO</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className={"flex-auto px-4 py-4 pt-4 "   + ((headName === "หลักสูตร") ? "hidden" : "block") }>
              <div className="text-center flex justify-between">
                <div className="py-2">
                  <span className="text-blueGray-700 text-base font-bold py-2">หลักสูตร : <label className="text-blue-mju ">หน่วยที่ 1.1 ข้าวเพื่อชีวิตและสังคม (6 ชั่วโมง 0 นาที) </label></span>
                </div>
                <div>
                  <button
                    className="bg-blue-mju text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={openModal}>
                    &nbsp;+ เพิ่มหัวข้อการเรียนรู้
                  </button>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      //className={'content-modal'}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="flex flex-wrap">
                        <div className="w-full">
                          <>
                            <div className="relative flex flex-col min-w-0 break-words w-full  rounded-lg bg-blueGray-100 border-0">
                              <div className="rounded-t bg-white mb-0 px-4 py-4">
                                <div className="text-center flex justify-between">
                                  <div className="">
                                    <h6 className="text-blueGray-700 text-xl font-bold mt-2">จัดการหลักสูตร {'>'} <label className="text-green-200-mju">{headName}</label></h6>
                                  </div>
                                  <div className="">
                                  </div>
                                </div>
                              </div>
                              <div className={"flex-auto px-2 py-4"}>
                              <form>
                                  <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                          
                                        >
                                          ชื่อหลักสูตร (ไทย)
                                        </label>
                                        <input
                                          type="text"
                                          className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 py-1">
                                      <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                        
                                      >
                                        ระยะเวลา
                                      </label>
                                      <div className="relative w-full mb-3">
                                        <div className="flex flex-wrap">
                                          <div className="w-full lg:w-6/12 mb-3">
                                            <input
                                              type="text"
                                              maxLength="2"
                                              className="border-0 px-2 py-2  laceholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear w-60 transition-all duration-150"
                                              onChange={(event) => {
                                                onHandleHourChange(event);
                                              }}
                                              value={numberHour}
                                            />
                                            <span className="text-xs font-bold"> &nbsp;ชั่วโมง</span>
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="w-full lg:w-6/12 px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                          
                                        >
                                          หัวข้อการเรียนรู้ (ไทย)
                                        </label>
                                        <input
                                          type="text"
                                          className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                          
                                        >
                                          หัวข้อการเรียนรู้ (ENG)
                                        </label>
                                        <input
                                          type="text"
                                          className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full  px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                          
                                        >
                                          เนื้อหา (ไทย)
                                        </label>
                                        <ReactQuill
                                          theme="snow"
                                          value={state.value}
                                          onChange={handleChange}
                                          placeholder={"Write something awesome..."}
                                          modules={{
                                            // syntax: true,
                                            toolbar: [ 
                                              [{ 'header': [1, 2, false] }],
                                              ['bold', 'italic', 'underline','strike', 'blockquote'],
                                              [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                                              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
                                              ['link', 'image'], 
                                              ['clean'] 
                                            ]
                                          }}
                                          formats={[
                                            'header',
                                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                                            'list', 'bullet', 'indent',
                                            'link', 'image',
                                            'align',
                                            'code-block'
                                          ]}
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full  px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                          
                                        >
                                          เนื้อหา (ENG)
                                        </label>
                                        <ReactQuill
                                          theme="snow"
                                          value={state.value}
                                          onChange={handleChange}
                                          placeholder={"Write something awesome..."}
                                          modules={{
                                            // syntax: true,
                                            toolbar: [ 
                                              [{ 'header': [1, 2, false] }],
                                              ['bold', 'italic', 'underline','strike', 'blockquote'],
                                              [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                                              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
                                              ['link', 'image'], 
                                              ['clean'] 
                                            ]
                                          }}
                                          formats={[
                                            'header',
                                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                                            'list', 'bullet', 'indent',
                                            'link', 'image',
                                            'align',
                                            'code-block'
                                          ]}
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full mt-2  px-4 ">
                                      <div className="relative w-full mb-3">
                                        <div className=" flex justify-between align-middle  mb-2">
                                          <div>
                                            <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2 mt-2">
                                              ไฟล์แนบ
                                            </label>
                                          </div>
                                          <div>
                                            <div className="image-upload  ">
                                              <label
                                                className="bg-purple-mju text-white mb-2 px-2 py-2 active:bg-purple-active font-bold uppercase text-xs rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                //type="button"
                                                htmlFor="file-input" 
                                                >
                                                  <i className="fas fa-book-reader"></i> &nbsp;แนบไฟล์
                                              </label>
                                              <input 
                                                type="file" 
                                                id="file-input"
                                                accept="image/jpg, image/jpeg, image/png"
                                                onChange={(e) => handleFileUpload(e)}/>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                          <div className="relative w-full mb-3">
                                            <div className="block w-full overflow-x-auto">
                                            <table className="items-center w-full bg-transparent border-collapse">
                                              <thead>
                                                <tr>
                                                    <th
                                                    className={" px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                                                    >
                                                    </th>
                                                    <th
                                                    className={" px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                                                    >
                                                      ชื่อ
                                                    </th>
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    }
                                                    >
                                                      วันที่
                                                    </th>
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    }
                                                    >
                                                     ขนาดไฟล์
                                                    </th>
                               
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    }
                                                    >
                                                    </th>
                                                </tr>
                                              </thead>
                                              <tbody className="pt-2">
                                                { listCourse.map((value,key) => {
                                                  return (    
                                                    <>
                                                      <tr>
                                                        <td className=" float-right border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 font-bold">
                                                          <img
                                                              alt="..."
                                                              className="w-8"
                                                              src={require("assets/img/"+ FilesService.changeImageType(value.type)).default}
                                                          />
                                                        </td>
                                                        <td className="text-left border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 font-bold">
                                                          <a download={value.title} href={FilesService.buffer64(value.filebase64)} >{value.title}</a>
                                                        </td>
                                                        <th className="text-left  border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 ">
                                                          {DateTimesService.formatDate(value.createdAt)}
                                                        </th>
                                                        <th className="text-left border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 ">
                                                          {value.type}
                                                        </th>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 font-bold">
                                                          <label className="text-red-500 cursor-pointer"> <i className="fas fa-trash"></i> ลบ</label>
                                                        </td>
                                                      </tr>
                                                    </>
                                                  )})}
                                              </tbody>
                                            </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          </>
                        </div>
                      </div>
                    </Modal>
                </div>
              </div>           
              <div className="block w-full overflow-x-auto mt-4">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                        <th
                        className={"text-center px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                        >
                          ระยะเวลา
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                          หัวข้อการเรียนรู้
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                          30 นาที
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-bold">
                          ความรู้พื้นฐาน ถิ่นกำเนิด ความสำคัญของข้าวต่อการมีชีวิตและความเป็นอยู่ของคนในสังคมโลก
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-bold">
                          <label className="text-red-500 cursor-pointer"> <i className="fas fa-trash"></i> ลบ</label>&nbsp; | &nbsp;<label className="text-blue-mju cursor-pointer"><i className="fas fa-pencil-alt"></i> จัดการเนื้อหา</label>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
        </div>
      </div>
      
    </>
  );
}
