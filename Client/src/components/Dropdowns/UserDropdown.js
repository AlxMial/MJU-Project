import React,{useEffect,useContext, useState} from "react";
import { createPopper } from "@popperjs/core";
import { Link,useHistory } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
import axios from "axios";
import FilesService from "../../services/files";
import urlPath from "services/urlServer";
import * as Storage from "../../../src/services/Storage.service";
const locale = require("react-redux-i18n").I18n;
const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { setAuthState } = useContext(AuthContext); 
  const { authState } = useContext(AuthContext);
  const [pictureProfile , setPictureProfile] = useState("");
  const history = useHistory();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    axios.get(urlPath+`/members/getemail/${email}`).then((response) => {
      if(response.data !== null)
        if(response.data.profilePicture !== undefined)
          setPictureProfile(FilesService.buffer64(response.data.profilePicture));
    });

    const checkIfClickedOutside = (e) => {
      if (dropdownPopoverShow && e.toElement.id !== "accountx" && e.toElement.id !== "logoutx"  &&  btnDropdownRef.current && e.toElement.name !== "picture" || e.toElement.id === "") {
          setDropdownPopoverShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownPopoverShow]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem('email');
    localStorage.removeItem('roleUser');
    localStorage.removeItem("learningPathId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("translate")
    setAuthState({ email: "", id: 0, status: false,role:"",profilePicture:"",learningPathId:"" });
  }

  const linkAccount = () => {
    history.push("/home/account");
  }

  return (
    <>
      <div
        className="text-blueGray-500 block"
        ref={btnDropdownRef}
      >
        <div className="items-center flex cursor-pointer"
         onClick={(e) => {
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}>
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="img-member-login w-full rounded-full align-middle border-none shadow-lg"
              name="picture"
              src={  ((pictureProfile) ? pictureProfile  :  require("assets/img/noimg.png").default) }
            />
          </span>
        </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >

        <div
          className={
            "text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
          }
          id="accountx"
          onClick={() => {linkAccount()}}
        >
          <i className="fas fa-user" id="accountx"></i> &nbsp;
          <span className="text-sm" id="accountx" >{locale.t("Menu.lblAccount")}</span>
        </div>

        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <Link to="/auth/login">
          <div
            href="#pablo"
            className={
              "text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 logoutx"
            }
            id="logoutx"
            onClick={logout}
          >
            <i className="fas fa-sign-out-alt text-red-500"  id="logoutx"></i> &nbsp;
            <span className="text-sm"  id="logoutx" >{locale.t("Main.lblLogout")}</span>
          </div>
        </Link>
      </div>
      </div>
    </>
  );
};

export default UserDropdown;
