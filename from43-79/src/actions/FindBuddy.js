const datetime = require('date-and-time');

export const addNewPost = (editPost) =>{
    const newPostInfo = editPost.state;
    newPostInfo.user = editPost.user;
    let valid = true;
    const errors = newPostInfo.errors;
    for (const [k, v] of Object.entries(newPostInfo)){
        if(v === ""){
            valid = false;
            errors[k] = true;
        }else{
            errors[k] = false;
        }
    }
    editPost.setState({[errors]: errors});

    if(valid) {
        const url = "/posts/addNewPost";
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify(newPostInfo),
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
                editPost.props.history.push('/FindBuddy');
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export const deletePost = DetailedP => {
    const url = "/posts/delete/" + DetailedP.state.post._id;
    const post = { post: DetailedP.state.post._id };

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(post),
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
                alert("Could not delete this post");
            }
        })
        .then(json => {
            if (json) {
                DetailedP.props.history.push('/FindBuddy');
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const leaveEdit = editPost => {
    editPost.props.history.push('/FindBuddy');
};

export const resetFilters = component => {
    const {posts} = component.state;
    const type = document.getElementById('typeSelector');
    type.value = '';
    type.innerText = 'All';
    const region = document.getElementById('regionSelector');
    region.value = '';
    region.innerText = 'All';
    const theme = document.getElementById('themeSelector');
    theme.value = '';
    theme.innerText = 'All';
    const filters = ['All', 'All', 'All', new Date(), datetime.addYears(new Date(), 1)];
    const finalposts = posts.filter(post => {
        return new Date(post.endDate) >= datetime.addDays(new Date(), -1);
    });

    component.setState({
        view: finalposts,
        filters: filters
    });
};

export const findMyPosts = component => {
    const {user, posts} = component.state;
    const myPosts = posts.filter(post => {
        return post.user._id === user;
    });
    component.setState({
        view: myPosts
    });
};

export const findPosts = (component, name, value)  => {
    const val = value === '' ? 'All' : value;
    const {posts, filters} = component.state;

    const type = name === 'type' ? val : filters[0];
    const region = name === 'region' ? val : filters[1];
    const theme = name === 'theme' ? val : filters[2];
    const start = name === 'start' ? val : filters[3];
    const end = name === 'end' ? val : filters[4];
    const filts = [type, region, theme, start, end];

    const foundPosts = posts.filter(post => {
        return (new Date(post.endDate) >= datetime.addDays(new Date(), -1)) &&
            (type === 'All' ? true : post.type._id === type) &&
            (region === 'All' ? true : post.region._id === region) &&
            (theme === 'All' ? true : post.theme._id === theme) &&
            (new Date(post.startDate) >= datetime.addDays(start, -1)) &&
            (new Date(post.endDate) <= datetime.addDays(end, 1));
    });
    component.setState({
        view: foundPosts,
        filters: filts
    });
};

export const viewPosts = (component, post) => {
    component.props.history.push('/DetailedPost', {post: post});
};

export const getAllPosts = (findBuddy, id) => {
    const url = "/posts";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get posts");
            }
        })
        .then(json => {
            const posts = json.posts.filter(post => {
                return new Date(post.endDate) >= datetime.addDays(new Date(), -1);
            });
            const view = id === 'all' ? posts : posts.filter(post => {
                return post.user._id === id;
            });
            findBuddy.setState({ posts: json.posts, view: view });
        })
        .catch(error => {
            console.log(error);
        });
};

export const addNewComment = detailedP => {
    const url = "/posts/addNewComment";
    const pid = detailedP.state.post._id;
    const comment = {
        user: detailedP.user,
        comment: detailedP.state.commentContent,
        replyTo: null,
        post: pid
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
            getPostById(detailedP, pid);
            detailedP.setState({"open": false, "commentContent": ""});
            detailedP.props.history.push('/DetailedPost', {post: detailedP.state.post});
        })
        .catch(error => {
            console.log(error);
        });
};

export const addNewReply = (detailedP, replyTo) => {
    const url = "posts/addNewComment";
    const pid = detailedP.state.post._id;
    const comment = {
        user: detailedP.user,
        comment: detailedP.state.replyContent,
        replyTo: replyTo,
        post: pid
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
            getPostById(detailedP, pid);
            detailedP.setState({"open": false, "replyContent": ""});
            detailedP.props.history.push('/DetailedPost', {post: detailedP.state.post});
        })
        .catch(error => {
            console.log(error);
        });
};

const getPostById = (detailedP, id) => {
    const url = "/posts/" + id;
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get post");
            }
        })
        .then(json => {
            if (json) {
                detailedP.setState({ post: json, open: false});
            }
        })
        .catch(error => {
            console.log(error);
        });
};