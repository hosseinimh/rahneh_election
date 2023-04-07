import React from "react";

const Card = ({
    children,
    cardStyle = "col-sm-4 col-lg-3",
    containerStyle = "",
}) => {
    return (
        <div className={`${cardStyle}`}>
            <div
                className={`card mb-4 text-white card-dashboard ${containerStyle}`}
            >
                <div className="card-body pb-2 d-flex justify-content-between align-items-start">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card;
