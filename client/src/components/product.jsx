import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Product = ({ _id, thumbnail, title, brand, price, description }) => {
    return (
        <div key={_id} className="card d-flex col-3 ">
            <img
                src={thumbnail}
                className="card-img-top "
                width="150px"
                height="150px"
                alt="product"
            />
            <div className="d-flex flex-column mt-auto card-body">
                <h5 className="card-title">{brand}</h5>
                <h6 className="card-subtitle mb-2 text-muted">${price}</h6>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-ancor d-flex flex-column  mt-auto p-3">
                <Link to={`/products/${_id}`} className="btn btn-primary">
                    Открыть карточку
                </Link>
            </div>
        </div>
    );
};

Product.propTypes = {
    _id: PropTypes.string.isRequired,
    brand: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
};

export default Product;
