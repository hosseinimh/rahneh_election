import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import { slideUp, slideDown } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import { BASE_PATH } from "../../../constants";
import { general, sidebar as strings } from "../../../constants/strings";
import { fetchLogoutAction } from "../../../state/user/userActions";
import { CustomLink } from "../";

function Sidebar() {
    const dispatch = useDispatch();
    const pageState = useSelector((state) => state.pageReducer);

    useEffect(() => {
        const container = document.querySelector(".scrollbar-sidebar");
        new PerfectScrollbar(container);
        initSidebarMenus();
        onPageChanged();
        document.addEventListener("DOMContentLoaded", () => {
            onPageChanged();
        });
        window.addEventListener("resize", () => {
            onPageChanged();
        });
    }, []);

    const initSidebarMenus = () => {
        const links = [...document.querySelectorAll(".menu-container")];

        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const parent = link.parentNode;
                closeOtherMenus(links, link);
                if (parent.classList.contains("mm-active")) {
                    parent.classList.remove("mm-active");
                    link.setAttribute("aria-expanded", "false");
                    slideUp(link.nextElementSibling);
                } else {
                    parent.classList.add("mm-active");
                    link.setAttribute("aria-expanded", "true");
                    slideDown(link.nextElementSibling, {
                        duration: 400,
                        easing: easeOutQuint,
                    });
                }
            });
        });
    };

    const closeOtherMenus = (links, exceptLink) => {
        const otherLinks = links.filter((l) => l !== exceptLink);
        otherLinks.forEach((link) => {
            link.parentNode.classList.remove("mm-active");
            link.setAttribute("aria-expanded", "false");
            slideUp(link.nextElementSibling);
        });
    };

    const onPageChanged = () => {
        try {
            const container = document.querySelector(".app-container");

            if (document.body.clientWidth < 1250) {
                container.classList.add("closed-sidebar-mobile");
                container.classList.add("closed-sidebar");
            } else {
                container.classList.remove("closed-sidebar-mobile");
                container.classList.remove("closed-sidebar");
            }
        } catch {}
    };

    const onLogout = () => {
        dispatch(fetchLogoutAction());
    };

    const renderMenuItem = (url, string, icon, page) => (
        <li>
            <Link
                to={url}
                aria-expanded="false"
                className={`mb-1 ${
                    pageState?.page === page ? "mm-active" : ""
                }`}
            >
                <i className={`metismenu-icon ${icon}`}></i>
                {string}
            </Link>
        </li>
    );

    const renderSubMenuItem = (url, string, page) => (
        <li>
            <Link
                to={url}
                aria-expanded="false"
                className={`mb-1 ${
                    pageState?.page === page ? "mm-active" : ""
                }`}
            >
                <i className="metismenu-icon"></i>
                {string}
            </Link>
        </li>
    );

    return (
        <div className="app-sidebar sidebar-text-light sidebar-shadow bg-royal">
            <div className="app-header__logo">
                <div className="logo-src">
                    <span>{general.brandLogo}</span>
                </div>
                <div className="header__pane ml-auto">
                    <div>
                        <button
                            type="button"
                            className="hamburger close-sidebar-btn hamburger--elastic"
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
                        className="hamburger hamburger--elastic mobile-toggle-nav"
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
                        className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
                    >
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div className="scrollbar-sidebar ps ps--active-y">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu metismenu">
                        <li className="app-sidebar__heading">
                            {strings.mainContainer}
                        </li>
                        {renderMenuItem(
                            `${BASE_PATH}`,
                            strings.dashboard,
                            "pe-7s-rocket",
                            "Dashboard"
                        )}
                        <li className="app-sidebar__heading">
                            {strings.servicesContainer}
                        </li>
                        {renderMenuItem(
                            `${BASE_PATH}/voters`,
                            strings.voters,
                            "pe-7s-pen",
                            "Voters"
                        )}
                        <li
                            className={`${
                                ["Users"].includes(pageState?.page)
                                    ? "mm-active"
                                    : ""
                            }`}
                        >
                            <a
                                href="#"
                                aria-expanded="false"
                                className="menu-container mb-1"
                            >
                                <i className="metismenu-icon pe-7s-config"></i>
                                {strings.systemManagement}
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul
                                className="mm-collapse"
                                style={
                                    ["Users"].includes(pageState?.page)
                                        ? { display: "block" }
                                        : {}
                                }
                            >
                                {renderSubMenuItem(
                                    `${BASE_PATH}/users`,
                                    strings.users,
                                    "Users"
                                )}
                            </ul>
                        </li>
                        <li className="app-sidebar__heading">
                            {strings.userContainer}
                        </li>
                        {renderMenuItem(
                            `${BASE_PATH}/users/edit`,
                            strings.editProfile,
                            "pe-7s-id",
                            "EditProfile"
                        )}
                        {renderMenuItem(
                            `${BASE_PATH}/users/change_password`,
                            strings.changePassword,
                            "pe-7s-pen",
                            "ChangePasswordUser"
                        )}
                        <li>
                            <CustomLink
                                aria-expanded="false"
                                onClick={onLogout}
                            >
                                <i className="metismenu-icon pe-7s-door-lock"></i>
                                {strings.logout}
                            </CustomLink>
                        </li>
                    </ul>
                </div>
                <div
                    className="app-sidebar-bg opacity-06"
                    style={{
                        backgroundImage: 'url("/assets/images/menu-bg1.jpg")',
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Sidebar;
