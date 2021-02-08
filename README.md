Shoushiling-API endpoints:

- /users

        Get request: respond the users list

- /users/:name

        Get request: respond the user associated by requested name

- /login

        post request: authenticate user

- /register

        post request: check if name is already taken, then check if email is already registered, then create user.

- /updatePassword

        put request: update password associated with requested email

- /updateName

        put request: update name associated with requested email

- /deleteUser

        delete request: delete user associated with requested email
