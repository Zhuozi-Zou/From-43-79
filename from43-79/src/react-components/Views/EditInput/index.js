import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import "./styles.css";

/* Component for the Input field, a wrapper around MUI TextField */
class EditInput extends React.Component {

    render() {
        const {label, value, onChange, name, helperText, id, error} = this.props;

        return (
            <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                <TextField
                    name={name}
                    helperText={helperText}
                    label={label}
                    id={id}
                    defaultValue={value || ""}
                    className="input-edit"
                    onChange={onChange}
                    variant="outlined"
                    error = {error}
                    multiline
                />
            </Grid>
        );
    }
}

export default EditInput;
