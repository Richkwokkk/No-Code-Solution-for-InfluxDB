# Guide line
## Postman testing
### Setup
- Step 1: In your terminal, cd to our project. Than, run up_compose.sh to navigate to InfluxDB server
    ```bash
    sh cli/up_compose.sh
    ```
- Step 2: Setup environment variables in influxdb terminal.  
        To your dockerdesktop(is running) -> influxdb-dev-2.7 -> Exec
    ```bash
    export ORG="ATSYS"
    export USERNAME="dev1"
    ```
- Step 3: Create the operator token
    ```bash
    influx auth create \
        --org ${ORG}  \
        --operator
    ```
    It will generate an admin operator 'Token'

### To your Postman Desktop -> InfluxDB server
#### 'Signup'

- step 1: In 'Header', replace <span style="color:red">${OPERATOR_TOKEN}</span> with the operator Token you just created
    ```
    Authorization: Token ${OPERATOR_TOKEN}
    Content-Type: application/json
    ```
- step 2: In 'Body', make sure to select 'Raw'. Then, replace <span style="color:red">${USERNAME}</span> with the username, ex: <span style="color:red">dev1</span> 
    ```
    {
        "name": ${USERNAME},
        "status": "active"
    }
    ```
- Step 3: Click 'Send' to generate. You will see the Body Output:
    ```
    {
        "links": {
            "self": "/api/v2/users/0d95cbb545ada000"
        },
        "id": "0d95cbb545ada000",
        "name": "dev1",
        "status": "active"
    }
    ```
- Step 4: If you see 'Conflict' error, it means you have already created the user. You can change the username for example: <span style="color:red">dev2</span> 

- Step 5: Generate the 'authorisation token' (For the access permission authorisation for a user).<br>
    To your dockerdesktop -> influxdb-dev-2.7 -> Exec
    ```bash
    influx auth create       \
      --org ${ORG}         \
      --user ${USERNAME}    \
      --read-authorizations  \
      --write-authorizations \
      --read-buckets         \
      --write-buckets        \
      --read-dashboards      \
      --write-dashboards     \
      --read-tasks           \
      --write-tasks          \
      --read-telegrafs       \
      --write-telegrafs      \
      --read-users           \
      --write-users
    ```
    It will generate an 'authorisation Token'


#### 'Authorize'
- To Header<br>
    - To postman, in influxDB -> GET Authorize -> Header, replace <span style="color:red">${AUTHORISATION_TOKEN}</span> with the 'authorisation Token' you just created
    ```
    Authorization: Token ${AUTHORISATION_TOKEN}
    Content-Type: application/json
    ```
- To Body<br>
    ```
    {
        "description": "read buckets",
        "orgID": "ebc122dc7647a098",
        "userID": "0d95cbb545ada000",
        "status": "active",
        "permissions": [
        {
            "action": "read",
            "resource": {
            "type": "buckets"
            }
        }
        ]
    }
    ```
    - To dockerdesktop -> influxdb-dev-2.7 -> Exec
    ```bash
    influx org ls
    ```
    - copy the value of orgID
    - back to postman, in influxDB -> GET Authorize -> Body, replace the <span style="color:red">value</span> of orgID
    - to POST Signup -> Body -> copy the value of userID
    - to GET Authorize -> Body, replace the <span style="color:red">value</span> of userID

    - click 'Send' to see the output

#### 'Create password'
- Header
    - replace <span style="color:red">${AUTHORISATION_TOKEN}</span> with the 'authorisation Token' you just created
    ```
    Authorization: Token ${AUTHORISATION_TOKEN}
    Content-Type: application/json
    ```
    - Body
    ```
    {
    "password": "developer@123influx"
    }
    ```
    - POST address: https://localhost:8086/api/v2/users/0d95cbb545ada000/password, replace <span style="color:red">0d95cbb545ada000</span> with the userID
    - click 'Send' to see the Output with message '204 No Content' means successfully processed the request, but is not returning any content:
    ```
    204 No Content
    ```

#### Login
- login with username and password in to influxDB
    ```
    For example:
    Username dev2
    Password developer@123influx
    ```
    - Output
    ```
    204 No Content
    ```

#### InfluxDB server vitualize:
- In dockerdesktop -> influxdb-dev-2.7 -> click 8086:8086 to open the InfluxDB server(http://localhost:8086/signin)
- login with username and password in to influxDB:
    ```
    For example:
    Username dev2
    Password developer@123influx
    ```
- If you see the return message <span style="color:gray">'You don't belong to any organization. Add a user to an organization to continue'</span>, you have to add the user(dev2) to the organization.
- In dockerdesktop -> influxdb-dev-2.7 -> Exec
    ```bash
    influx user list
    ```
    You will see the users list belong to the organization.
- Add a user to the organization:
    ```bash
    influx org mamber add -n "ATSYS" -m userID # copy the userID from the list
    ```

### Now you can test the API in Postman
#### Login
- Body
    ```
        username: ${USERNAME} #for example: dev2
        password: ${PASSWORD} #for example: developer@123influx
    ```
- click 'Send'to see the output:
    ```
    {
        "message": "Sign-in successful",
        "cookie": ${COOKIE_VALUE} # this cookie uis used for the frontend
    }
    ```
    It meanss you have successfully login to the influxDB.