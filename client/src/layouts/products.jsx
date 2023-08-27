import React from "react";
import { useParams } from "react-router-dom";
import ProductsListPage from "../components/page/productsListPage";
import ProductPage from "../components/page/productPage";
// import { useDispatch, useSelector } from "react-redux";
// import { getDataStatus, loadProductsList } from "../store/products";
import ProductsLoader from "../components/ui/hoc/productsLoader";

const Products = () => {
    const params = useParams();

    const { prodId } = params;

    return (
        <>
            <ProductsLoader>
                {prodId ? <ProductPage id={prodId} /> : <ProductsListPage />}
            </ProductsLoader>
        </>
    );
};

export default Products;
