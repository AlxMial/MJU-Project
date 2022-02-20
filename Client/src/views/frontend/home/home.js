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
        <div key={item.id} className="w-full px-4 flex-1 card-max-height">
            <Card value={[item.path,item.name,item.picture]}></Card>
        </div>
    ));
    
    const itemListEng = items.map((item) => (
        <div key={item.id} className="w-full px-4 flex-1 card-max-height">
            <Card value={[item.path,item.nameeng,item.picture]}></Card>
        </div>
    ));

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
            {/* <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
            <div className="flex flex-wrap">
                <div className="w-full ">
                    <>
                    <div className="relative flex flex-col min-w-0 break-words w-full  rounded-lg  border-0">
                    <div className="rounded-t bg-white mb-0 px-4 py-4">
                        <div className="text-center flex justify-between">
                        <div className="">
                            <h6 className="text-blueGray-700 text-base  font-bold mt-2"><i className="fas fa-exclamation-triangle"></i>&nbsp;  ประกาศจากทาง Organic MasterClass</h6>
                        </div>
                        <div className="">
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className={"flex-auto "}>
                        <div className="w-full mt-2">
                            <div className="relative w-full mb-3">
                                <div className=" align-middle  mb-2">
                                    <div  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                        {(Storage.GetLanguage() === "th") ? <label className="cursor-pointer">คุณต้องการลบข้อมูล{message}ใช่หรือไม่</label> : <label className="cursor-pointer">Do you want to delete {message} data?</label> }
                                    </div>
                                </div>
                            </div>
                            <div className="relative w-full mb-3">
                                <div className=" flex justify-between align-middle ">
                                    <div>
                                    </div>
                                    <div  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                        <label className="text-red-500 cursor-pointer" onClick={() => {(confirmModal(id));}}> <i className="fas fa-trash"></i> {locale.t("Button.lblDelete")}</label>
                                        <label className="font-bold">&nbsp;|&nbsp;</label>
                                        <label className="cursor-pointer" onClick={hideModal}> <i className="fas fa-times"></i> {locale.t("Button.lblCancel")}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                </div>
            </div>
            </Modal> */}
        </>
    )
}
