export const getTags = (component, page) => {
    const url = "/tags/" + page;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get tags");
            }
        })
        .then(json => {
            const tags = json.tags;
            const type = tags.filter(tag => {
                return tag.filter === 'type';
            });
            const region = tags.filter(tag => {
                return tag.filter === 'region';
            });
            const theme = tags.filter(tag => {
                return tag.filter === 'theme';
            });

            component.setState({
                type: type,
                region: region,
                theme: theme
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const addNewTag = (component, page, filter, name) => {
    const url = '/tags/' + page;
    const tag = {
        name: name,
        filter: filter,
        user: component.state.user
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(tag),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    let {type, region, theme} = component.state;
    return fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not add tag");
            }
        })
        .then(tag => {
            if (filter === 'type') {
                type.push(tag);
            } else if (filter === 'region') {
                region.push(tag);
            } else {
                theme.push(tag);
            }
            component.setState({
                type: type,
                region: region,
                theme: theme
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateTag = (component, id, filter, index, name, status) => {
    const url = '/tags/' + id;
    const tag = {
        name: name,
        status: status
    };

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(tag),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    let {type, region, theme} = component.state;
    return fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not modify tag");
            }
        })
        .then(json => {
            const tag = json.tag;
            if (filter === 'type') {
                type.splice(index, 1, tag);
            } else if (filter === 'region') {
                region.splice(index, 1, tag);
            } else {
                theme.splice(index, 1, tag);
            }
            component.setState({
                type: type,
                region: region,
                theme: theme
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const editFilters = (component, page) => {
    component.props.history.push('/EditFilters', {page: page});
};

