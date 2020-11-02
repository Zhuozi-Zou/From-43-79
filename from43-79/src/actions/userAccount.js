import React from "react";
import { logout } from "./login";

const log = console.log;


export const deleteUser = (component) => {
    const url = "/users/" + component.state.user._id + "/deleteUser";
    const form = { loggedInId: component.userId };
    const { app } = component.props;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not delete user");
            }
        })
        .then(json => {
            if (json) {
                if (component.state.user.username !== component.username) {
                    component.props.history.push('/ViewUsers');
                } else {
                    logout(app);
                }
            }
        })
        .catch(error => {
            log(error);
        });
};


export const getUser = (component, userId) => {
    const url = "/users/" + userId;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get user");
            }
        })
        .then(json => {
            if (json.user) {
                component.setState({ user: json.user });
            }
        })
        .catch(error => {
            log(error);
        });
};