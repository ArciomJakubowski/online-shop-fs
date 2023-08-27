import React, { useState, useEffect } from "react";
import TextField from "../form/textField";
import TextAreaField from "../form/textareaField";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductById,
    getProducts,
    loadProductsList,
    updateProduct
} from "../../store/products";
import { useHistory, useParams } from "react-router-dom";
import SelectField from "../form/selectField";

const initialState = {
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    images: "",
    thumbnail: "",
    title: ""
};

const AdminUpDateProductForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(getProducts());

    const { edit: id } = useParams();

    // Получение продукта для редактирования
    const productById = useSelector(getProductById(id));

    const [productChange, setProductChange] = useState(initialState);
    console.log("productChange", productChange);
    useEffect(() => {
        productById && setProductChange(productById);
    }, []);

    useEffect(() => {
        dispatch(loadProductsList());
    }, [dispatch]);

    const handleProducts = (target) => {
        setProductChange((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setProductChange(initialState);
    };

    // Для отключения кнопоки Принять в форме
    const isNotValid = Object.values(productChange).includes("");

    // Для отключения кнопки Отмена в форме
    const NotValid = Object.values(productChange).every((item) => item === "");

    const handleClickCancel = () => {
        history.push("/admin");
    };

    // Категории товаров
    const category = products && products.map((product) => product.category);
    const uniqProductCategory = [...new Set(category)];
    const transformArrayCategory = uniqProductCategory.map((upc) => ({
        value: upc,
        label: upc
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(productChange));
        dispatch(loadProductsList());
        clearForm();
        history.push("/admin");
    };

    return (
        <div className="container mt-5">
            <h1 className="p-3 fw-normal text-black col-5 m-3 mb-auto m-auto ">
                Редактировать продукт
            </h1>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 mb-3">
                    <div className="m-3">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                placeholder="Пример: Apple"
                                label="brand"
                                name="brand"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.brand}
                            />

                            <SelectField
                                name="category"
                                defaultOption="Choose..."
                                options={transformArrayCategory}
                                value={productChange.category}
                                onChange={handleProducts}
                            />

                            <TextField
                                label="description"
                                name="description"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.description}
                            />

                            <TextField
                                placeholder="Пример: 1234"
                                label="price"
                                name="price"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.price}
                            />

                            <TextField
                                placeholder="Пример: 1234"
                                label="stock"
                                name="stock"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.stock}
                            />

                            <TextField
                                label="title"
                                name="title"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.title}
                            />

                            <TextAreaField
                                placeholder="Пример: https://avatars.dicebear.com/api/avataaars/f3kk3l.svg"
                                label="thumbnail"
                                name="thumbnail"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.thumbnail}
                            />

                            <button
                                disabled={isNotValid}
                                className="btn btn-success"
                            >
                                <i className="bi bi-check2"></i>
                            </button>
                            <button
                                disabled={NotValid}
                                className=" btn btn-danger m-4 "
                                onClick={handleClickCancel}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUpDateProductForm;
