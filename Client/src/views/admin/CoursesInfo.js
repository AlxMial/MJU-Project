import React,{useState} from "react";
import Switch from "components/Toggles/Switch";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select'
import { TagsInput } from "react-tag-input-component";

export default function Courses() {



 
  const [stateEng, setStateEng] = useState({ value: null });
  const handleChangeEng = value => {
    setStateEng({ value });
  };

  const [state, setState] = useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };

  /*จำนวนนาทีสำหรับหลักสูตร*/
  const [numberMinute, setNumberMinute] = useState("0");
  const onHandleTelephoneChange = (e) => {
    const re = /^[0-9\b]+$/;
    console.log(e.target.value)
    // if value is not blank, then test the regex
    if (e.target.value === '' || re.test(e.target.value)) {
      setNumberMinute(e.target.value)
    }
  };

  /*จำนวนชั่วโมงสำหรับหลักสูตร*/
  const [numberHour, setNumberHour] = useState("0");
  const onHandleHourChange = (e) => {
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex
    if (e.target.value === '' || re.test(e.target.value)) {
      setNumberHour(e.target.value)
    }
  };

  const [selected, setSelected] = useState([]);

  const [enableInput,setEnableInput] = useState(true);

  const [headName , setHeadName] = useState("หลักสูตร");
  const PageChange = (e) => {
      setHeadName(e);
  }

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
                    <i class="fas fa-book-reader"></i> &nbsp;จัดการหัวข้อการเรียนรู้
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
                        htmlFor="grid-password"
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
                            htmlFor="grid-password"
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
                            htmlFor="grid-password"
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
                        htmlFor="grid-password"
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
                        htmlFor="grid-password"
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
                        htmlFor="grid-password">
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
                        htmlFor="grid-password"
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
                        htmlFor="grid-password"
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
                        htmlFor="grid-password"
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
                        htmlFor="grid-password"
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
              <span className="text-blueGray-700 text-base font-bold py-2">หลักสูตร : <label className="text-blue-mju ">หน่วยที่ 1.1 ข้าวเพื่อชีวิตและสังคม (6 ชั่วโมง 0 นาที) </label></span>
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
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                          <> ลบ</> | <>จัดการเนื้อหา</>
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
