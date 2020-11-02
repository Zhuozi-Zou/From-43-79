import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import FormInput from "../FormInput";
import { submit } from "../../../actions/login";

import "./styles.css";
import {Link} from "react-router-dom";

const logo = require("./static/logo.png");


/* Component for the Login page */
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/");
    }

    state = {
        username: "",
        password: "",
        errors: {
            username: "",
            password: "",
            usernameBool: false,
            passwordBool: false,
            checkBool: false
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
            submit(this);
        }
    };

    render() {
        return (
            <Grid className="login-form" container spacing={3} onKeyDown={this.handleKeyDown}>
                <img className="logo-image-login" src={logo} alt=""/>

                <FormInput
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    label="Username"
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

                <Grid
                    className="login-form__button-grid"
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    s={12}
                    xs={12}
                >
                    <Button
                        className="login-form__button"
                        onClick={() => submit(this)}
                    >
                        Log in
                    </Button>

                    <Link className="login__button-link" to="/SignUp">
                        <Button className="login-form__button">
                            Sign Up
                        </Button>
                    </Link>
                </Grid>

                {this.state.errors.checkBool && <p className="login-check">Invalid username or password</p>}
            </Grid>
        );
    }
}


export default Login;