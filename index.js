import express from 'express';
import {StatusCodes} from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;

let users = [
    {id:1, nome: 'ozimar lira', idade: '48'},
    {id:2, nome: 'monica serra', idade: '47'},
    {id:3, nome: 'haidyne lira', idade: '24'},
    {id:4, nome: 'arthur lira', idade: '17'},
];

app.use(express.json());

app.listen(PORT, () => {
     console.log(`Servidor Rodando em http://localhost:${PORT}`);
});

app.get('/',(request, response) => {return response.send('<h1>Trabalhando com servido express</h1>');
});

app.get('/users',(request, response) => {return response.send(users);
});

app.get('/users/:userId',(request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {return (user.id ===Number(userId))});

    return response.send(user);
});

app.post('/users',(request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId',(request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
            
        }
        return user;

    });
    
    return response.send(updatedUser);
});

app.delete('/users/:userId',(request, response) => {
    const userId = request.params.userId;

    users = users.filter((user)=> user.id != Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});