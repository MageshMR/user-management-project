document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTableBody');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let editUserId = null;

    function renderUsers() {
        userTableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    window.editUser = (index) => {
        const user = users[index];
        nameInput.value = user.name;
        emailInput.value = user.email;
        editUserId = index;
    };

    window.deleteUser = (index) => {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
    };

    userForm.querySelector('button').addEventListener('click', () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name && email) {
            if (email.endsWith('@gmail.com')) {
                if (editUserId !== null) {
                    users[editUserId] = { name, email };
                    editUserId = null;
                } else {
                    users.push({ name, email });
                }

                localStorage.setItem('users', JSON.stringify(users));
                userForm.querySelector('form').reset();
                renderUsers();
            } else {
                alert('Please enter a valid Gmail address ending with @gmail.com');
            }
        }
    });

    renderUsers();
});
