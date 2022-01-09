import React,{useState} from "react";
import Switch from "components/Toggles/Switch";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// components



export default  function Learning() {

  const [state, setState] = useState({ value: null });
  const handleChange = value => {
    console.log(value);
    setState({ value });
  };

  const [stateEng, setStateEng] = useState({ value: null });
  const handleChangeEng = value => {
    setStateEng({ value });
  };
  
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-4 py-4">
              <div className="text-center flex justify-between ">
                <h6 className="text-blueGray-700 text-xl font-bold mt-2">จัดการเส้นทางการเรียนรู้</h6>
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
                  <div className="w-full px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        รหัสเส้นทางการเรียนรู้
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
  
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        ชื่อเส้นทางการเรียนรู้ (ไทย)
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
                        ชื้่อเส้นทางการเรียนรู้ (ENG)
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
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
                        htmlFor="grid-password"
                      >
                        รายละเอียดเส้นทางการเรียนรู้ (ไทย)
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
                        รายละเอียดเส้นทางการเรียนรู้ (ENG)
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
