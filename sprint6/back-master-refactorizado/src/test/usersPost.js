const axios = require('axios');

const urls = [
    'https://example.com/api/register',
    'https://anotherexample.com/api/register',
    // Agrega más URLs aquí
];

const users = [
    { name: 'User1', email: 'user1@example.com', password: 'password123' },
    { name: 'User2', email: 'user2@example.com', password: 'password123' },
    // Agrega más usuarios aquí
];

const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_API_TOKEN', // Reemplaza con tu token si es necesario
};

async function registerUsers() {
    for (const url of urls) {
        for (const user of users) {
            try {
                const response = await axios.post(url, user, { headers });
                console.log(`Usuario registrado en ${url}:`, response.data);
            } catch (error) {
                console.error(`Error registrando usuario en ${url}:`, error.response?.data || error.message);
            }
        }
    }
}

registerUsers();