const getUsers = async (cb, filter = false) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => filter ? data.filter(user => user.name.includes(filter)) : data);
        cb(response);
    } catch (error) {
        console.log(error);
    }
}


const elTemplate = document.getElementsByTagName("template")[0].content;
const elList = document.querySelector(".js-list");
const elSearch = document.getElementsByName("search")[0];

const renderUsers = (users) => {
    elList.innerHTML = "";
    users.forEach(user => {

        let clone = elTemplate.cloneNode(true);

        let name = clone.querySelector(".js-name");
        name.textContent = name.textContent + user.name;

        let email = clone.querySelector(".js-email");
        email.textContent = email.textContent + user.email;

        let username = clone.querySelector(".js-username");
        username.textContent = username.textContent + user.username;

        elList.appendChild(clone);
    });
}

getUsers(renderUsers);

elSearch.addEventListener("change", (evt) => {
    evt.preventDefault();
    getUsers(renderUsers, evt.target.value.trim());
})
