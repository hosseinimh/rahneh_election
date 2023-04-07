import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

const InputReactSelectColumn = ({
    field,
    options,
    strings,
    handleChange,
    selectStyle = {},
    columnClassName = "col-md-3 col-12 pb-4",
    defaultValue,
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [selected, setSelected] = useState(options[0]);

    useEffect(() => {
        if (!strings) {
            setLabel(
                ls?.pageProps?.strings && field in ls.pageProps.strings
                    ? ls?.pageProps?.strings[field]
                    : ""
            );
        }
    }, [ls]);

    useEffect(() => {
        const item =
            options.find((o) => o.value === defaultValue) ?? options[0];
        setSelected(item);
        if (handleChange) {
            handleChange(item.value);
        }
    }, [defaultValue]);

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {label}
            </label>
            <Select
                id={field}
                style={{ ...selectStyle }}
                className={
                    ms?.messageField === field
                        ? "form-control p-0 border-0 is-invalid"
                        : "form-control p-0 border-0"
                }
                aria-label={`select ${field}`}
                isDisabled={ls?.loading}
                options={options}
                onChange={(e) => {
                    if (handleChange) {
                        handleChange(e.value);
                    }
                    setSelected(options.find((o) => o.value === e.value));
                }}
                value={selected}
            />
            {ms?.messageField === field && (
                <div className="invalid-feedback">{ms?.message}</div>
            )}
        </div>
    );
};

export default InputReactSelectColumn;
