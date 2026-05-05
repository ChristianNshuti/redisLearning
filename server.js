import express from "express";
import client from "./redisClient.js";
import { getUsersFromDB } from "./data.js";

const app = express();
const PORT = 3000;

app.get("/users",async(req,res) => {
    try {
        const cachedData = await client.get("users");

        if(cachedData) {
            console.log("Serving from Redis");
            return res.json(JSON.parse(cachedData));
        }

        const users = await getUsersFromDB();

        await client.set("users", JSON.stringify(users), {
            EX:30
        });

        console.log("Serving from DB");
        res.json(users);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

app.get("/limited",async(req,res) => {
    const ip = req.ip;

    const requests = await client.incr(ip);

    if(requests === 1) {
        await client.expire(ip,10);
    }

    if(requests > 5) {
        return res.status(429).json({
            message:"Too many requests. Try again later."
        });
    }

    res.json({
        message:"You can access this route",
        requests
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

