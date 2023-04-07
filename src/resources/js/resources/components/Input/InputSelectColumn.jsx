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
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                ls?.pageProps?.strings && field in ls.pageProps.strings
                    ? ls?.pageProps?.strings[field]
                    : ""
            );
        }

        if (!useForm) {
            setForm(ls?.pageProps?.useForm);
        }
    }, [ls]);

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
                    ms?.messageField === field.name
                        ? "form-select is-invalid"
                        : "form-select"
                }
                aria-label={`select ${field.name}`}
                disabled={ls?.loading}
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
            {ms?.messageField === field.name && (
                <div className="invalid-feedback">{ms?.message}</div>
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
