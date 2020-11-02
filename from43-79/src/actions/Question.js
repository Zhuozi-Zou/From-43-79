export const leaveEdit = editQuestion => {
    editQuestion.props.history.push('/AskForHelp');
};

export const addNewQuestion = editQuestion =>{
    const newQuestionInfo = editQuestion.state;
    newQuestionInfo.user = editQuestion.user;
    let valid = true;
    const errors = newQuestionInfo.errors;
    for (const [k, v] of Object.entries(newQuestionInfo)){
        if(v === ""){
            valid = false;
            errors[k] = true;
        }else{
            errors[k] = false;
        }
    }
    editQuestion.setState({[errors]: errors});

    if(valid) {
        const url = "/questions/addNewQuestion";
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify(newQuestionInfo),
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
                editQuestion.props.history.push('/AskForHelp');
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export const deleteQuestion = DetailedQ => {
    const url = "/questions/delete/" + DetailedQ.state.question._id;
    const question = { question: DetailedQ.state.question._id };

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(question),
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
                alert("Could not delete this question");
            }
        })
        .then(json => {
            if (json) {
                DetailedQ.props.history.push('/AskForHelp');
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const addNewComment = detailedQ => {
    const url = "/questions/addNewComment";
    const qid = detailedQ.state.question._id;
    const comment = {
        user: detailedQ.user,
        comment: detailedQ.state.commentContent,
        replyTo: null,
        question: qid
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
            getQuestionById(detailedQ, qid);
            detailedQ.setState({"open": false, "commentContent": ""});
            detailedQ.props.history.push('/DetailedQuestion', {question: detailedQ.state.question});
        })
        .catch(error => {
            console.log(error);
        });
};

export const addNewReply = (detailedQ, replyTo) => {
    const url = "/questions/addNewComment";
    const qid = detailedQ.state.question._id;
    const comment = {
        user: detailedQ.user,
        comment: detailedQ.state.replyContent,
        replyTo: replyTo,
        question: qid
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
            getQuestionById(detailedQ, qid);
            detailedQ.setState({"open": false, "replyContent": ""});
            detailedQ.props.history.push('/DetailedQuestion', {question: detailedQ.state.question});
        })
        .catch(error => {
            console.log(error);
        });
};

const getQuestionById = (detailedQ, id) => {
    const url = "/questions/" + id;
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get question");
            }
        })
        .then(json => {
            if (json) {
                detailedQ.setState({ question: json, open: false});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const resetFilters = component => {
    const {questions} = component.state;
    const type = document.getElementById('typeSelector');
    type.value = '';
    type.innerText = 'All';
    const region = document.getElementById('regionSelector');
    region.value = '';
    region.innerText = 'All';
    const theme = document.getElementById('themeSelector');
    theme.value = '';
    theme.innerText = 'All';
    const filters = ['All', 'All', 'All'];

    component.setState({
        view: questions,
        filters: filters
    });
};

export const findMyQuestions = component => {
    const {user, questions} = component.state;
    const myQs = questions.filter(question => {
        return question.user._id === user;
    });
    component.setState({
        view: myQs
    });
};

export const findQuestions = (component, name, value) => {
    const val = value === '' ? 'All' : value;
    const {questions, filters} = component.state;

    const type = name === 'type' ? val : filters[0];
    const region = name === 'region' ? val : filters[1];
    const theme = name === 'theme' ? val : filters[2];
    const filts = [type, region, theme];

    const foundQuestions = questions.filter(post => {
        return (type === 'All' ? true : post.type._id === type) &&
            (region === 'All' ? true : post.region._id === region) &&
            (theme === 'All' ? true : post.theme._id === theme);
    });
    component.setState({
        view: foundQuestions,
        filters: filts
    });
};

export const viewQuestions = (component, question) => {
    component.props.history.push('/DetailedQuestion', {question: question});
};

export const getAllQuestions = (askForHelp, id) => {
    const url = "/questions";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get questions");
            }
        })
        .then(json => {
            const view = id === 'all' ? json.questions : json.questions.filter(post => {
                return post.user._id === id;
            });
            askForHelp.setState({ questions: json.questions, view: view});
        })
        .catch(error => {
            console.log(error);
        });
};