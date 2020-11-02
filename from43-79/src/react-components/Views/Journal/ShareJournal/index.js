import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./styles.css";

import Header from "../../../Header";
import JournalFilter from "../JournalFilter";
import { findMyJournals, findJournals, viewJournals, resetFilters, getAllJournals} from "../../../../actions/Journal";
import {editFilters} from "../../../../actions/filter";

const datetime = require('date-and-time');

/* Component for the ShareJournal page */
class ShareJournal extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.id = this.props.history.location.id ? this.props.history.location.id: 'all';
        this.role = this.props.app.state.role;
        this.state = {
            user: this.user,
            journals: [],
            view: [],
            filters: ['All', 'All', 'All', datetime.addYears(new Date(), -1), new Date()],
            errors: {
                type: false,
                time: false,
                region: false,
                theme: false,
            }
        };
    }

    componentDidMount() {
        getAllJournals(this, this.id);
    }

    handleChange = event => {
        findJournals(this, event.target.name, event.target.value);
    };

    render() {
        return (
            <div>
                <Header cur="Journal" role={this.role}/>

                <JournalFilter onChange={this.handleChange}
                               role={this.role}
                               dates={[this.state.filters[3], this.state.filters[4]]}
                               errors={this.state.errors}/>

                <div className="journal-buttons">
                    <Link className="journal__button-link" to="/EditJournal">
                        <Button className="journal__button">Share a Journey</Button>
                    </Link>
                    <Button className="journal__button"
                            onClick={ () => findMyJournals(this) }>
                        View My Journals
                    </Button>
                    <Button className="journal__button"
                            onClick={ () => resetFilters(this) }>
                        Reset Filters
                    </Button>
                    {this.role === 'admin' &&
                    <Button className="post__button"
                            onClick={ () => editFilters(this, 'journal') }>
                        Edit Filters
                    </Button>}
                </div>

                <div className="journals">
                    {this.state.view.map(journal => (
                        <Grid container justify="center" className="journal" key={journal.id}>
                            <Paper className="journal__paper">
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                Posted by: {journal.user.nickName}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Type: {journal.type.name}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Start Date: {datetime.format(new Date(journal.startDate), 'MMM D YYYY')}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                End Date: {datetime.format(new Date(journal.endDate), 'MMM D YYYY')}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Tags: {journal.region.name}, {journal.theme.name}
                                            </Typography>
                                            <Typography variant="body1" className="journal__details" gutterBottom>
                                                {journal.briefInfo}
                                            </Typography>
                                        </Grid>

                                        <Grid item className="details">
                                            <Button className="details__button"
                                                    onClick={ () => viewJournals(this, journal)}>
                                                View Details
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </div>
            </div>
        );
    }
}


export default ShareJournal;