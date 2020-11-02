import React from "react";
import "./styles.css";
import {Select, InputLabel} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {getTags} from "../../../../actions/filter";

/* Component for the post filter components */
class PostFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
            region: [],
            theme: []
        };
    }

    componentDidMount() {
        getTags(this, 'post');
    }

    render() {
        const {onChange, dates, errors} = this.props;

        return (
            <div>
                <div className="postFilter">
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

                <div className="postFilter">
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
                                minDate={new Date()}
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
                                minDate={dates[0]}
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

export default PostFilter;