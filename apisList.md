# API List For the Project Backend

## Auth APIs
- POST/signup
- POST/login
- POST/logout

## Profile APIs
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

## Connection Request APIs
- POST/request/send/accept/:requestId
- POST/request/send/reject/:requestId
- POST/request/review/accept/:requestId
- POST/request/review/reject/:requestId

## User APIs
- GET/user/feed
- GET/user/connections
- GET/user/requests