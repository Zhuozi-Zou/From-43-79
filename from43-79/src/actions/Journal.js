const datetime = require('date-and-time');

export const addNewJournal = editJournal =>{
    const newJournalInfo = editJournal.state;
    newJournalInfo.user = editJournal.user;
    let valid = true;
    const errors = newJournalInfo.errors;
    for (const [k, v] of Object.entries(newJournalInfo)){
        if(v === ""){
            valid = false;
            errors[k] = true;
        }else{
            errors[k] = false;
        }
    }
    editJournal.setState({[errors]: errors});

    if(valid) {
        const url = "/journals/addNewJournal";
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify(newJournalInfo),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(() => {
                editJournal.props.history.push('/ShareJournal');
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export const leaveEdit = editJournal => {
    editJournal.props.history.push('/ShareJournal');
};

export const deleteJournal = DetailedJ => {
    const url = "/journals/delete/" + DetailedJ.state.journal._id;
    const journal = { journal: DetailedJ.state.journal._id };

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(journal),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not delete this journal");
            }
        })
        .then(json => {
            if (json) {
                DetailedJ.props.history.push('/ShareJournal');
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const resetFilters = component => {
    const {journals} = component.state;
    const type = document.getElementById('typeSelector');
    type.value = '';
    type.innerText = 'All';
    const region = document.getElementById('regionSelector');
    region.value = '';
    region.innerText = 'All';
    const theme = document.getElementById('themeSelector');
    theme.value = '';
    theme.innerText = 'All';
    const filters = ['All', 'All', 'All', datetime.addYears(new Date(), -1), new Date()];

    component.setState({
        view: journals,
        filters: filters
    });
};

export const findMyJournals = component => {
    const {user, journals} = component.state;
    const myJournals = journals.filter(journal => {
        return journal.user._id === user;
    });
    component.setState({
        view: myJournals
    });
};

export const findJournals = (component, name, value) => {
    const val = value === '' ? 'All' : value;
    const {journals, filters} = component.state;

    const type = name === 'type' ? val : filters[0];
    const region = name === 'region' ? val : filters[1];
    const theme = name === 'theme' ? val : filters[2];
    const start = name === 'start' ? val : filters[3];
    const end = name === 'end' ? val : filters[4];
    const filts = [type, region, theme, start, end];

    const foundJournals = journals.filter(journal => {
        return (type === 'All' ? true : journal.type._id === type) &&
            (region === 'All' ? true : journal.region._id === region) &&
            (theme === 'All' ? true : journal.theme._id === theme) &&
            (new Date(journal.startDate) >= datetime.addDays(start, -1)) &&
            (new Date(journal.endDate) <= datetime.addDays(end, 1));
    });
    component.setState({
        view: foundJournals,
        filters: filts
    });
};

export const viewJournals = (component, journal) => {
    component.props.history.push('/DetailedJournal', {journal: journal});
};

export const getAllJournals = (shareJournal, id) => {
    const url = "/journals";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get journals");
            }
        })
        .then(json => {
            const view = id === 'all' ? json.journals : json.journals.filter(post => {
                return post.user._id === id;
            });
            shareJournal.setState({ journals: json.journals, view: view });
        })
        .catch(error => {
            console.log(error);
        });
};

export const addNewComment = detailedJ => {
    const url = "/journals/addNewComment";
    const jid = detailedJ.state.journal._id;
    const comment = {
        user: detailedJ.user,
        comment: detailedJ.state.commentContent,
        replyTo: null,
        journal: jid
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(() => {
            getJournalById(detailedJ, jid);
            detailedJ.setState({"open": false, "commentContent": ""});
            detailedJ.props.history.push('/DetailedJournal', {journal: detailedJ.state.journal});
        })
        .catch(error => {
            console.log(error);
        });
};

export const addNewReply = (detailedJ, replyTo) => {
    const url = "/journals/addNewComment";
    const jid = detailedJ.state.journal._id;
    const comment = {
        user: detailedJ.user,
        comment: detailedJ.state.replyContent,
        replyTo: replyTo,
        journal: jid
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(() => {
            getJournalById(detailedJ, jid);
            detailedJ.setState({"open": false, "replyContent": ""});
            detailedJ.props.history.push('/DetailedJournal', {journal: detailedJ.state.journal});
        })
        .catch(error => {
            console.log(error);
        });
};


const getJournalById = (detailedJ, id) => {
    const url = "/journals/" + id;
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get journal " + res.status);
            }
        })
        .then(json => {
            if (json) {
                detailedJ.setState({ journal: json, open: false});
            }
        })
        .catch(error => {
            console.log(error);
        });
};