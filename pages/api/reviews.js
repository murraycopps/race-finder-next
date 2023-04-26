//posts.js

import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("reviews");

  const bodyObject = typeof req.body === "string" && req.body ? JSON.parse(req.body) : req.body;

  console.log(req.method, bodyObject);

  switch (req.method) {
    case "POST":
      const results = await db.collection("reviews").insertOne(bodyObject);
      res.json({ status: 200, data: results });
      break;
    case "GET":
      console.log("get");
      const allPosts = await db.collection("reviews").find({}).toArray();
      console.log(allPosts);
      res.json({ status: 200, data: allPosts });
      break;
    case "DELETE":
      await db.collection("reviews").deleteOne({ "_id": new ObjectId(bodyObject._id) });
      res.json({ status: 200, data: "deleted" });
      break;
    case "PUT":
      const { _id, ...rest } = bodyObject;
      await db.collection("reviews").updateOne({ "_id": new ObjectId(_id) }, { $set: { ...rest } });
      const updated = await db.collection("reviews").find({ "_id": new ObjectId(_id) }).toArray()
      res.json({ status: 200, data: updated});
      break;
    default:
      res.status(405).json({ status: 405, data: "Method not allowed" });
  }
}
