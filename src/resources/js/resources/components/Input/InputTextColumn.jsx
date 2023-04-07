import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const InputTextColumn = ({
    field,
    type = "text",
    useForm,
    strings = null,
    icon = null,
    columnClassName = "col-md-3 col-12 pb-4",
    inputStyle = {},
    defaultValue = "",
    showLabel = true,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${field}Placeholder` in strings
            ? strings[`${field}Placeholder`]
            : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                pageState?.pageUtils?.strings &&
                    field in pageState.pageUtils.strings
                    ? pageState?.pageUtils?.strings[field]
                    : ""
            );
            setPlaceholder(
                pageState?.pageUtils?.strings &&
                    `${field}Placeholder` in pageState.pageUtils.strings
                    ? pageState.pageUtils.strings[`${field}Placeholder`]
                    : ""
            );
        }

        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    const renderInput = (field) => (
        <>
            <input
                id={field.name}
                {...field}
                className={
                    messageState?.messageField === field.name
                        ? "form-control is-invalid"
                        : "form-control"
                }
                placeholder={placeholder}
                disabled={layoutState?.loading}
                type={type}
                style={{ ...inputStyle }}
            />
            {messageState?.messageField === field.name && (
                <div className="invalid-feedback">{messageState?.message}</div>
            )}
        </>
    );

    return (
        <div className={`form-group ${columnClassName}`}>
            {showLabel && (
                <label className="form-label" htmlFor={field}>
                    {label}
                </label>
            )}
            {icon && form && (
                <div className="input-group has-validation mb-2">
                    <span className="input-group-text">{icon}</span>
                    <Controller
                        render={({ field }) => renderInput(field)}
                        name={field}
                        control={form?.control}
                        defaultValue={defaultValue}
                    />
                </div>
            )}
            {!icon && form && (
                <Controller
                    render={({ field }) => renderInput(field)}
                    name={field}
                    control={form?.control}
                    defaultValue={defaultValue}
                />
            )}
        </div>
    );
};

export default InputTextColumn;
