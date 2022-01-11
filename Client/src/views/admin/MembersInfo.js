import React,{useState} from "react";
import Switch from "components/Toggles/Switch";
import FilesService from '../../services/files'
// components

export default function Members() {

  const [value, setValue] = useState(true);
  const [postImage, setPostImage] = useState("");

  const handleFileUpload = async (e) => {
    const base64 = await FilesService.convertToBase64(e.target.files[0]);
    setPostImage(base64);
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-4 py-4">
              <div className="text-center flex justify-between ">
                <h6 className="text-blueGray-700 text-xl font-bold mt-2">จัดการบัญชีผู้ใช้</h6>
                <button
                  className="bg-green-mju text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                 <i className="fas fa-pencil-alt"></i>&nbsp;แก้ไข
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
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
                        <input id="file-input" type="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => handleFileUpload(e)} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-10/12">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative lg:w-6/12  mb-3">
                          <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2">
                            รหัสบัญชีผู้ใช้
                          </label>
                          <input
                            type="text"
                            className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="lucky.jesse"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="float-right">
                          <div className="relative w-full mb-3 text-center  flex justify-between">
                            <span className="text-sm font-bold text-center  flex justify-between"><span className="mt-2">เปิดใช้งาน</span> &nbsp; 
                            <Switch 
                              isOn={value}
                              onColor="#0EA6E9"
                              float="right"
                              handleToggle={() => {setValue(!value)
                              console.log("text")}}
                            />
                            </span>
                            
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-3-1/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                 
                          >
                            คำนำหน้า
                          </label>
                          <select className="border-0 px-4 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                            <option value="1">นาย</option>
                            <option value="2">นาง</option>
                            <option value="3">นางสาว</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-full lg:w-3-2/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                   
                          >
                            ชื่อ
                          </label>
                          <input
                            type="text"
                            className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Lucky"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-3-2/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
             
                          >
                            นามสกุล
                          </label>
                          <input
                            type="text"
                            className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Jesse"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}

                {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6> */}
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        อีเมล
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        เบอร์โทร
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        บทบาท
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        เส้นทางการเรียนรู้ที่สนใจ
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        รหัสผ่าน
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        ยืนยันรหัสผ่าน
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        รหัสผ่าน
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        ยืนยันรหัสผ่าน
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        ที่อยู่
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        รายละเอียด
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
        </div>
      </div>
    </>
  );
}
