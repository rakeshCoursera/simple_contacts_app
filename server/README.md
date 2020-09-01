# Simple Google Contacts APIs
Simple Contact app using Google People API.

## Requirements
1. Install a local MongoDB server or use vandor provided MongoDB instance.
2. Create client secret and client Id while setting up OAuth2.0 Client for authentication.
3. Enable Google People APIs for your project. More info [here](https://developers.google.com/people).
4. Add your configuration in `config/config.js` file in the `server` directory.

## Project Setup 
1. Clone the project repository from github
```
git clone https://github.com/rakeshCoursera/simple_contacts_app
```
2. Go to the project folder
```
cd simple_contacts_app/server
```
3. Run npm install to install all dependencies
```
npm install
```
4. Now run npm start
```
npm start
```
This will run the project while showing `Listening: http://localhost:3000` on the console.

### For Development with Nodemon

```
npm run dev
```

# How to get the Authorization Token
After setting up the application run it then go to `http://localhost:3000/auth/google` in Browser and copy the query string `token` value. That is our authorization token to do authentication with all the APIs of this project.

# APIs 
## Contacts APIs
### /api/v1/contact/
* *Description*: API for listing contacts/connections
* *Method*: GET
* *Authorization*: Bearer <auth_token> 
* *Responses*: 
    * [200-Ok]
    ```
    {
    "data": {
        "connections": [
            {
                "resourceName": "people/<accountId>",
                "etag": "etag of account",
                "names": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id"
                            }
                        },
                        "displayName": "firstname lastname",
                        "familyName": "lastname",
                        "givenName": "firstname",
                        "displayNameLastFirst": "lastname, firstname",
                        "unstructuredName": "firstname lastname"
                    }
                ],
                "photos": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id"
                            }
                        },
                        "url": "image url of contact",
                        "default": true
                    }
                ],
                "phoneNumbers": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id"
                            }
                        },
                        "value": "phone number value",
                        "canonicalForm": "phone number with std code",
                        "type": "mobile",
                        "formattedType": "Mobile"
                    }
                ]
            },
            {
                "resourceName": "people/<account id>",
                "etag": "etag of account",
                "names": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "displayName": "firstname middlename lastname",
                        "familyName": "lastname",
                        "givenName": "firstname",
                        "middleName": "middlename",
                        "displayNameLastFirst": "lastname, firstname middlename",
                        "unstructuredName": "firstname middlename lastname"
                    }
                ],
                "photos": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "url":  "image url of contact",
                        "default": true
                    }
                ],
                "phoneNumbers": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "value": "phone number value",
                        "canonicalForm": "phone number with std code",
                        "type": "mobile",
                        "formattedType": "Mobile"
                    }
                ]
            },
        ],
        "nextPageToken": "<token to access next page>",
        "totalPeople": 'total contacts',
        "totalItems": 'total contacts'
    }
}
    ```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

### /api/v1/contact/<account_id>
* *Description*: API for fetching details of a contact/connection
* *Method*: GET
* *Authorization*: Bearer <auth_token> 
* *Responses*: 
    * [200-Ok]
    ```
    {
        "contact":
            {
                "resourceName": "people/<account id>",
                "etag": "etag of account",
                "names": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "displayName": "firstname middlename lastname",
                        "familyName": "lastname",
                        "givenName": "firstname",
                        "middleName": "middlename",
                        "displayNameLastFirst": "lastname, firstname middlename",
                        "unstructuredName": "firstname middlename lastname"
                    }
                ],
                "photos": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "url":  "image url of contact",
                        "default": true
                    }
                ],
                "phoneNumbers": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "value": "phone number value",
                        "canonicalForm": "phone number with std code",
                        "type": "mobile",
                        "formattedType": "Mobile"
                    }
                ]
            },
    }
	```
	* [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```


### /api/v1/contact/
 *Description*: API for creating a contact/connection
* *Method*: POST
* *Authorization*: Bearer <auth_token> 
* *Body(application/JSON)*: 
   ```
    {
        "firstName": "rock",
        "middleName": "the",
        "lastName": "raku",
        "email": "12345@gmail.com",
        "mobile": "1234567890",
        "mobileType": "work"
    }
   ```
* *Responses*: 
    * [200-Ok]
    ```
    {
        "contact":
            {
                "resourceName": "people/<account id>",
                "etag": "etag of account",
                "names": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "displayName": "firstname middlename lastname",
                        "familyName": "lastname",
                        "givenName": "firstname",
                        "middleName": "middlename",
                        "displayNameLastFirst": "lastname, firstname middlename",
                        "unstructuredName": "firstname middlename lastname"
                    }
                ],
                "photos": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "url":  "image url of contact",
                        "default": true
                    }
                ],
                "phoneNumbers": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "value": "phone number value",
                        "canonicalForm": "phone number with std code",
                        "type": "mobile",
                        "formattedType": "Mobile"
                    }
                ]
            },
    }
	```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

### /api/v1/contact/
* *Description*: API for updating a contact/connection
* *Method*: PATCH
* *Authorization*: Bearer <auth_token> 
* *Body(application/JSON)*: 
   ```
    {
        "firstName": "rock",
        "middleName": "the",
        "lastName": "raku",
        "email": "12345@gmail.com",
        "mobile": "1234567890",
        "mobileType": "work",
        "etag": "etag of contact",
        "photo": "base64 encoded image string"
    }
   ```
* *Responses*: 
    * [200-Ok]
    ```
    {
        "contact":
            {
                "resourceName": "people/<account id>",
                "etag": "etag of account",
                "names": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "displayName": "firstname middlename lastname",
                        "familyName": "lastname",
                        "givenName": "firstname",
                        "middleName": "middlename",
                        "displayNameLastFirst": "lastname, firstname middlename",
                        "unstructuredName": "firstname middlename lastname"
                    }
                ],
                "photos": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "url":  "image url of contact",
                        "default": true
                    }
                ],
                "phoneNumbers": [
                    {
                        "metadata": {
                            "primary": true,
                            "source": {
                                "type": "CONTACT",
                                "id": "metadata id1"
                            }
                        },
                        "value": "phone number value",
                        "canonicalForm": "phone number with std code",
                        "type": "mobile",
                        "formattedType": "Mobile"
                    }
                ]
            },
    }
	```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

### /api/v1/contact/<account_id>
* *Description*: API for deleting a contact/connection 
* *Method*: DELETE
* *Authorization*: Bearer <auth_token>  
* *Responses*: 
    * [200-Ok]
    ```
    {
        "response": {
            "message": "contact deleted successfully"
        }
    }
	```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

## Future Scope
1. Write unit test cases to validate/testing of the modules.
1. Implement [Swagger UI](https://swagger.io/tools/swagger-ui/) for better visualization and interaction with the API’s.
2. In memory cache layering with Redis for increased throughput and lower latency.
