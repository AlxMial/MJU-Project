import React from 'react'
import './home.css'
import Card from './card';
import * as Storage from "../../../../src/services/Storage.service";
const locale = require("react-redux-i18n").I18n;
const items = [
    { id: "01", path: "/home/Curriculum/1", name: "ปฏิทิน",picture:"assets/img/calendar.png" , nameeng: "Calendar"},
    { id: "02", path: "/home/Curriculum/2", name: "การปลูก",picture:"assets/img/planting.png" , nameeng: "Production"},
    { id: "03", path: "/home/Curriculum/3", name: "การแปรรูป",picture:"assets/img/processing.png" , nameeng: "Processing"}
];

const itemList = items.map((item) => (
    <div key={item.id} className="w-full px-4 flex-1 card-max-height">
        <Card value={[item.path,item.name,item.picture]}></Card>
    </div>
));

const itemListEng = items.map((item) => (
    <div key={item.id} className="w-full px-4 flex-1 card-max-height">
        <Card value={[item.path,item.nameeng,item.picture]}></Card>
    </div>
));

export default function home() {
    return (
        <>
            <div className="relative pt-20 pb-32 flex max-h-screen-37 bg-darkgreen-mju">
                <div className="container px-4 relative mx-auto w-10/12">
                    <div className="w-full x-4 ml-auto mr-auto px-4">
                        <h1 className="text-white font-semibold text-5xl">
                            {locale.t("home.lblhome")}
                        </h1>
                        <p className="mt-4 text-lg text-blueGray-200 text-bold  THSarabunBold">
                            {locale.t("home.lblwelcome")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="container px-4 mx-auto -mt-16 w-10/12">
               
                    {(Storage.GetLanguage() === "th") ?  <div className="flex flex-wrap">{itemList}</div>: <div className="flex flex-wrap">{itemListEng}</div> }
                
            </div>
        </>
    )
}
