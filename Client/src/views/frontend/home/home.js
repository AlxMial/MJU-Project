import React from 'react'
import './home.css'

import AdminTopNavBar from "components/Navbars/AdminTopNavBar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import Card from './card';

export default function home() {
    return (
        <div>
            <AdminTopNavBar fixed />
            <HeaderStats />
            <div className="container px-4 mx-auto -mt-32">
                <div className="flex flex-wrap">
                    <div className="w-full px-4 flex-1">
                        <Card value={['./', 'ปฏิทิน']}></Card>
                    </div>
                    <div className="w-full px-4 flex-1">
                        <Card value={['./', 'การปลูก']}></Card>
                    </div>
                    <div className="w-full px-4 flex-1">
                        <Card value={['./', 'การแปรรูป']}></Card>
                    </div>
                </div>
            </div>
        </div >
    )
}
