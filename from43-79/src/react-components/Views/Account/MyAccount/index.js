import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

import Header from "../../../Header";
import { getUser } from "../../../../actions/userAccount";
import { logout } from "../../../../actions/login";


/* Component for the MyAccount page */
class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.app = this.props.app;
        this.userId = this.app.state.currentUser;
        this.role = this.app.state.role;
    }

    state = {
        user: {}
    };

    componentDidMount() {
        getUser(this, this.userId);
    }

    render() {
        const { password, _id, status, __v, updatedAt, createdAt, ...user } = this.state.user;

            return (
            <div>
                <Header cur="Account" role={this.role}/>
                <h1>My Account</h1>

                <Grid className="myAccount-fields" container spacing={3}>
                    {Object.entries(user).map(([key, value]) => {
                        return (
                            <Grid item xl={12} lg={12} md={12} s={12} xs={12} key={"myAccount-" + key}>
                                <TextField
                                    className="myAccount-info"
                                    multiline rowsMax="5"
                                    label={key}
                                    defaultValue={value}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        )
                    })}

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Link className="myAccount__button-link" to={{ pathname: "/EditMyAccount", user: this.state.user }}>
                            <Button className="myAccount__button">Edit My Account</Button>
                        </Link>
                        <Link className="myAccount__button-link" to="/ChangePassword">
                            <Button className="myAccount__button">Change Password</Button>
                        </Link>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Button className="myAccount__button red" onClick={() => logout(this.app)}>
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default MyAccount;