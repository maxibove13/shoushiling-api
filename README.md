# Shoushiling API

## Environmental variables

Create `config.env` file with the environmental variables as shown below:

```
PORT_LOCAL = <local_port_of_preference>
DB_USER    = max
DB_PASS    = <db_password>
DB_HOST    = shoushiling-cluster
DB_NAME    = shoushiling-db
JWT_KEY    = <jwt_key>

```

## Firsts steps

```bash
# Install dependencies
npm i

# Install nodemon globally
npm i -g nodemon

# Insert data in MongoDB (where n is an integer)
npm run seed n

# Run API locally
npm run dev
```

## Endpoints:

```bash
# /users
GET: respond the users list

# /users/:name
GET: respond the user associated with requested name

# /login
POST: authenticate user and assign a JWT token

# /register
POST: check if name is already taken, then check if email is already registered, then create user.

# /updatePassword
PUT: check if user has JWT token, then update password associated with requested email.

# /updateName
PUT: check if user has JWT token, then update name associated with requested email.

# /deleteUser
PUT: check if user has JWT token, then delete user associated with requested email.
```

## Tips

### Create secure JWT_KEY

```bash
# open node in terminal
node

# Generate random hex string
require('crypto).randomBytes.toString('hex')
```

### Pass argument values to node

```bash
# In you script read the argument value pass in command line (this example is done for numbers)
const argv = process.argv.slice(2)[0]

# Pass the argument value when you run the script
npm run myScript.js <anyNumber>
```
