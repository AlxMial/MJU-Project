import React from "react";
import { Link } from "react-router-dom";
// components
import TableDropdown from 'components/Dropdowns/TableDropdown';

export default function LearningList() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
            <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-white"}>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    {/* <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                จัดการข้อมูลผู้ใช้
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={"font-semibold text-lg text-blueGray-700"}>
                            |
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={"font-semibold text-sm text-blueGray-700"}>
                            0 รายการ
                            </h3>
                        </div>
 
                        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                            <div className="relative flex w-full flex-wrap items-stretch">
                            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3  py-3">
                                <i className="fas fa-search"></i>
                            </span>
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-12"
                            />
                            </div>
                        </form>
                        <button
                        className="bg-white text-black active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        >
                        <i class="fas fa-plus text-green-mju"></i> เพิ่ม
                        </button>
                    </div> */}
                    <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap ">
                        {/* Brand */}
                            <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                จัดการเส้นทางการเรียนรู้
                            </h3>
                            <h3 className={"font-semibold px-2 text-lg text-blueGray-700"}>
                                |
                            </h3>
                            <h3 className={"font-semibold text-sm text-blueGray-700"}>
                                0 จำนวนรายการ
                            </h3>
                        {/* Form */}
                        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                            <div className="relative flex w-full flex-wrap items-stretch">
                            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i className="fas fa-search"></i>
                            </span>
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                            </div>
                        </form>
                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <Link to="/admin/learning" ><button
                            className="bg-white text-black active:bg-lightBlue-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            >
                            <i className="fas fa-plus text-green-mju"></i> เพิ่ม
                            </button></Link>
                        </ul>
                    </div>
                    
                </div>
                <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                    <tr>
                        <th
                        className={"text-center px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                        >
                        <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                        />
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        ชื่อเส้นทางการเรียนรู้ (ไทย)
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        ชื่อเส้นทางการเรียนรู้ (ENG)
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100 text-right"
                        }
                        >
                        จำนวนหลักสูตร
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        ></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                        <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                        />
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <Link to="/admin/learning" >ผู้เยี่ยมชม</Link>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <Link to="/admin/learning" >guest@undefined.co.th</Link>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <div className="flex float-right">
                                52
                            </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <TableDropdown />
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
