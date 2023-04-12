import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const InputSelectColumn = ({
    field,
    items,
    keyItem = "id",
    valueItem = "value",
    useForm,
    strings,
    handleChange,
    selectStyle = {},
    size = 1,
    columnClassName = "col-md-3 col-12 pb-4",
    noSelect = false,
    multiple = false,
    selectedValues = undefined,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
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
        }

        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    useEffect(() => {
        form?.setValue(field, form?.getValues(field));

        if (!form?.getValues(field) && noSelect) {
            const el = document.getElementById(field);

            if (el) {
                el.value = "";
            }
        }
    }, [form?.formState]);

    const renderSelect = (field) => (
        <>
            <select
                id={field.name}
                style={{ ...selectStyle }}
                multiple={multiple}
                size={size}
                {...field}
                className={
                    messageState?.messageField === field.name
                        ? "form-control is-invalid"
                        : "form-control"
                }
                aria-label={`select ${field.name}`}
                disabled={layoutState?.loading}
                onChange={(e) => {
                    form.setValue(field.name, e.target.value);

                    if (handleChange) {
                        handleChange(e);
                    }
                }}
                defaultValue={selectedValues}
            >
                {noSelect && <option value="">-------</option>}
                {items?.map((item, index) => (
                    <option value={item[keyItem]} key={index}>
                        {item[valueItem]}
                    </option>
                ))}
            </select>
            {messageState?.messageField === field.name && (
                <div className="invalid-feedback">{messageState?.message}</div>
            )}
        </>
    );

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {label}
            </label>
            {form && (
                <Controller
                    render={({ field }) => renderSelect(field)}
                    name={field}
                    control={form?.control}
                />
            )}
        </div>
    );
};

export default InputSelectColumn;
