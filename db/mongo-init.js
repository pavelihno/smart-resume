db.createUser(
    {
        user: `${process.env.MONGO_INITDB_ROOT_USERNAME}`,
        pwd: `${process.env.MONGO_INITDB_ROOT_PASSWORD}`,
        roles: [
            {
                role: "dbAdmin",
                db: `${process.env.MONGO_INITDB_DATABASE}`
            },
            {
                role: "readWrite",
                db: `${process.env.MONGO_INITDB_DATABASE}`
            }
        ]
    }
);