const {MongoClient} = require('mongodb');

const url = "mongodb://localhost:27017"; //change url based on your mongo compass server url
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected to mongo db");
        
        const db = client.db("demodb"); //create or select database named demodb
        const posts = db.collection("posts"); // create a collection named posts

        //list of posts to be inserted
        const newPosts = [
            {
              title: "Post Title 2",
              body: "Body of post.",
              category: "Event",
              likes: 2,
              tags: ["news", "events"],
              date: new Date()
            },
            {
              title: "Post Title 3",
              body: "Body of post.",
              category: "Technology",
              likes: 3,
              tags: ["news", "events"],
              date: new Date()
            },
            {
              title: "Post Title 4",
              body: "Body of post.",
              category: "Event",
              likes: 4,
              tags: ["news", "events"],
              date: new Date()
            }
          ];

            //insert all posts using insert many
            const result = await posts.insertMany(newPosts);
            console.log(`${result.insertedCount} posts inserted.`);
            console.log("Inserted IDs:", result.insertedIds);

            const post = [{
                title: "Post Title 5",
                body: "Body of post.",
                category: "Event",
                likes: 5,
                tags: ["news", "events"],
                date: new Date()
              },
              {
                title: "Post Title 6",
                body: "Body of post.",
                category: "Event",
                likes: 6,
                tags: ["news", "events"],
                date: new Date()
              }
            ]
              
              const r = await posts.insertMany(post);
              console.log("2 post inserted with id:", r.insertedId);
              console.log(`${r.insertedCount} posts inserted.`);
              console.log("Inserted IDs:", r.insertedIds);
  
                const allPosts = await posts.find({}).toArray();
                console.log("All posts in collection:");
                allPosts.forEach(p => console.log(p.title));


            
        } catch (err) {
            console.error("Error:", err);
          } finally {
            await client.close();
            console.log("Connection closed");
          }

}

run().catch(console.dir);

/*
vitcse@vitcse-OptiPlex-3090:~/Desktop/dbms$ node newdb.js
Connected to mongo db
3 posts inserted.
Inserted IDs: {
  '0': new ObjectId('68a9935067d7dbd4446dda2d'),
  '1': new ObjectId('68a9935067d7dbd4446dda2e'),
  '2': new ObjectId('68a9935067d7dbd4446dda2f')
}
2 post inserted with id: undefined
2 posts inserted.
Inserted IDs: {
  '0': new ObjectId('68a9935067d7dbd4446dda30'),
  '1': new ObjectId('68a9935067d7dbd4446dda31')
}
All posts in collection:
Post Title 2
Post Title 3
Post Title 4
Post Title 5
Post Title 6
Post Title 2
Post Title 3
Post Title 4
Post Title 5
Post Title 6
Connection closed

*/













