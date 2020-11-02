export const getAllUsers = viewUsers => {
    const url = "/users";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get users");
            }
        })
        .then(json => {
            viewUsers.setState({ users: json.users });
        })
        .catch(error => {
            console.log(error);
        });
};
