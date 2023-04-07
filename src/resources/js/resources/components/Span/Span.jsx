import React from "react";
import { useSelector } from "react-redux";

const Span = ({ children, className = "", spanStyle = {} }) => {
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <p className="placeholder-glow d-inline">
            <span
                className={
                    ls?.loading
                        ? `d-inline placeholder col-12 ${className}`
                        : `col-12 ${className}`
                }
                style={{ ...spanStyle }}
            >
                {ls?.loading ? "" : [...children]}
            </span>
        </p>
    );
};

export default Span;
