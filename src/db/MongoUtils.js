/* eslint-disable no-undef */
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbTaskMate = "taskMate";
const clientCollection = "client";
const noteCollection = "note";

function MongoUtils() {
    const mu = {};
    var url = process.env.MONGODB_URI ?
        process.env.MONGODB_URI :
        "mongodb://localhost/task-mate";
    mu.connect = () => {
        const client = new MongoClient(url, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;
        return client.connect();
    };

    mu.getUsers = (query) =>
        mu.connect().then((client) => {
            const clientCol = client.db(dbTaskMate).collection(clientCollection);
            return clientCol
                .find(query)
                .limit(20)
                .sort({ timestamp: -1 })
                .toArray()
                .finally(() => client.close());
        });

    mu.createUser = (user) =>
        mu.connect().then((client) => {
            const clientCol = client.db(dbTaskMate).collection(clientCollection);

            return clientCol.insertOne(user).finally(() => client.close());
        });

    mu.deleteUser = (id) =>
        mu.connect().then((client) => {
            const userCol = client.db(dbTaskMate).collection(clientCollection);

            return userCol
                .deleteOne({ _id: new ObjectID(id) })
                .finally(() => client.close());
        });

    mu.getNotes = (query) =>
        mu.connect().then((client) => {
            const noteCol = client.db(dbTaskMate).collection(noteCollection);
            return noteCol
                .find(query)
                .limit(20)
                .sort({ timestamp: -1 })
                .toArray()
                .finally(() => client.close());
        });

    mu.createNote = (note) =>
        mu.connect().then((client) => {
            const noteCol = client.db(dbTaskMate).collection(noteCollection);

            return noteCol.insertOne(note).finally(() => client.close());
        });

    mu.getNote = (id) =>
        mu.connect().then((client) => {
            const noteCol = client.db(dbTaskMate).collection(noteCollection);

            return noteCol
                .findOne({ _id: new ObjectID(id) })
                .finally(() => client.close());
        });

    mu.updateNote = (id, note) =>
        mu.connect().then((client) => {
            const noteCol = client.db(dbTaskMate).collection(noteCollection);

            return noteCol
                .updateOne({ _id: new ObjectID(id) }, {
                    $set: {
                        title: note.title,
                        content: note.content,
                        autor: note.autor,
                        date: note.date,
                    },
                }, { upsert: false })
                .finally(() => client.close());
        });

    mu.deleteNote = (id) =>
        mu.connect().then((client) => {
            const noteCol = client.db(dbTaskMate).collection(noteCollection);

            return noteCol
                .deleteOne({ _id: new ObjectID(id) })
                .finally(() => client.close());
        });

    return mu;
}

module.exports = MongoUtils();