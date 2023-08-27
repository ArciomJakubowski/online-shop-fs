import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserLoader from "../components/ui/hoc/userLoader";
import UpDateUserPageForm from "../components/ui/upDateUserForm";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();

    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UserLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <UpDateUserPageForm />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <h1>Loading...</h1>
                )}
            </UserLoader>
        </>
    );
};

export default Users;
