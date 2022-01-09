import React from "react";
import Select from 'react-select'

export default function Register() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-12/12 px-4">
          <div className="flex flex-wrap relative min-w-0 break-words w-full shadow-lg rounded-lg border-0">
            <div className="w-1/2 bg-darkgreen-mju  text-white rounded-t-l-lg rounded-b-l-lg  pt-12 pl-4 pr-4 pb-2">
                <h2 className="text-2xl text-bold">INFORMATION</h2>
                <br/>
                <span className="text-xs">
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                </span>
                <br/>
                <br/>
                <span  className="text-xs">
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                </span>
                <br/>
                <br/>
                <span  className="text-xs">
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                  Laboris mollit reprehenderit officia nisi fugiat ex commodo nisi nulla. Aliquip id magna ea occaecat. Adipisicing laborum commodo ullamco amet aliquip nulla ex minim elit velit mollit nostrud in officia.
                </span>
            </div>
            <div className="w-1/2 bg-white  text-black rounded-t-r-lg rounded-b-r-lg pt-12 pl-4 pr-4 pb-2">
                <h2 className="text-2xl text-bold text-green-mju">REGISTER FORM</h2>
                <div className="flex flex-wrap relative mt-5">
                  <div className="w-full lg:w-6/12">
                      <div className="relative w-full mb-3 px-2">
                        <label
                          className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12">
                      <div className="relative w-full mb-3 px-2">
                        <label
                          className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                </div>
                <div className="relative w-full px-2 mt-2">
                    <label
                      className="block text-blueGray-600 text-sm font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Role
                    </label>
                    {/* <Select   options={options} /> */}
 
                    <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                      <option>Student</option>
                      <option>Farmer</option>
                    </select>
                  
                </div>
                <div className="relative w-full px-2 mt-4">
                  <label
                    className="block text-blueGray-600 text-sm font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Your Email
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Your Email"
                  />
                </div>
                <div className="relative w-full px-2 mt-4">
                  <label
                    className="block text-blueGray-600 text-sm font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Interesting Learning Path
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <option>Rice</option>
                    <option>Mangosteen</option>
                  </select>
                  {/* <Select  className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" options={options} /> */}

                </div>
                <div className="flex flex-wrap relative mt-4">
                  <div className="w-full lg:w-6/12">
                    <div className="relative w-full mb-3 px-2">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12">
                    <div className="relative w-full mb-3 px-2">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >Confirm Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 px-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox  rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
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
                      className="bg-darkgreen-mju text-white active:bg-darkgreenactive-mju text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      REGISTER
                    </button>
                  </div>
            </div>
          </div>
        </div>


          
        </div>
      </div>
    </>
  );
}
