import React,{useEffect,useContext, useState} from "react";
import { createPopper } from "@popperjs/core";
import { Link,useHistory } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
import axios from "axios";
import FilesService from "../../services/files";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { setAuthState } = useContext(AuthContext); 
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
    axios.get(`http://localhost:3001/members/getemail/${email}`,{
      headers: {accessToken : localStorage.getItem("accessToken")}
    }).then((response) => {
      if(response.data !== null)
        if(response.data.profilePicture !== undefined)
          setPictureProfile(FilesService.buffer64(response.data.profilePicture));
    });

    const checkIfClickedOutside = (e) => {
      if (dropdownPopoverShow && e.toElement.id !== "accountx" && e.toElement.id !== "logoutx"  &&  btnDropdownRef.current && e.toElement.name !== "picture") {
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
    setAuthState({ email: "", id: 0, status: false,role:"" });
  }

  const linkAccount = () => {
    history.push("/home/account");
   // window.location.reload()
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
              className="w-full rounded-full align-middle border-none shadow-lg"
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
          <span className="text-sm" id="accountx" >จัดการบัญชีผู้ใช้</span>
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
            <span className="text-sm"  id="logoutx" >ออกจากระบบ</span>
          </div>
        </Link>
      </div>
      </div>
    </>
  );
};

export default UserDropdown;
