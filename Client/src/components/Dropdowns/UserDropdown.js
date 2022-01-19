import React,{useEffect,useContext} from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { setAuthState } = useContext(AuthContext); 

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
    const checkIfClickedOutside = (e) => {
      if (dropdownPopoverShow && btnDropdownRef.current && !btnDropdownRef.current.contains(e.target)) {
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
    setAuthState({ username: "", id: 0, status: false });
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
              src={require("assets/img/team-1-800x800.jpg").default}
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
        <Link to="">
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          จัดการบัญชีผู้ใช้
        </a>
        </Link>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <Link to="/auth/login">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={logout}
          >

            ออกจากระบบ
          </a>
        </Link>
      </div>
      </div>
    </>
  );
};

export default UserDropdown;
