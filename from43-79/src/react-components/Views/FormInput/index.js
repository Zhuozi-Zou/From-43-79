import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import "./styles.css";

/* Component for the Input field, a wrapper around MUI TextField */
class FormInput extends React.Component {

    render() {
        const {label, value, onChange, name, type, error, helperText} = this.props;

        return (
            <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                <TextField
                    required={true}
                    name={name}
                    error={error}
                    helperText={helperText}
                    label={label}
                    id={"margin-normal_" + name}
                    defaultValue={value || ""}
                    className="input-form"
                    margin="normal"
                    onChange={onChange}
                    type={type}
                />
            </Grid>
        );
    }
}

export default FormInput;
