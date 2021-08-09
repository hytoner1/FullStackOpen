const express = require('express');

const app = express();
app.use(express.json());

const morgan = require('morgan');
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

const cors = require('cors')
app.use(cors());

let persons =
  [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ];

// #region GETTERS

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  let res = 'Phonebook has info for ' + persons.length + ' people';
  res += '<p> ' + Date(Date.now()).toString() + '<p>';
  response.send(res);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

// #endregion GETTERS

app.delete('/api/persons/:id', (request, response) => {
  console.log('delete: ', request.params.id);

  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

app.post('/api/persons', (request, response) => {
  const person = request.body;

  if (!person.name) {
    return response.status(400).json({
      error: 'Content name missing'
    });
  }
  if (!person.number) {
    return response.status(400).json({
      error: 'Content number missing'
    });
  }
  if (persons.map(person => person.name).includes(person.name)) {
    return response.status(409).json({
      error: 'Conflict: Name must be unique'
    });
  }
  
  person.id = Math.floor(Math.random() * 1e6);
  console.log('New person: ', person);

  persons = persons.concat(person);
  console.log('Persons: ', persons);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
