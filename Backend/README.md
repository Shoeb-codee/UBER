# User Registration API Documentation

## Register User

Creates a new user account in the system. This endpoint handles user registration with input validation, password hashing, and JWT token generation.

### Endpoint

```
POST /users/register
```

### Request Body

| Field             | Type   | Required | Validation Rules                    |
|-------------------|--------|----------|-------------------------------------|
| fullname.firstname| string | Yes      | Minimum 3 characters                |
| fullname.lastname | string | No       | Minimum 3 characters if provided    |
| email            | string | Yes      | Valid email format                  |
| password         | string | Yes      | Minimum 6 characters                |

### Response Body
#### Success Response (201)
| Field          | Type   | Description                               |
|----------------|--------|-------------------------------------------|
| token          | string | JWT authentication token                  |
| user._id       | string | Unique identifier for the user           |
| user.fullname  | object | Contains firstname and lastname          |
| user.email     | string | User's email address                     |
| user.socketId  | string | Socket connection ID (null by default)   |




### Validation Rules
- Email must be valid format
- First name must be at least 3 characters long
- Password must be at least 6 characters long
- Email must be unique in the system

### Status Codes

| Status Code | Description                                           |
|-------------|-------------------------------------------------------|
| 201         | User successfully created                             |
| 400         | Validation errors                                     |
| 500         | Internal Server Error                                 |

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepass123"
}
```

### Example Response

Success (201):
```json
{
  "token": "jwt_token_here",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "user_id_here"
  }
}
```

Error (400):
```json
{
  "errors": [
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname"
    },
    {
      "msg": "Invalid Email",
      "param": "email"
    }
  ]
}
```

## Login User

Authenticates an existing user and returns a JWT token.

### Endpoint

## Get User Profile

Retrieves the profile information of the authenticated user.

### Endpoint

### Authentication
Requires a valid JWT token in one of:
- Cookie named 'token'
- Authorization header: `Bearer <token>`

### Response Body
#### Success Response (200)
| Field          | Type   | Description                               |
|----------------|--------|-------------------------------------------|
| _id           | string | Unique identifier for the user            |
| fullname      | object | Contains firstname and lastname           |
| email         | string | User's email address                      |
| socketId      | string | Socket connection ID (if any)             |

### Status Codes
| Status Code | Description                                |
|-------------|--------------------------------------------|
| 200         | Success                                    |
| 401         | Unauthorized - Invalid or missing token    |

## Logout User

Logs out the current user by invalidating their JWT token.

### Endpoint

### Authentication
Requires a valid JWT token in one of:
- Cookie named 'token'
- Authorization header: `Bearer <token>`

### Response Body
#### Success Response (200)
```json
{
  "message": "logged out successfully"
}
```