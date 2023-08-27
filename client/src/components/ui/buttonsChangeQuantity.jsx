import React, { useState } from "react";
import PropTypes from "prop-types";

const ButtonsChangeQuantity = ({ onChange, quantity }) => {
    const [countProduct, setCountProduct] = useState(quantity);
    const handleDecrement = () => {
        if (countProduct > 0) setCountProduct((prevState) => prevState - 1);
    };
    const handleIncrement = () => {
        setCountProduct((prevState) => prevState + 1);
    };
    return (
        <>
            <div className=" card-counter mb-3 m-2">
                <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={handleIncrement}
                >
                    +
                </button>
                <input type="text" value={countProduct} className="col-md-2" />
                <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={handleDecrement}
                >
                    -
                </button>
            </div>
        </>
    );
};
ButtonsChangeQuantity.propTypes = {
    incr: PropTypes.func,
    decr: PropTypes.func,
    count: PropTypes.number,
    quantity: PropTypes.number,
    onChange: PropTypes.func
};

export default ButtonsChangeQuantity;
