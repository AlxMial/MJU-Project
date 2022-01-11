import React from 'react'
import './home.css'

import AdminTopNavBar from "components/Navbars/AdminTopNavBar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import Card from './card';


export default function home() {
    return (
        <div>
            <AdminTopNavBar fixed />
            {/* <HeaderStats /> */}
            <div className="relative pt-20 pb-32 flex min-h-screen-35 bg-darkgreen-mju">
                <div className="container px-4 relative mx-auto w-10/12">
                    <div className="w-full x-4 ml-auto mr-auto px-4">
                        <h1 className="text-white font-semibold text-5xl">
                            สวัสดี...
                        </h1>
                        <p className="mt-4 text-lg text-blueGray-200">
                            ยินดีต้อนรับสู่ห้องเรียนออแกนิค
                        </p>
                    </div>
                </div>
            </div>
            <div className="container px-4 mx-auto -mt-24 w-10/12">
                <div className="flex flex-wrap">
                    <div className="w-full px-4 flex-1">
                        <Card value={['./', 'ปฏิทิน']}></Card>
                    </div>
                    <div className="w-full px-4 flex-1">
                        <Card value={['./Curriculum', 'การปลูก']}></Card>
                    </div>
                    <div className="w-full px-4 flex-1">
                        <Card value={['./', 'การแปรรูป']}></Card>
                    </div>
                </div>
            </div>
        </div >
    )
}
