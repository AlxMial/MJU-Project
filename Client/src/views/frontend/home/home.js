import React,{ useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './home.css'
import Card from './card';
import * as Storage from "../../../../src/services/Storage.service";
import Modal from "react-modal";
const locale = require("react-redux-i18n").I18n;

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding:'0%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'auto',
    overflowX: 'auto',
    backgroundColor:"#F1F5F9"
  },overlay: {zIndex: 100, backgroundColor: 'rgba(70, 70, 70, 0.5)',}
};

export default function Home() {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
      };

    function openModal(type,email) {
        if(email !== "guest@mju.ac.th" && email !== "admin@mju.ac.th"){
            setIsOpen(true);
        }
    }

    function afterOpenModal(type) {
        // references are now sync'd and can be accessed.   
    }

    function closeModal() {
        setIsOpen(false);
    }

    const items = [
        { id: "01", path: "/home/Curriculum/1", name: "ปฏิทิน",picture:"assets/img/calendar.png" , nameeng: "Calendar"},
        { id: "02", path: "/home/Curriculum/2", name: "การปลูก",picture:"assets/img/planting.png" , nameeng: "Production"},
        { id: "03", path: "/home/Curriculum/3", name: "การแปรรูป",picture:"assets/img/processing.png" , nameeng: "Processing"}
    ];
    
    const itemList = items.map((item) => (
        <div key={item.id} className={"w-full px-4 card-max-height" + ((windowWidth < 1024) ? ' ' : ' flex-1')}>
            <Card value={[item.path,item.name,item.picture]}></Card>
        </div>
    ));
    
    const itemListEng = items.map((item) => (
        <div key={item.id} className={"w-full px-4 card-max-height" + ((windowWidth < 1024) ? ' ' : ' flex-1')}>
            <Card value={[item.path,item.nameeng,item.picture]}></Card>
        </div>
    ));

    useEffect( ()=>  {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", resizeWindow);
        return () => { window.removeEventListener("resize", resizeWindow); };
      },[]);

    return (
        <>
            <div className="relative pt-24 pb-20 flex max-h-screen-37 bg-darkgreen-mju">
                <div className={"container relative mx-auto w-10/12" + ((windowWidth < 1024) ? ' ' : ' px-4') }>
                    <div className={"w-full ml-auto mr-auto " + ((windowWidth < 1024) ? ' ' : ' px-4') }>
                        <h1 className="text-white font-semibold text-5xl">
                            {locale.t("home.lblhome")}
                        </h1>
                        <p className="mt-4 text-lg text-blueGray-200 text-bold  THSarabunBold">
                            {locale.t("home.lblwelcome")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="container px-4 mx-auto -mt-16 ">
                {(Storage.GetLanguage() === "th") ?  
                    <div className="flex flex-wrap">{itemList}</div>:
                    <div className="flex flex-wrap">{itemListEng}</div> }
            </div>
        </>
    )
}
