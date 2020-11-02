import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import FormInput from "../FormInput";
import { signUp } from "../../../actions/login";

import "./styles.css";

const logo = require("./static/logo.png");


/* Component for the SignUp page */
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        repeatPwd: "",
        nickName: "",
        errors: {
            username: "",
            password: "",
            repeatPwd: "",
            nickName: "",
            usernameBool: false,
            passwordBool: false,
            repeatPwdBool: false,
            nickNameBool: false
        }
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            signUp(this);
        }
    };

    render() {
        return (
            <Grid className="signUp-form" container spacing={3}
                  onKeyDown={this.handleKeyDown}>
                <img className="logo-image-signUp" src={logo} alt=""/>

                <FormInput
                    name="nickName"
                    value={this.state.nickName}
                    onChange={this.handleChange}
                    label="Nick Name"
                    error={this.state.errors.nickNameBool}
                    helperText={this.state.errors.nickName}
                />

                <FormInput
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    label="Email"
                    error={this.state.errors.usernameBool}
                    helperText={this.state.errors.username}
                />

                <FormInput
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    label="Password"
                    type="password"
                    error={this.state.errors.passwordBool}
                    helperText={this.state.errors.password}
                />

                <FormInput
                    name="repeatPwd"
                    value={this.state.repeatPwd}
                    onChange={this.handleChange}
                    label="Repeated password"
                    type="password"
                    error={this.state.errors.repeatPwdBool}
                    helperText={this.state.errors.repeatPwd}
                />

                <Grid
                    className="signUp-form__button-grid"
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    s={12}
                    xs={12}
                >
                    <Button
                        className="signUp-form__submit-button"
                        onClick={() => signUp(this)}
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default SignUp;