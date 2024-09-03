# Guide line
## Postman
### Setup
- Step 1: Navigate to InfluxDB server
- Step 2: Setup environment variables
```bash
export ORG="ATSYS"
export USERNAME="dev1"
```
- Step 3: Create operator token
```bash
influx auth create \
    --org ${ORG}  \
    --operator
```
- Step 4: Create authorisation token
```bash
# Using signup API before do it
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
### Postman InfluxDB
#### Signup
- Header
```
Authorization: Token ${OPERATOR_TOKEN}
Content-Type: application/json
```
- Body
```
{
    "name": ${USERNAME},
    "status": "active"
}
```
- Output
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
#### Authorize
- Header
```
Authorization: Token ${AUTHORISATION_TOKEN}
Content-Type: application/json
```
- Body
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
- Output
```
```
#### Create password
- Header
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
- Output
```
204 No Content
```
#### Login
- Authorisation
```
Basic Auth ${USERNAME}:${PASSWORD}
```
- Output
```
204 No Content
```
### Postman project
#### Login
- Body
```
    username: ${USERNAME}
    password: ${PASSWORD}
```
- Output
```
{
    "message": "Sign-in successful",
    "cookie": ${COOKIE_VALUE}
}
```