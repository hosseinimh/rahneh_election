import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputHiddenElement = ({ field, useForm, value }) => {
    const pageState = useSelector((state) => state.pageReducer);
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    return (
        <input
            id={field}
            {...form?.register(`${field}`)}
            type="hidden"
            value={value}
        />
    );
};

export default InputHiddenElement;
