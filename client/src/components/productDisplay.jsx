import React from "react";
import PropTypes from "prop-types";
import Product from "./product";

const ProductDisplay = ({ productCrop, onSort, ...rest }) => {
    return (
        <div className="d-flex flex-nowrap m-auto">
            {productCrop.map((product) => (
                <Product {...product} {...rest} key={product._id} />
            ))}
        </div>
    );
};

ProductDisplay.propTypes = {
    productCrop: PropTypes.array.isRequired,
    onSort: PropTypes.func
};

export default ProductDisplay;
