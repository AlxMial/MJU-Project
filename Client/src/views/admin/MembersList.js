import React,{ useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import ReactPaginate from 'react-paginate';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import urlPath from '../../services/urlServer'
import Spinner from '../../components/Loadings/spinner/Spinner'
import * as Storage from "../../../src/services/Storage.service";
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

export default function MembersList() {

    const [modalIsOpen, setIsOpen] = useState(false);  
    const [listMembers, setListMembers] = useState([]);
    const [deleteNumber , setDeleteNumber] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [listSearch, setListSerch] = useState([]);
    const [modalIsOpenSubject, setIsOpenSubject] = useState(false);
    const [optionsLearning, setOptionsLearning] = useState([]);
    const [optionsLearningEng, setOptionsLearningEng] = useState([]);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const [isLoading, setIsLoading] = useState(false);
    var JsonLearning = [];
    var JsonLearningEng = [];
    const options = [
        { value: '1', label: 'นาย' },
        { value: '2', label: 'นาง' },
        { value: '3', label: 'นางสาว' }
      ];
  
      const optionsEng = [
          { value: '1', label: 'Mr.' },
          { value: '2', label: 'Mrs.' },
          { value: '3', label: 'Miss.' }
      ];
    
      const optionsRole = [
        { value: '1', label: 'ผู้ดูแลระบบ'},
        { value: '2', label: 'ผู้เยี่ยมชม' },
        { value: '3', label: 'วิทยากร' },
        { value: '4', label: 'เกษตรกร' }
      ];
  
      const optionsRoleEng = [
          { value: '1', label: 'Admin'},
          { value: '2', label: 'Guest' },
          { value: '3', label: 'Trainer' },
          { value: '4', label: 'Farmer' }
        ];

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

    function openModalSubject() {
        setIsOpenSubject(true);
    }
    
    function closeModalSubject() {
        setIsOpenSubject(false);
    }
    
    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempMember = listMembers.map((member) => {
            return { ...member, IsDeleted: checked };
            });
            setListMembers(tempMember);
            setDeleteNumber(tempMember.filter(x => x.IsDeleted === true).length);
            } 
        else {
            let tempMember = listMembers.map((member) =>
                member.id.toString() === name ? {
                    ...member, IsDeleted: checked
                } : member
            );
            setListMembers(tempMember);
            setDeleteNumber(tempMember.filter(x => x.IsDeleted === true).length);
        }
    };

    const ChangeSelect = (options,value,type) =>{
        if(value=== "") { value = "1"; }
        if(type === "title"){
            return  value  = options.filter(x => x.value === value.toString())[0].label;
        } else if (type === "role") {
            return  value  = options.filter(x => x.value === value.toString())[0].label;
        }
    }
    
    const ChangeLearning = (options,value) =>{
        if(options.length > 0)
            return  value = options.filter(x => x.value === value.toString())[0].label;
    }

    const deleteMember = (e,email) => {
        if(email !== "guest@mju.ac.th" && email !== "admin@mju.ac.th"){
            axios
            .delete(urlPath+`/members/${e}`,{
                headers: {accessToken : localStorage.getItem("accessToken")}
            })
            .then(() => {
                setListMembers(
                listMembers.filter((val) => {
                    return val.id !== e;
                })
                );
                closeModal();
            });
        }
    }

    const deleteByList = async () => {
        if(deleteNumber > 0)
        {
            var ArrayDeleted = [];
            const emailUser = localStorage.getItem('email');
            listMembers.forEach(field => { 
                if(field.IsDeleted === true && field.email !== emailUser
                    && field.email !== "admin@mju.ac.th" && field.email !== "guest@mju.ac.th" ) 
                { ArrayDeleted.push(field.id) }
                else field.IsDeleted = false;
            });
            if(ArrayDeleted.length > 0){
                axios
                .delete(urlPath+`/members/multidelete/${ArrayDeleted}`,{
                headers: {accessToken : localStorage.getItem("accessToken")}
                })
                .then(() => {
                    setDeleteNumber(0);
                    setListMembers(
                        listMembers.filter((val) => {
                        return val.IsDeleted !== true;
                        })
                    );
                });
            }
            closeModalSubject();
        }
    }

    const pageCount = Math.ceil(listMembers.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const displayUsers = listMembers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(function(value){
      return (

            <tr role="row" key={value.id}>
                <th className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap">
                    <input
                        type="checkbox"
                        name={value.id}
                        checked={value?.IsDeleted || false}
                        onChange={handleChange}
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                    />
                </th>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap cursor-pointer">
                    <div className="TextWordWarp"><Link to={`/admin/members/${value.id}`}>{ ((Storage.GetLanguage() === "th") ? ChangeSelect(options,value.title,"title") : ChangeSelect(optionsEng,value.title,"title")) + ' ' + value.firstName + ' ' + value.lastName }</Link></div>
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap  cursor-pointer">
                    <div className="TextWordWarp"><Link to={`/admin/members/${value.id}`} >{value.email}</Link></div>
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap cursor-pointer">
                    <div className="TextWordWarpCode"><Link to={`/admin/members/${value.id}`} >{ ((Storage.GetLanguage() === "th") ? ChangeSelect(optionsRole,value.role,"role") : ChangeSelect(optionsRoleEng,value.role,"role")) }</Link></div>
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap ">
                    <div className="TextWordWarpCode">{ (Storage.GetLanguage() === "th") ? ChangeLearning(optionsLearning,value.learningPathId) :  ChangeLearning(optionsLearningEng,value.learningPathId) }</div>
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap ">
                    { value.isActivated ? 
                            <label><i className="fas fa-circle text-green-200-mju mr-2"></i> {locale.t("Account.info.lblActive")}</label>
                            : <label> <i className="fas fa-circle text-red-500 mr-2"></i> {locale.t("Account.info.lblInActive")} </label>
                    }
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3">
                    <label className={"text-red-500 " + ((value.email === "admin@mju.ac.th" || value.email === "guest@mju.ac.th") ? "opacity-50" : "cursor-pointer")}  onClick={() => {openModal("delete",value.email)}}>  <i className="fas fa-trash"></i> {locale.t("Button.lblDelete")}</label>
                    <Modal
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
                                <div className="rounded-t bg-white mb-0 px-2 py-2">
                                    <div className="text-center flex justify-between">
                                    <div className="">
                                        <h6 className="text-blueGray-700 text-base  font-bold mt-2"><i className="fas fa-exclamation-triangle"></i>&nbsp; {locale.t("Main.lblWarning")}</h6>
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
                                                    <label className="cursor-pointer">{locale.t("Warning.lblDelete")}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <div className=" flex justify-between align-middle ">
                                                <div>
                                                </div>
                                                <div  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    <label className="text-red-500 cursor-pointer" onClick={() => {openModal(deleteMember(value.id,value.email))}}> <i className="fas fa-trash"></i> {locale.t("Button.lblDelete")}</label>
                                                    <label className="font-bold">&nbsp;|&nbsp;</label>
                                                    <label className="cursor-pointer" onClick={closeModal}> <i className="fas fa-times"></i> {locale.t("Button.lblCancel")}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            </div>
                        </div>
                    </Modal>
                </td>
            </tr>

        );
    });

    const InputSearch = (e) => {
        if(e === "") {
            setListMembers(listSearch);
        } else {
            setListMembers(listMembers.filter(x => x.firstName.includes(e) 
            || x.lastName.includes(e) || x.email.includes(e) 
            || x.role.includes(e) 
            || x.learningPathId.includes(e)
            || x.title.includes(e) 
            ));
        }
    }

    useEffect (  ()  =>  {
        fetchLearning();
        fetchMember();
      },[]);

      
  async function fetchLearning() {
    axios.get(urlPath+"/learning",{
        headers: {accessToken : localStorage.getItem("accessToken")}
      }).then((resLearning) =>   {
        JsonLearning = [];
        JsonLearningEng = [];
        resLearning.data.listLearning.forEach(field => 
        {
            JsonLearning.push({value: field.id.toString(),label: field.LearningPathNameTH });
            JsonLearningEng.push({value: field.id.toString(),label: field.LearningPathNameENG });
        })
        setOptionsLearning(JsonLearning);
        setOptionsLearningEng(JsonLearningEng);
    });
  }

  async function fetchMember() {
    setIsLoading(true);
    axios.get(urlPath+"/members",{
            headers: {accessToken : localStorage.getItem("accessToken")}
          }).then((response) =>   {
            if(response){
                setListMembers(response.data.listMembers);
                setListSerch(response.data.listMembers);
            }
            setIsLoading(false);
        });
  }

  return (
    <>
      {isLoading ? ( <> <Spinner  customText={"Loading"}/></>) : (<></>)}
      <div className="flex flex-wrap mt-4 md:min-h-full ">
        <div className="w-full mb-12 px-4">
            <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-white"}>
                <div className="rounded-t mb-0 px-3 py-3 border-0">
                    <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap ">
                        {/* Brand */}
                            <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                {locale.t("Menu.lblAccount")}
                            </h3>
                            <h3 className={"font-semibold px-2 text-lg text-blueGray-700"}>
                                |
                            </h3>
                            <h3 className={"font-semibold text-sm text-blueGray-700"}>
                                {listMembers.length} {locale.t("Main.lblItem")}
                            </h3>
                            <h3 className={"font-semibold text-sm text-blueGray-700 leading-2" + ((deleteNumber > 0) ? " block" : " hidden")} >
                            &nbsp; <i className="fas fa-trash text-red-500 cursor-pointer" onClick={()=>{openModalSubject()}}></i> &nbsp;
                                <span>{locale.t("Button.lblDelete")} {deleteNumber} {locale.t("Main.lblChoose")}</span>
                                <ConfirmDialog  showModal={modalIsOpenSubject} message={((Storage.GetLanguage() === "th") ? "จัดการบัญชีผู้ใช้" : "Account Management") } hideModal={()=>{closeModalSubject()}} confirmModal={() => {deleteByList()}}/>
                            </h3>
                        {/* Form */}
                        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                            <div className="relative flex w-full flex-wrap items-stretch">
                                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center pl-3 py-1">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-12"
                                    onChange={(e)=>{InputSearch(e.target.value)}}
                                />
                            </div>
                        </form>
                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <Link to="/admin/members"><button
                            className="bg-white text-black active:bg-lightBlue-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
                            type="button"
                            >
                            <i className="fas fa-plus text-green-mju"></i> {locale.t("Button.lblInsert")}
                            </button></Link>
                        </ul>
                    </div>
                    
                </div>
                <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="w-full bg-transparent border-collapse">
                    <thead>
                    <tr>
                        <th
                        className={"text-center px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                        >
                        <input
                            type="checkbox"
                            name="allSelect"
                            checked={!listMembers.some((members) => members?.IsDeleted !== true)}
                            onChange={handleChange}
                            className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                        />
                        </th>
                        <th
                        className={
                            "px-2 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                            {locale.t("Account.list.lblFullName")}
                        </th>
                        <th
                        className={
                            "px-2  border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        {locale.t("Account.list.lblEmail")}
                        </th>
                        <th
                        className={
                            "px-2 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        {locale.t("Account.list.lblRole")}
                        </th>
                        <th
                        className={
                            "px-2 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        {locale.t("Account.list.lblLearningPath")}
                        </th>
                        <th
                        className={
                            "px-2 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        {locale.t("Account.list.lblStatus")}
                        </th>
                        <th
                        className={
                            "px-2 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        ></th>
                    </tr>
                    </thead>
                    <tbody>
                        {displayUsers}  
                    </tbody>
                </table>
                </div>
                <div className="py-4">
                <ReactPaginate
                    previousLabel={" < "}
                    nextLabel={" > "}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
                </div>
                
            </div>
        
        </div>

      </div>
    </>
  );
}
