const { ApolloServer, userInputError, gql, AuthenticationError } = require('apollo-server')
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

/* Old local DB stuff */
//let authors = [
//  {
//    name: 'Robert Martin',
//    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//    born: 1952,
//  },
//  {
//    name: 'Martin Fowler',
//    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//    born: 1963
//  },
//  {
//    name: 'Fyodor Dostoevsky',
//    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//    born: 1821
//  },
//  {
//    name: 'Joshua Kerievsky', // birthyear not known
//    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//  },
//  {
//    name: 'Sandi Metz', // birthyear not known
//    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//  },
//]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

//let books = [
//  {
//    title: 'Clean Code',
//    published: 2008,
//    author: 'Robert Martin',
//    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//    genres: ['refactoring']
//  },
//  {
//    title: 'Agile software development',
//    published: 2002,
//    author: 'Robert Martin',
//    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//    genres: ['agile', 'patterns', 'design']
//  },
//  {
//    title: 'Refactoring, edition 2',
//    published: 2018,
//    author: 'Martin Fowler',
//    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//    genres: ['refactoring']
//  },
//  {
//    title: 'Refactoring to patterns',
//    published: 2008,
//    author: 'Joshua Kerievsky',
//    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//    genres: ['refactoring', 'patterns']
//  },
//  {
//    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//    published: 2012,
//    author: 'Sandi Metz',
//    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//    genres: ['refactoring', 'design']
//  },
//  {
//    title: 'Crime and punishment',
//    published: 1866,
//    author: 'Fyodor Dostoevsky',
//    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//    genres: ['classic', 'crime']
//  },
//  {
//    title: 'The Demon ',
//    published: 1872,
//    author: 'Fyodor Dostoevsky',
//    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//    genres: ['classic', 'revolution']
//  },
//]



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
      
      return Book.find({});
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
      const user = User.findOne({ username: args.username });

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
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    }

    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})