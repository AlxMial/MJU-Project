import React from 'react'
import { useHistory } from "react-router-dom";
import './curriculum.css'

export default function Curriculum() {

    const history = useHistory();

    return (
        <>
            <div className="relative pt-20 pb-32 flex max-h-screen-35 bg-darkgreen-mju">
                <div className="container px-4 relative mx-auto w-10/12 mt-2">
                    <div className="w-full x-4 ml-auto mr-auto px-4">
                        <i className="fas fa-arrow-left text-white text-sm cursor-pointer " onClick={() => history.goBack()}>
                            <span>กลับ</span>
                        </i>
                        <div className="container px-4 relative mx-auto w-6/12 justify-center frmSearch">
                            <div className="w-full x-4 ml-auto mr-auto px-4">
                                <h1 className="text-white font-semibold text-sm">
                                    ค้นหาหลักสูตร
                                </h1>
                                <div className='flex mt-1'>
                                    <label className="block uppercase text-white text-sm font-bold mb-2 label-form"> ค้นหา </label >
                                    <input className='text-form border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150'
                                        type="text"
                                        name="username"
                                    />
                                </div>
                                <div className='flex mt-1'>
                                    <label className="block uppercase text-white text-sm font-bold mb-2 label-form"> แท็ก </label >
                                    <textarea className='text-form border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150'>

                                    </textarea>
                                </div>

                                <div className='flex flex-wrap mt-1'>
                                    <label className='label-form'></label>
                                    <button
                                        className="bg-green-mju text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button">
                                        <i className="fas fa-cog"></i>&nbsp;ตั้งค่า
                                    </button>
                                    <button
                                        className="bg-green-mju text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button">
                                        <i className="fas fa-filter"></i>&nbsp;ใช้ตัวกรอง
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
