import React from "react";
import history from "../utils/history";

const Orders = () => {
    const handlePushToMainPage = () => {
        history.push("/products");
    };
    return (
        <>
            <div className=" d-flex container p-2 m-2">
                <button
                    className="btn btn-primary"
                    onClick={handlePushToMainPage}
                >
                    <i className="bi bi-caret-left"></i>Назад
                </button>
                <h3 className="p-3 fw-normal mt-3 text-black m-auto">Orders</h3>
            </div>
        </>
    );
};

export default Orders;
