const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

/* Prometheus metrics */
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
    name: "node_request_count",
    help: "Total number of requests"
});

app.get("/", (req, res) => {
    counter.inc();
    res.send("DevOps Monitoring App Running 🚀");
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
