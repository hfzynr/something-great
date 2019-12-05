import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import GuestHeader from "./guest/Header";
import Dashboard from "./member/Dashboard";

function Header() {
    return (
        <Fragment>
            {JSON.parse(localStorage.getItem("token")) === null ? (
                <GuestHeader />
            ) : (
                <Dashboard />
            )}
        </Fragment>
    );
}

export default withRouter(Header);