import React from "react";
import PropTypes, { number, string } from "prop-types";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
import UserCard from "../../ui/userCard";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const userById = useSelector(getUserById(id));
    return (
        <>
            <Link
                to={"/products"}
                role="button"
                className="container col-1  m-3 btn btn-primary"
            >
                <i className="bi bi-caret-left"></i>Назад
            </Link>
            <div className="container border  border h-100 m-auto mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 mb-4">
                        <h1 className="offset-md-4 my-4">User Page</h1>
                        <UserCard items={userById} />
                    </div>
                </div>
            </div>
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.oneOfType([string, number])
};

export default UserPage;
