import React from "react";

const CustomLink = ({ onClick, children, className = "", link = "" }) => {
    return (
        <a
            href={link === "" ? "#" : link}
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick();
            }}
            className={className}
        >
            {children}
        </a>
    );
};

export default CustomLink;
