/*
  ------------------------------------------------------------------
                          CODE NÀY ARCJET TẠO SẴN
  ------------------------------------------------------------------
*/

import arcjet, { shield, /*detectBot,*/ tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import express from "express";
import { ARCJET_KEY } from "./env.js";

const app = express();

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: ARCJET_KEY,
  characteristics: ["ip.src"], // Track requests by IP
  allowUserAgents: ["PostmanRuntime"],
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),

    // Lỗi đ fix được
    // detectBot({
    //   mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
    //   // Block all bots except the following
    //   allow: [
    //     "CATEGORY:SEARCH_ENGINE",
    //     "CATEGORY:API_CLIENT", // Cho phép API clients như Postman
    //     "USER_AGENT:PostmanRuntime",
    //   ],
    // }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});


app.get("/", async (req, res) => {
  console.log("🔥 User-Agent:", req.headers["user-agent"]);

  const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
  console.log("🔥 Full Arcjet Decision:", JSON.stringify(decision, null, 2));

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Too Many Requests" }));
    } else if (decision.reason.isBot()) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No bots allowed" }));
    } else {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
    }
  } else if (decision.results.some(isSpoofedBot)) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World" }));
  }
});

export default aj;