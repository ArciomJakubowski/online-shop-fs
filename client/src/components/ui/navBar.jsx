import React, { useEffect } from "react";
import imageLogo from "../image/Logo.jpg";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarts, loadCartList } from "../../store/cartProducts";
import { getFavorites } from "../../store/favoritesProducts";
import NavProfile from "./navProfile";
import {
    getCurrentUserData,
    getCurrentUserId,
    getIsLoggedIn
} from "../../store/users";

const NavBar = ({ onChange, value: searchQuery, id: Id, products }) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const cart = useSelector(getCarts());

    const favoriotes = useSelector(getFavorites());

    const isLoggedIn = useSelector(getIsLoggedIn());

    // data авторизованного юзера
    const currentUserData = useSelector(getCurrentUserData());

    // Товары корзины у зарегистрированного пользователя
    const currentUserId = useSelector(getCurrentUserId());

    const filterProductInNavAuthUser =
        currentUserId && cart && cart.filter((c) => c.userId === currentUserId);

    // Избранные товары у зарегистрированного юзера
    const favoritesAuthUser =
        favoriotes && favoriotes.filter((f) => f.userId === currentUserId);

    useEffect(() => {
        dispatch(loadCartList());
    }, [dispatch]);

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        className="rounded-pill"
                        src={imageLogo}
                        alt="logo"
                        width="100px"
                        height="75px"
                    />
                </Link>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {!products && (
                                <Link
                                    className="link-underline link-underline-opacity-0"
                                    to="/products"
                                >
                                    Каталог
                                </Link>
                            )}
                        </li>
                    </ul>
                    {!Id && (
                        <div className="d-flex mx-auto p-2 ">
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Search"
                                id="searchQuery"
                                name="searchQuery"
                                onChange={onChange}
                                value={searchQuery}
                            />
                        </div>
                    )}

                    <ul className=" nav d-flex">
                        {currentUserData?.name !== "admin" ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders">
                                        Заказы
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link position-relative"
                                        to="/cart"
                                    >
                                        Корзина
                                        {filterProductInNavAuthUser?.length >
                                            0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {
                                                    filterProductInNavAuthUser.length
                                                }
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link position-relative"
                                        to="/favorites"
                                    >
                                        Избранное
                                        {favoritesAuthUser?.length > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {favoritesAuthUser.length}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            history.push("/admin")
                        )}

                        <li className="nav-item">
                            {isLoggedIn ? (
                                <NavProfile />
                            ) : (
                                <Link className="nav-link" to="/login">
                                    Профиль
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    currentProduct: PropTypes.object,
    productsInCart: PropTypes.array,
    products: PropTypes.array
};

export default NavBar;
