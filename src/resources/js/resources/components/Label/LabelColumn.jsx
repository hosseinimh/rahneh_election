import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Span from "../Span/Span";

const LabelColumn = ({
    field,
    strings = null,
    columnClassName = "col-md-3 col-12 pb-4",
}) => {
    const pageState = useSelector((state) => state.pageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!strings) {
            setLabel(
                pageState?.pageUtils?.strings &&
                    field in pageState.pageUtils.strings
                    ? pageState?.pageUtils?.strings[field]
                    : ""
            );
        }

        setContent(
            pageState?.props?.item && field in pageState.props.item
                ? pageState.props.item[field]
                : ""
        );
    }, [pageState]);

    return (
        <div className={columnClassName}>
            <label className="form-label ml-2" htmlFor={field}>
                {label}:
            </label>
            <Span>{content}</Span>
        </div>
    );
};

export default LabelColumn;
