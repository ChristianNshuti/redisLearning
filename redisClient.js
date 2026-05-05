import { createClient } from "redis";

const client = createClient({
    url: "redis://127.0.0.1:6379"
})

client.on("error",(err) => console.log("Redis Error:",err));

await client.connect();

console.log("Redis connected");

export default client;