const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const config = require('./utils/config');
const JWT_SECRET = 'sekret'

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

// Connection stuff
console.log('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI_W_PWORD)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  })

// GQL stuff
const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    id: ID!
  }

  type Token{
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  input AuthorIn {
    name: String!
    born: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: AuthorIn!
      published: Int!
      genres: [String!]!
    ): Book,

    editAuthor(
      name: String!
      born: Int!
    ): Author,

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author) {
        const author = await Author.findOne({ name: args.author.toLowerCase() });
        if (!author) {
          return null;
        }
        if (args.genre) {
          return await Book.find({ author: author.id, genres: { $in: [args.genre] } }).populate('author');
        }
        return await Book.find({ author: author.id }).populate('author');
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author');
      }
      
      return Book.find({}).populate('author');
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },


  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      const books = await Book.find({ author: author.id });
      return books.length;
    }
  },


  Mutation: {
    addBook: async (root, args, context) => {
      console.log('addBook', args);

      if (!context.currentUser) {
        throw new AuthenticationError('Login to add a book');
      }

      let book = await Book.findOne({ title: args.title });
      if (book) {
        throw new UserInputError('Book with given title already exists', { invalidArgs: args.title });
      }

      let author = await Author.findOne({ name: args.author.name.toLowerCase() });
      if (!author) {
        const newAuthor = new Author({ ...args.author, name: args.author.name.toLowerCase() });
        try {
          author = await newAuthor.save()
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args.author });
        }
      }

      book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      return book;
    },

    editAuthor: async (root, args, context) => {
      console.log('editAuthor', args);

      if (!context.currentUser) {
        throw new AuthenticationError('Login to edit authors');
      }

      const author = await Author.findOne({ name: args.name.toLowerCase() });
      if (!author) {
        return null;
      }

      author.born = args.born;
      return author.save();
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      try {
        return await user.save();
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong username or password');
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    let decodedToken = null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    }

    const currentUser = decodedToken ? await User.findById(decodedToken.id) : null;
    return { currentUser };
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})