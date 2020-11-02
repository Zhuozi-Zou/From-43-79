import React from "react";

const log = console.log;


export const editAccount = (component) => {
    const app = component.app;
    const url = "/users/" + component.userId + "/editAccount";
    const { errors, ...user } = component.state;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(user),
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
                    app.setState({ nickName: json.user.nickName });
                    component.props.history.push("/MyAccount");
                }
            }
        })
        .catch(error => {
            log(error);
        });
};