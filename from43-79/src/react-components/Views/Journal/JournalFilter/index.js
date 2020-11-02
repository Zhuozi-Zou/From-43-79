import React from "react";
import "./styles.css";
import {InputLabel, Select} from "@material-ui/core";
import {getTags} from "../../../../actions/filter";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


/* Component for the journal filter components */
class JournalFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
            region: [],
            theme: []
        };
    }

    componentDidMount() {
        getTags(this, 'journal');
    }

    render() {
        const {onChange, dates, errors} = this.props;
        return (
            <div>
                <div className="journalFilter">
                    <div className="type">
                        <InputLabel>Type</InputLabel>
                        <Select defaultValue="" displayEmpty id="typeSelector" onChange={onChange} name="type"
                                error={errors.type}>
                            <option value="">All</option>
                            {this.state.type.map(tag => {
                                if (tag.status === 'active') {
                                    return (<option value={tag._id}>{tag.name}</option>)
                                }
                            })}
                        </Select>

                    </div>

                    <div className="region">
                        <InputLabel>Region</InputLabel>
                        <Select defaultValue="" displayEmpty id="regionSelector" onChange={onChange} name="region"
                                error={errors.region}>
                            <option value="">All</option>
                            {this.state.region.map(tag => {
                                if (tag.status === 'active') {
                                    return (<option value={tag._id}>{tag.name}</option>)
                                }
                            })}
                        </Select>

                    </div>

                    <div className="theme">
                        <InputLabel>Theme</InputLabel>
                        <Select defaultValue="" displayEmpty id="themeSelector" onChange={onChange} name="theme"
                                error={errors.theme}>
                            <option value="">All</option>
                            {this.state.theme.map(tag => {
                                if (tag.status === 'active') {
                                    return (<option value={tag._id}>{tag.name}</option>)
                                }
                            })}
                        </Select>
                    </div>


                </div>
                <div className="journalFilter">
                    <div className='chooseDate'>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="start-date"
                                label="Start Date"
                                value={dates[0]}
                                maxDate={dates[1]}
                                onChange={date => onChange({target: {name: 'start', value: date}})}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className='chooseDate'>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="end-date"
                                label="End Date"
                                value={dates[1]}
                                maxDate={new Date()}
                                onChange={date => onChange({target: {name: 'end', value: date}})}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default JournalFilter;