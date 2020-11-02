import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import Header from "../../../Header";
import { changePassword } from "../../../../actions/changePassword";

import "./styles.css";
import FormInput from "../../FormInput";


/* Component for the Change Password page */
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.app = this.props.app;
        this.userId = this.app.state.currentUser;
        this.role = this.app.state.role;
        this.username = this.app.state.username;
    }

    state = {
        oldPwd: "",
        newPwd: "",
        repeatPwd: "",
        errors: {
            oldPwd: "",
            newPwd: "",
            repeatPwd: "",
            oldPwdBool: false,
            newPwdBool: false,
            repeatPwdBool: false
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
            (changePassword(this));
        }
    };

    render() {
        return (
            <div>
                <Header role={this.role}/>
                <h1>Change Password</h1>

                <Grid className="changePwd-form" container spacing={3} onKeyDown={this.handleKeyDown}>
                    <FormInput
                        name="oldPwd"
                        value={this.state.oldPwd}
                        onChange={this.handleChange}
                        label="Old Password"
                        type="password"
                        error={this.state.errors.oldPwdBool}
                        helperText={this.state.errors.oldPwd}
                    />

                    <FormInput
                        name="newPwd"
                        value={this.state.newPwd}
                        onChange={this.handleChange}
                        label="New Password"
                        type="password"
                        error={this.state.errors.newPwdBool}
                        helperText={this.state.errors.newPwd}
                    />

                    <FormInput
                        name="repeatPwd"
                        value={this.state.repeatPwd}
                        onChange={this.handleChange}
                        label="Repeat New Password"
                        type="password"
                        error={this.state.errors.repeatPwdBool}
                        helperText={this.state.errors.repeatPwd}
                    />

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Button
                            className="changePwd-form__button"
                            onClick={() => changePassword(this)}
                        >
                            Change Password
                        </Button>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Link className="changePwd__button-link" to="/MyAccount">
                            <Button className="changePwd-form__button">Cancel</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default ChangePassword;