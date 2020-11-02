/* Methods in this file modifies the ChangePassword component state */
import React from "react";

import { logout } from "./login";

const log = console.log;


export const changePassword = (component) => {
    const app = component.app;
    const form = {
        oldPwd: component.state.oldPwd,
        newPwd: component.state.newPwd,
        repeatPwd: component.state.repeatPwd,
        username: component.username
    };
    const url = "/users/" + component.userId + "/changePassword";

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
            if (res.status === 200 || res.status === 400) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                if (json.errors) {
                    component.setState({ errors: json.errors });
                } else {
                    logout(app);
                }
            }
        })
        .catch(error => {
            log(error);
        });
};