/*eslint-disable*/
import React ,{ useEffect,useState }from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom";
// components
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { connect } from "react-redux";
import { setLocale } from "react-redux-i18n";
import * as Storage from "../../services/Storage.service";


const AdminTopNavBar = ({ setLocale }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [isThai,setIsThai] = React.useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const history = useHistory();
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  // dropdown props
  const [dropdownAdminPopUpShow, setDropDownAdminOverShow] = React.useState(false);
  const btnDropDownAdminRef = React.createRef();
  const popoverAdminRef = React.createRef();
  const openDropDownPopUp = () => {
    createPopper(btnDropDownAdminRef.current, popoverAdminRef.current, {
      placement: "bottom-start",
    });
    setDropDownAdminOverShow(true);
  };
  const closeDropDownPopUp = () => {
    setDropDownAdminOverShow(false);
  };

  const ChangeTranslate = (e) => {
    if(e.target.id === "thaix")
    {  
      setIsThai(true);
      Storage.SetLanguage("th"); 
      setLocale("th");
    }
    else 
    { 
      setIsThai(false) 
      Storage.SetLanguage("en");
      setLocale("en");
    }
    localStorage.setItem("translate",(e.target.id === "thaix") ? true : false);
  }
  
  useEffect(() => {
    resizeWindow();
    const isValue = localStorage.getItem("translate")
    if(isValue === null){
      Storage.SetLanguage("th"); 
      setIsThai(true);
      setLocale("th");
    }else {
      setIsThai(isValue === "true");
      if(isValue === "true")
      { setLocale("th");    Storage.SetLanguage("th"); }
      else  
      { setLocale("en");    Storage.SetLanguage("en"); }
    }

    const checkIfClickedOutside = (e) => {
      if (dropdownAdminPopUpShow && e.toElement.id !== "thaix" && e.toElement.id !== "engx" && e.toElement.id !== "ham" ||  e.toElement.id === ""  ) {
        setDropDownAdminOverShow(false);
      }else if (e.toElement.id === "")
        setDropDownAdminOverShow(false);
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    window.addEventListener("resize", resizeWindow);
    return () => { window.removeEventListener("resize", resizeWindow); document.removeEventListener("mousedown", checkIfClickedOutside);};
  }, []);

  const ClickHome = () =>{
    const RoleUser = localStorage.getItem('roleUser');
    if(window.location.href.includes("admin") || RoleUser === '1')
    {
      history.push("/admin");
    }else{
      history.push("/home");
    }
  }

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap  justify-between px-2 py-2 navbar-expand-lg bg-green-mju">
        <div className=" flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className={"flex items-center text-lg font-bold text-white "  +  (windowWidth < 1024 ? " hidden" : "block")}>
                <img
                  alt="..."
                  src={require("assets/img/Group_1.png").default}
                  className="h-auto align-middle border-none max-w-100-px"
                />
              </li>
              <li className={"flex items-center text-lg font-bold text-white " +  (windowWidth < 1024 ? " hidden" : "block") }>
                &nbsp;   | &nbsp;
              </li>
              <li className="flex items-center text-2xl font-bold text-white cursor-pointer THSarabun" onClick={()=>{ClickHome()}}>
                <span className={(windowWidth > 912) ? ' block' : ' hidden'} > Organic Masterclass </span>
                <div className={"image-logo "  + ((windowWidth > 912) ? ' hidden' : ' block')}>
                  <img
                    alt="..."
                    src={require("assets/img/Group_1.png").default}
                    className={"  align-middle border-none max-w-100-px" }
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="parent-div flex flex-wrap items-center justify-between w-3">
          <div className="text-sm font-bold text-white"> <i className="fas fa-globe "></i>&nbsp;&nbsp; </div>
          <div id="thaix" className={"text-sm font-bold text-white cursor-pointer " + (!isThai ? "opacity-75" : "textUnderline") } onClick={(e) => {ChangeTranslate(e)}}> ????????????????????? </div>
          <div className="text-sm font-bold text-white"> &nbsp;|&nbsp; </div>
          <div id="engx"  className={"text-sm font-bold text-white cursor-pointer " + (isThai ? "opacity-75" : "textUnderline") } onClick={(e) => {ChangeTranslate(e)}}> English </div>
          <div> &nbsp;&nbsp; </div>
          <div> <UserDropdown /> </div>
              {/* <a
                className="text-blueGray-500"
                href="#pablo"
                ref={btnDropDownAdminRef}
                id="ham"
                onClick={(e) => {
                  e.preventDefault();
                  dropdownAdminPopUpShow ? closeDropDownPopUp() : openDropDownPopUp();
                }}
              >
                <div className={"items-center flex cursor-pointer" + (windowWidth < 1024 ? " block" : " hidden")}>
                  <span className="p-1 text-sm bg-blueGray-200 inline-flex items-center justify-center rounded-lg">
                    <i className="fas fa-bars"></i>
                  </span>
                </div>
              </a>
              <span className={"w-6 h-6 text-sm bg-blueGray-200 inline-flex ml-3 items-center justify-center rounded-full" + (windowWidth < 1024 ? " block" : " hidden")}>
                <UserDropdown /> 
              </span>

              <div
                ref={popoverAdminRef}
                className={
                  (dropdownAdminPopUpShow && windowWidth < 1024  ? "block " : "hidden ") +
                  "bg-white text-base z-50  float-right py-2  mt-2-im list-none text-left rounded shadow-lg "
                }
              >
                <a
                  href="#pablo"
                  id="thaix"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 THSarabun "
                    + (!isThai
                      ? "opacity-75"
                      : "textUnderline")}
                      onClick={(e) => {ChangeTranslate(e)}}
                >
                  ?????????????????????
                </a>
                <a
                  href="#pablo"
                  id="engx"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 THSarabun "
                   + (isThai
                      ? "opacity-75"
                      : "textUnderline")}
                      onClick={(e) => {ChangeTranslate(e)}}
                >
                  English
                </a>
            </div> */}
            {/* <div
                className={
                  "lg:flex flex-grow items-center lg:bg-opacity-0"
                  //  +
                  // (navbarOpen ? " block" : " hidden")
                }
                id="example-navbar-warning"
              >
              <ul className={"flex flex-col lg:flex-row list-none lg:ml-auto" 
              //+ (windowWidth < 1024 ? " hidden" : "block")
               }>
                <li className="flex items-center text-sm font-bold text-white cursor-pointer">
                  <i className="fas fa-globe"></i>&nbsp;&nbsp;
                </li>
                <li className={"flex items-center text-sm font-bold text-white cursor-pointer "+ (!isThai
                        ? "opacity-75"
                        : "textUnderline")}
                    id="thaix"
                    onClick={(e) => {ChangeTranslate(e)}}>
                  ?????????????????????
                </li>
                <li className="flex items-center text-lg font-bold text-white">
                &nbsp;|&nbsp;
                </li>
                <li className={"flex items-center text-sm font-bold text-white cursor-pointer " + (isThai
                        ? "opacity-75"
                        : "textUnderline") }
                    id="engx" 
                    onClick={(e) => {ChangeTranslate(e)}}>
                  English
                </li>

                <li className="flex items-center">
                  &nbsp;&nbsp;&nbsp;
                  <UserDropdown />
                </li>
              </ul>
            </div> */}
        </div>
      </nav>
    </>
  );
}


const matchStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLocale: (lang) => {
    dispatch(setLocale(lang));
  },
});
export default connect(matchStateToProps, mapDispatchToProps)(AdminTopNavBar);
