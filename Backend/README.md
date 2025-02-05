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
  ",
      "param": "email"
    }
  ]
}
```

## Login User

Authenticates an existing ususerreturns a JWT token.

### Endpoint

## Get User Profile

Retrieves the profile information of the authenticated user.

### Endpouser`
POST / Authorization header: `Bearer <token>`

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
```
POST /users/logout
```
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

# Captain API Documentation 

## Register Captain

Creates a new captain account with vehicle details.

### Endpoint
### Request Body

| Field                | Type   | Required | Validation Rules                    |
|---------------------|---------|----------|-------------------------------------|
| fullname.firstname  | string  | Yes      | Minimum 3 characters                |
| fullname.lastname   | string  | No       | Minimum 3 characters if provided    |
| email              | string  | Yes      | Valid email format                  |
| password           | string  | Yes      | Minimum 6 characters                |
| vehicle.color      | string  | Yes      | Minimum 3 characters                |
| vehicle.plate      | string  | Yes      | Minimum 3 characters                |
| vehicle.capacity   | number  | Yes      | Minimum value of 1                  |
| vehicle.vehicleType| string  | Yes      | Must be: 'car', 'motorcycle', 'Auto'|

### Response Body
#### Success Response (201)
| Field             | Type   | Description                               |
|-------------------|--------|-------------------------------------------|
| token             | string | JWT authentication token                  |
| captain._id       | string | Unique identifier for the captain        |
| captain.fullname  | object | Contains firstname and lastname          |
| captain.email     | string | Captain's email address                  |
| captain.vehicle   | object | Vehicle details                          |
| captain.status    | string | Account status (default: 'inactive')     |

### Validation Rules
- Email must be valid format and unique
- First name must be at least 3 characters
- Password must be at least 6 characters
- Vehicle color must be at least 3 characters
- Vehicle plate must be at least 3 characters
- Vehicle capacity must be 1 or greater
- Vehicle type must be one of: car, motorcycle, Auto

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Driver"
  },
  "email": "john.driver@example.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
### Example Response
```json
{
  "token": "jwt_token_here",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "_id": "captain_id_here"
  }
}