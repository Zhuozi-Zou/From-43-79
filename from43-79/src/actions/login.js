import React from "react";

const log = console.log;


export const submit = (loginComp) => {
    const { app } = loginComp.props;
    const form = {
        username: loginComp.state.username,
        password: loginComp.state.password
    };

    const request = new Request("/login/submit", {
        method: "post",
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
                if (json.currentUser) {
                    app.setState({ currentUser: json.currentUser, username: json.username, nickName: json.nickName, role: json.role });
                    loginComp.props.history.push("/FindBuddy");
                } else if (json.errors) {
                    loginComp.setState({ errors: json.errors });
                }
            }
        })
        .catch(error => {
            log(error);
        });
};


export const signUp = (component) => {
    const { app } = component.props;
    const form = {
        username: component.state.username,
        password: component.state.password,
        repeatPwd: component.state.repeatPwd,
        nickName: component.state.nickName
    };

    const request = new Request("/login/signUp", {
        method: "post",
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
                if (json.currentUser) {
                    app.setState({ currentUser: json.currentUser, username: json.username, nickName: json.nickName, role: json.role });
                    component.props.history.push("/FindBuddy");
                } else if (json.errors) {
                    component.setState({ errors: json.errors });
                }
            }
        })
        .catch(error => {
            log(error);
        });
};


// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    const url = "/login/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({
                    currentUser: json.currentUser,
                    username: json.username,
                    nickName: json.nickName,
                    role: json.role,
                    render: true
                });
            } else {
                app.setState({render: true})
            }
        })
        .catch(error => {
            console.log(error);
        });
};


export const logout = (app) => {
    fetch("/login/logout")
        .then(res => {
            if (res.status === 200) {
                app.setState({
                    currentUser: null,
                    username: null,
                    nickName: null,
                    role: null,
                    render: true
                });
            }
        })
        .catch(error => {
            log(error);
        });
};