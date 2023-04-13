import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import {
    closeDropDownAction,
    setLoadingAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
    setRenderMessageAction,
} from "../../../state/message/messageActions";
import {
    setPageParamsAction,
    setDispatchAction,
    setNavigateAction,
    setPageAction,
    setPagePropsAction,
    setPageUtilsAction,
    setPageTitleAction,
} from "../../../state/page/pageActions";
import { clearLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import { Footer, Header, Sidebar, TopLoadingBar } from "../../components";

const BasePageLayout = ({ pageUtils, children, authPage = true, modals }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [pageLoaded, setPageLoaded] = useState(false);
    const pageState = useSelector((state) => state.pageReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const userState = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (userState?.error) {
            dispatch(setLoadingAction(false));
            dispatch(
                setMessageAction(
                    userState?.error,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.FORM_INPUT_INVALID
                )
            );
        }
    }, [userState]);

    useEffect(() => {
        if (
            typeof pageUtils?.useForm?.formState?.errors === "object" &&
            pageUtils?.useForm?.formState?.errors
        ) {
            const hasKeys = !!Object.keys(pageUtils?.useForm?.formState?.errors)
                .length;
            if (hasKeys) {
                dispatch(
                    setMessageAction(
                        pageUtils?.useForm?.formState?.errors[
                            Object.keys(
                                pageUtils?.useForm?.formState?.errors
                            )[0]
                        ].message,
                        MESSAGE_TYPES.ERROR,
                        MESSAGE_CODES.FORM_INPUT_INVALID,
                        true,
                        Object.keys(pageUtils?.useForm?.formState?.errors)[0]
                    )
                );
            }
        }
    }, [pageUtils?.useForm?.formState?.errors]);

    useEffect(() => {
        if (params && pageState?.pageUtils && pageState?.dispatch) {
            setPageLoaded(true);
        }
    }, [pageState]);

    useEffect(() => {
        if (pageLoaded) {
            pageUtils.onLoad(params);
        }
    }, [pageLoaded]);

    useEffect(() => {
        if (pageState?.props?.action) {
            pageUtils.onAction(pageState?.props);
        }
    }, [pageState?.props?.action]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const user = utils.getLSUser();
        if ((authPage && !user) || (!authPage && user)) {
            dispatch(clearLogoutAction());
            navigate(`${BASE_PATH}/users/login`);

            return;
        }
        dispatch(setRenderMessageAction());
        if (messageState?.messageField || messageState?.messageRender) {
            dispatch(clearMessageAction());
        }
        dispatch(setPageAction(pageUtils.name));
        dispatch(
            setPageTitleAction(
                pageUtils.strings._title,
                pageUtils.strings._subTitle
            )
        );
        dispatch(setPageParamsAction(params));
        dispatch(setNavigateAction(navigate));
        dispatch(setDispatchAction(dispatch));
        dispatch(setPageUtilsAction(pageUtils));

        loadModals();
    }, []);

    const loadModals = () => {
        let modalObjs = [];
        modals?.map((modal) => {
            const modalElement = document.getElementById(modal.id);
            const m = modalElement ? new coreui.Modal(modalElement) : null;
            const form = modal?.useForm;
            modalElement?.addEventListener("hidden.coreui.modal", () => {
                dispatch(
                    setPagePropsAction({
                        item: null,
                        action: null,
                    })
                );
                dispatch(clearMessageAction());
                form?.reset();
            });
            modalObjs = [{ modal: m, form }, ...modalObjs];
        });
        // if (funcs?.loadModals instanceof Function) {
        //     funcs.loadModals(modalObjs);
        // }
    };

    const onAppContainerClick = (e) => {
        let clickedOnWidget = false;
        let element = e.target;
        if (document.body.clientWidth >= 992) {
            while (element.parentNode) {
                if (element.parentNode.classList?.contains("widget-content")) {
                    clickedOnWidget = true;
                    break;
                }
                element = element.parentNode;
            }
            if (!clickedOnWidget) {
                dispatch(closeDropDownAction(["widget-content"]));
            }
        }
    };

    return (
        <div
            className={`app-container app-theme-white body-tabs-shadow${
                userState.isAuthenticated ? " fixed-header fixed-sidebar" : ""
            }`}
            onClick={(e) => onAppContainerClick(e)}
        >
            <TopLoadingBar />
            {userState.isAuthenticated && <Header />}
            {userState.isAuthenticated && (
                <div className="app-main">
                    <Sidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <div className="app-page-title">
                                <div className="page-title-wrapper">
                                    <div className="page-title-heading">
                                        {pageState?.icon && (
                                            <div className="page-title-icon">
                                                <i
                                                    className={`${pageState.icon} icon-gradient bg-premium-dark`}
                                                ></i>
                                            </div>
                                        )}
                                        <div>
                                            {pageState?.title}
                                            <div className="page-title-subheading">
                                                {pageState?.subTitle}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
            {!userState.isAuthenticated && { ...children }}
        </div>
    );
};

export default BasePageLayout;
