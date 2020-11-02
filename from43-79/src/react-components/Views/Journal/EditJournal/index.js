import React from "react";
import Button from "@material-ui/core/Button";
import "./styles.css";
import Grid from "@material-ui/core/Grid";

import Header from "../../../Header";
import JournalFilter from "../JournalFilter";
import EditInput from "../../EditInput";
import {addNewJournal, leaveEdit} from "../../../../actions/Journal";
const datetime = require('date-and-time');


/* Component for the EditJournal page */
class EditJournal extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.nickName = this.props.app.state.nickName;
        this.state = {
            user: "",
            type: "",
            start: datetime.addYears(new Date(), -1),
            end: new Date(),
            region: "",
            theme: "",
            briefInfo: "",
            details: "",
            errors: {
                type: false,
                region: false,
                theme: false,
                briefInfo: false,
                details: false
            }
        };
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div>
                <Header cur="Journal" role={this.role}/>

                <h1>Edit your journal:</h1>
                <JournalFilter onChange={this.handleChange} errors={this.state.errors} role={this.role}
                               dates={[this.state.start, this.state.end]}/>

                <Grid container justify='center' className="journalInput">
                    <div className='input'>
                        <EditInput
                            name="briefInfo"
                            id="briefInfo"
                            value={this.briefInfo}
                            onChange={this.handleChange}
                            label="Brief Introduction"
                            error={this.state.errors.briefInfo}
                            helperText="Please give a brief introduction of your journal"
                        />

                        <EditInput
                            name="details"
                            id="details"
                            value={this.state.details}
                            onChange={this.handleChange}
                            label="More details"
                            error={this.state.errors.details}
                            helperText="Writing your journal here!"
                        />
                    </div>
                </Grid>

                <div className="editJournalButtons">
                    <Button
                        className="editJournal_postButton"
                        onClick={() => addNewJournal(this)}
                    >
                        Post
                    </Button>

                    <Button
                        className="editJournal_deleteButton"
                        onClick={() => leaveEdit(this)}
                    >
                        Leave
                    </Button>
                </div>


            </div>
        );
    }
}


export default EditJournal;