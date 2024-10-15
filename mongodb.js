const { MongoClient } = require('mongodb');

const dbConfig = {
    url: 'mongodb://localhost:27017',
    database: 'db'
};

const client = new MongoClient(dbConfig.url);

async function main() {
    try {
        await client.connect();
        console.log('Connected successfully');

        const db = client.db(dbConfig.database);
        const usersCollection = db.collection('users');

        const query0 = { id: 1, name: 'abdul', age: 19 };
        await usersCollection.insertOne(query0);
        console.log('Data inserted');

        const query1 = { id: 2, name: 'baasith', age: 18 };
        await usersCollection.insertOne(query1);
        console.log('Data inserted');

        const users = await usersCollection.find().toArray();
        console.log(users);

        const deleteResult = await usersCollection.deleteOne({ id: 2 });
        console.log(deleteResult);

	const update = await usersCollection.updateOne({ id: 1 }, { $set: { name: 'hello' } });
        console.log(update);
    } catch (err) {
        console.log('Error:', err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
