# CRUD API

## Installing

Clone this repo to your local machine. Checkout to dev branch. Then run from project root:

```bash
  npm install
```

## Running

Add .env file to the root with ```PORT``` value. Example: ```PORT=4000```

To run app in development mode use:

```bash
  npm run start:dev
```

To run app in production mode use:

```bash
  npm run start:prod
```

To run app in multi mode use:

```bash
  npm run start:multi
```

## Testing

To run tests use:

```bash
  npm run test
```

## API

Supported requests:

- ```GET api/users``` - get all users
  - Success response:

      _200 Ok_

      ```typescript
      [
        {
          id: string;
          username: string;
          age: number;
          hobbies: string[];
        }
      ]
      ```

- ```GET api/users/:id``` - get user by id
  - Params:

    - id (required) - string in uuid format.

  - Success response:
    _200 Ok_

    ```typescript
    {
      id: string;
      username: string;
      age: number;
      hobbies: string[];
    }
    ```

  - Error responses:

    _400 Bad Request_ - User id is invalid (not uuid)

    _404 Not Found_ - User not found

- ```POST api/users``` - create user
  - Body:

    ```typescript
    {
      username: string;
      age: number;
      hobbies: string[];
    }
    ```

  - Success response:
    _201 Created_

    ```typescript
    {
      id: string;
      username: string;
      age: number;
      hobbies: string[];
    }
    ```

  - Error responses:

    _400 Bad Request_ - Validation failed (Message example: Username had to be a string)

- ```PUT api/users/:id``` - update user
  - Params:

    - id (required) - string in uuid format.

  - Body:

    ```typescript
    {
      username: string;
      age: number;
      hobbies: string[];
    }
    ```

  - Success response:
    _200 Ok_

    ```typescript
    {
      id: string;
      username: string;
      age: number;
      hobbies: string[];
    }
    ```

  - Error responses:

    _400 Bad Request_ - Validation failed (Message example: Username had to be a string)

    _404 Not Found_ - User not found

- ```DELETE api/users/:id``` - delete user
  - Params:

    - id (required) - string in uuid format.

  - Success response:

    _204 No Content_

  - Error responses:

    _400 Bad Request_ - Validation failed (Message example: Username had to be a string)

    _404 Not Found_ - User not found

## Commom error responses

  _404 Not Found_ - Resource you requested does not exist

  _500 Internal Server Error_ - Internal Server Error
