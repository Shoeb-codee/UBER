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
      "msg": "Invalid origin address",
      "param": "origin",
      "location": "query"
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
```
## 2. Login Captain
### Endpoint
```
POST /captains/login
```

### Request Body
| Field    | Type   | Required | Validation Rules         |
|----------|--------|----------|-------------------------|
| email    | string | Yes      | Valid email format      |
| password | string | Yes      | Minimum 6 characters    |

### Response
```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "inactive|active",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

## Get Captain Profile

Retrieves the profile information of the authenticated captain.

### Endpoint
```
GET /captains/profile
```

### Authentication
Requires a valid JWT token in one of:
- Cookie named 'token'
- Authorization header: `Bearer <token>`

### Response Body
#### Success Response (200)
| Field          | Type   | Description                               |
|----------------|--------|-------------------------------------------|
| _id           | string | Unique identifier for the captain         |
| fullname      | object | Contains firstname and lastname           |
| email         | string | Captain's email address                   |
| vehicle       | object | Vehicle details                           |
| status        | string | Account status                            |

### Status Codes
| Status Code | Description                                |
|-------------|--------------------------------------------|
| 200         | Success                                    |
| 401         | Unauthorized - Invalid or missing token    |

## Logout Captain

Logs out the current captain by invalidating their JWT token.

### Endpoint
```
GET /captains/logout
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

## Get Coordinates

Retrieves the coordinates (latitude and longitude) for a given address.

### Endpoint
```
GET /coordinates
```

### Request Parameters
| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| address   | string | Yes      | The address to geocode     |

### Response Body
#### Success Response (200)
| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| latitude  | number  | Latitude of the address    |
| longitude | number  | Longitude of the address   |

### Status Codes
| Status Code | Description                                |
|-------------|--------------------------------------------|
| 200         | Success                                    |
| 400         | Bad Request - Invalid address              |
| 500         | Internal Server Error                      |

### Example Request
```json
{
  "address": "1600 Amphitheatre Parkway, Mountain View, CA"
}
```

### Example Response
Success (200):
```json
{
  "latitude": 37.4224764,
  "longitude": -122.0842499
}
```

Error (400):
```json
{
  "error": "Invalid address"
}
```

## Get Distance and Time

Retrieves the distance and estimated travel time between two locations.

### Endpoint
```
GET /maps/get-distance-time
```

### Request Body
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St"
}
```

### Example Response
Success (200):
```json
{
  "distance": {
    "value": 5000,
    "text": "5 km"
  },
  "duration": {
    "value": 600,
    "text": "10 mins"
  }
}
```

Error (400):
```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

## Get Suggestions

Retrieves suggestions for a given query.

### Endpoint
```
GET /maps/get-suggestions
```

### Request Body
```json
{
  "input": "123 Main"
}
```

### Example Response
Success (200):
```json
[
  "123 Main St, San Francisco, CA",
  "123 Main St, Los Angeles, CA"
]
```

Error (400):
```json
{
  "errors": [
    {
      "msg": "Invalid input",
      "param": "input",
      "location": "query"
    }
  ]
}
```

## Create Ride

Creates a new ride request.

### Endpoint
```
POST /rides/create
```

### Request Body
| Field        | Type   | Required | Validation Rules         |
|--------------|--------|----------|--------------------------|
| origin       | string | Yes      | Valid address format     |
| destination  | string | Yes      | Valid address format     |
| passengerId  | string | Yes      | Valid passenger ID       |
| captainId    | string | Yes      | Valid captain ID         |

### Response Body
#### Success Response (201)
| Field        | Type   | Description                               |
|--------------|--------|-------------------------------------------|
| rideId       | string | Unique identifier for the ride            |
| origin       | string | Origin address                            |
| destination  | string | Destination address                       |
| passengerId  | string | Unique identifier for the passenger       |
| captainId    | string | Unique identifier for the captain         |
| status       | string | Ride status (e.g., 'requested', 'ongoing')|

### Status Codes
| Status Code | Description                                |
|-------------|--------------------------------------------|
| 201         | Ride successfully created                  |
| 400         | Validation errors                          |
| 500         | Internal Server Error                      |

### Example Request
```json
{
  "origin": "123 Main St",
  "destination": "456 Elm St",
  "passengerId": "passenger_id_here",
  "captainId": "captain_id_here"
}
```

### Example Response
Success (201):
```json
{
  "rideId": "ride_id_here",
  "origin": "123 Main St",
  "destination": "456 Elm St",
  "passengerId": "passenger_id_here",
  "captainId": "captain_id_here",
  "status": "requested"
}
```

Error (400):
```json
{
  "errors": [
    {
      "msg": "Invalid origin address",
      "param": "origin",
      "location": "body"
    }
  ]
}
```

## Get Fare

Retrieves the fare estimate for a ride.

### Endpoint
```
GET /rides/get-fare
```

### Response Body
```json
{
  "Auto": 50,
  "car": 75,
  "moto": 40
}
```

