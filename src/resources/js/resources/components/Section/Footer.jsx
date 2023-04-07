import React from "react";
import { useSelector } from "react-redux";

import { footer as strings, general } from "../../../constants/strings";

const Footer = () => {
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <>
            <div className="app-footer">
                <div className="app-footer__inner">
                    <div className="app-footer-right">
                        <ul className="nav">
                            <li className="nav-item">
                                <span className="nav-link">
                                    {strings.copyright}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="app-footer-left">
                        <ul className="nav">
                            <li className="nav-item d-flex">
                                <span className="nav-link pl-0">
                                    {strings.developedBy}:
                                </span>
                                <a
                                    href={strings.developerUrl}
                                    target={"_blank"}
                                    className="nav-link pr-2"
                                >
                                    {strings.developer}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
