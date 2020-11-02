import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

import Header from "../../../Header";
import { editAccount } from "../../../../actions/editMyAccount";


/* Component for the EditMyAccount page */
class EditMyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.app = this.props.app;
        this.userId = this.app.state.currentUser;
        this.role = this.app.state.role;

        const { username, password, role, _id, status, __v, updatedAt, createdAt, ...user } = this.props.history.location.user;
        this.state = user;

        this.state["errors"] = {
            age: "",
            phone: "",
            nickName: "",
            ageBool: false,
            phoneBool: false,
            nickNameBool: false
        };
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value.trim()
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            (editAccount(this));
        }
    };

    render() {

        return (
            <div>
                <Header role={this.role}/>
                <h1>Edit My Account</h1>

                <Grid className="editMyAccount-fields" container spacing={3} onKeyDown={this.handleKeyDown}>
                    {Object.entries(this.state).map(([key, value]) => {
                        if (key !== "errors") {
                            return (
                                <Grid item xl={12} lg={12} md={12} s={12} xs={12} key={"editMyAccount-" + key}>
                                    <TextField
                                        required={key === "nickName"}
                                        name={key}
                                        className="editMyAccount-info"
                                        label={key}
                                        multiline rowsMax="5"
                                        defaultValue={value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        error={this.state.errors[key + "Bool"]}
                                        helperText={this.state.errors[key]}
                                    />
                                </Grid>
                            )
                        }
                    })}

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Button className="editMyAccount__button" onClick={() => editAccount(this)}>Save</Button>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Link className="editMyAccount__button-link" to="/MyAccount">
                            <Button className="editMyAccount__button">Cancel</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default EditMyAccount;