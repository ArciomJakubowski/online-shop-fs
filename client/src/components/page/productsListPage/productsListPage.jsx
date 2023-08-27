import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import _ from "lodash";
import GroupList from "../../groupList";
import Pagination from "../../pagination";
import ProductDisplay from "../../productDisplay";
import NavBar from "../../ui/navBar";
import SortSelect from "../../sortSelect";
import { useSelector } from "react-redux";
import { getProducts, getProductsLoading } from "../../../store/products";

const sortOptions = [
    {
        value: "priceASC",
        label: "Цена по возрастанию",
        sort: (prod) => _.orderBy(prod, ["price"], ["asc"])
    },
    {
        value: "priceDESC",
        label: "Цена по убыванию",
        sort: (prod) => _.orderBy(prod, ["price"], ["desc"])
    }
];

const ProductsListPage = () => {
    const products = useSelector(getProducts());
    const isLoading = useSelector(getProductsLoading());

    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProd, setSelectedProd] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const [sortSign, setSortSign] = useState("priceASC");

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProd, searchQuery]);

    const handleChangeSortSign = (e) => {
        setSortSign(e.target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProductSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProd(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProd(undefined);
        setSearchQuery(target.value);
    };
    if (products) {
        const category = products.map((product) => product.category);
        const uniqProductCategory = [...new Set(category)];

        const filteredProducts = searchQuery
            ? products.filter(
                  (product) =>
                      product.brand
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProd
            ? products.filter((product) => product.category === selectedProd)
            : products;

        const count = filteredProducts.length;

        const [sortProducts, setSortProducts] = useState(filteredProducts);

        useEffect(() => {
            // В sortOptions ищем признак по которому сортируем
            const findOption = sortOptions.find(
                ({ value }) => value === sortSign
            );

            // Если такой признак есть
            if (filteredProducts && findOption) {
                // Вызываем нужный метод сортировки
                setSortProducts(findOption.sort(filteredProducts));
            } else {
                // Если не нашли то просто устанавливаем продукты
                setSortProducts(filteredProducts);
            }
        }, [sortSign, products, selectedProd, searchQuery]);

        const productCrop = paginate(sortProducts, currentPage, pageSize);

        const clearFilter = () => {
            setSortSign("priceASC");
            setSearchQuery("");
            setSelectedProd(undefined);
        };

        if (isLoading) return "Loading...";

        return (
            <>
                <NavBar
                    onChange={handleSearchQuery}
                    value={searchQuery}
                    products={products}
                />
                <div className="d-flex">
                    {uniqProductCategory && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                items={uniqProductCategory}
                                selectedItem={selectedProd}
                                onItemSelect={handleProductSelect}
                            />

                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                Сбросить
                            </button>
                            {selectedProd ? <p>Найдено {count} товаров</p> : ""}
                        </div>
                    )}

                    <div className="p-4">
                        <SortSelect
                            value={sortSign}
                            options={sortOptions}
                            onSort={handleChangeSortSign}
                        />

                        <div className="d-flex flex-column p-4 ">
                            <ProductDisplay
                                products={products}
                                productCrop={productCrop}
                                // onSort={handleSort}
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

ProductsListPage.propTypes = {
    products: PropTypes.array
};

export default ProductsListPage;
