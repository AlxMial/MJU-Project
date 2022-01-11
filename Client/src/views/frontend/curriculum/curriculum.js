import React from 'react'
import { useHistory } from "react-router-dom";

import AdminTopNavBar from "components/Navbars/AdminTopNavBar.js";

export default function Curriculum() {

    const history = useHistory();

    return (
        <div>
            <AdminTopNavBar fixed />
            {/* <HeaderStats /> */}
            <div className="relative pt-20 pb-32 flex min-h-screen-35 bg-darkgreen-mju">
                <div className="container px-4 relative mx-auto w-10/12">
                    <div className="w-full x-4 ml-auto mr-auto px-4">
                        <i className="fas fa-arrow-left text-white font-semibold text-lg cursor-pointer " onClick={() => history.goBack()}></i>
                        <h1 className="text-white font-semibold text-5xl">
                            ค้นหาหลักสูตร
                        </h1>
                        <p className="mt-4 text-lg text-blueGray-200">
                            ...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
