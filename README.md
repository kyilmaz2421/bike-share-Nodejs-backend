# Bike Sharing Application

I built the Bike sharing application backend using a Node.js Express server with a MongoDB database using Mongoose to interact with the database.

Following the specs provided the backend service has the ability to CREATE/POST and DELETE both Bikes and Share Locations. Users can GET all Share Locations or select a specific one by id. Users can also GET all the bikes from a specific share Location. Finally Users can ADD and REMOVE bikes from a share location using a PATCH request. I incorporated error handling into the requests as well to ensure bad requests dont corrupt the database.

I tested all the API's using POSTMAN.

# How to run environment locally

1. Run `npm install`

2. a `config/dev.env` should already exist and you can change the `PORT` or `MONGODB_URL` values as needed to run the program otherwise add this director/file and set the ENV variables

3. Run `npm run dev` for dev environment
