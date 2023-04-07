import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_PATH, USER_ROLES, ASSETS_PATH } from "../../../constants";
import { header as strings, general } from "../../../constants/strings";
import {
    toggleDropDownAction,
    toggleSidebarAction,
} from "../../../state/layout/layoutActions";
import { fetchLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import CustomLink from "../Link/CustomLink";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const authUser = utils.getLSUser();

    const userTitle = () => {
        let title =
            authUser?.role === USER_ROLES.ADMINISTRATOR
                ? general.administrator
                : general.user;

        title += `: [ ${authUser?.username} ]`;

        return title;
    };

    const onLogout = () => {
        dispatch(fetchLogoutAction());
    };

    const onEditUser = () => {
        navigate(`${BASE_PATH}/users/edit`);
    };

    const onChanePassword = () => {
        navigate(`${BASE_PATH}/users/change_password`);
    };

    const closeWidget = () => {
        const btn = document.querySelector(".btn-group");
        btn.classList.remove("show");
        btn.childNodes[0].setAttribute("aria-expanded", "false");
        btn.childNodes[1].classList.remove("show");
        btn.childNodes[1].style = "";
    };

    useEffect(() => {
        if (layoutState?.dropDowns?.includes("widget-content")) {
            closeWidget();
        }
    }, [layoutState]);

    useEffect(() => {
        if (!userState.isAuthenticated) {
            navigate(`${BASE_PATH}/users/login`);
        }
    }, [userState]);

    const toggleSidebar = (className) => {
        const element = document.querySelector(`.${className}`);
        dispatch(toggleSidebarAction(element));
    };

    const toggleDropDown = (className) => {
        const element = document.querySelector(`.${className}`);
        dispatch(toggleDropDownAction(element));
    };

    return (
        <div className="app-header header-shadow">
            <div className="app-header__logo">
                <div className="logo-src">
                    <span>{general.brandLogo}</span>
                </div>
                <div className="header__pane mr-auto">
                    <div>
                        <button
                            type="button"
                            className="hamburger close-sidebar-btn hamburger--elastic pc-close-sidebar"
                            onClick={() => toggleSidebar("pc-close-sidebar")}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button
                        type="button"
                        className="hamburger hamburger--elastic mobile-toggle-nav mobile-close-sidebar"
                        onClick={() => toggleSidebar("mobile-close-sidebar")}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button
                        type="button"
                        className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav mobile-dropdown"
                        onClick={() => toggleDropDown("mobile-dropdown")}
                    >
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div className="app-header__content">
                <div className="app-header-left">
                    <div className="header-btn-lg">
                        <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left  ml-3 header-user-info">
                                    <div className="widget-heading">
                                        {authUser?.name}
                                    </div>
                                    <div className="widget-subheading">
                                        {userTitle()}
                                    </div>
                                </div>
                                <div className="widget-content-left">
                                    <div className="btn-group">
                                        <a
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            className="p-0 btn pc-dropdown"
                                            onClick={() =>
                                                toggleDropDown("pc-dropdown")
                                            }
                                        >
                                            <img
                                                width="38"
                                                className="rounded-circle"
                                                src={`${ASSETS_PATH}/images/user.png`}
                                                alt=""
                                            />
                                            <i className="fa fa-angle-down mr-2 opacity-8"></i>
                                        </a>
                                        <div
                                            tabIndex={"-1"}
                                            role="menu"
                                            aria-hidden="true"
                                            className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-left user-popup"
                                        >
                                            <div className="dropdown-menu-header">
                                                <div className="dropdown-menu-header-inner bg-info">
                                                    <div
                                                        className="menu-header-image opacity-2"
                                                        style={{
                                                            backgroundImage: `url("${ASSETS_PATH}/images/menu-bg2.jpg")`,
                                                        }}
                                                    ></div>
                                                    <div className="menu-header-content text-right">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-right ml-3">
                                                                    <img
                                                                        width="38"
                                                                        className="rounded-circle"
                                                                        src={`${ASSETS_PATH}/images/user.png`}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="widget-heading">
                                                                        {
                                                                            authUser?.name
                                                                        }
                                                                    </div>
                                                                    <div className="widget-subheading opacity-8">
                                                                        {userTitle()}
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-left ml-2">
                                                                    <button
                                                                        className="btn-shadow btn-shine btn btn-focus"
                                                                        onMouseUp={
                                                                            onLogout
                                                                        }
                                                                    >
                                                                        {
                                                                            strings.logout
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="nav flex-column p-0">
                                                <li className="nav-item-btn nav-item">
                                                    <CustomLink
                                                        onClick={
                                                            onChanePassword
                                                        }
                                                    >
                                                        {strings.changePassword}
                                                    </CustomLink>
                                                </li>
                                                <li className="nav-item-btn nav-item">
                                                    <CustomLink
                                                        onClick={onEditUser}
                                                    >
                                                        {strings.editProfile}
                                                    </CustomLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
