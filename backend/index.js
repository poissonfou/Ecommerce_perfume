const express = require("express");
const fs = require("fs");
const amqp = require("amqplib/callback_api");

const app = express();
amqp.connect("amqp://localhost", (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    //asserting the request queue
    channel.assertQueue("rpc_queue", { durable: false });

    //consuming queue and performing different operations depending on the type especified
    //by the received data
    channel.consume("rpc_queue", async (data) => {
      const dataParsed = JSON.parse(data.content.toString());

      if (dataParsed.operation == "login") {
        const email = dataParsed.email.trim();
        const password = dataParsed.password.trim();

        //data valdation
        if (!email.includes("@")) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "Please enter a valid email",
            type: "login",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        if (password.length < 6) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "Password must be longer than six digits",
            type: "login",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        //reading data file
        const fileData = await JSON.parse(fs.readFileSync("data.json"));

        const isRegistered = fileData.map((user) => user.email).indexOf(email);

        if (isRegistered == -1) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "User not registered",
            type: "login",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        if (fileData[isRegistered].password !== password) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "Incorrect password. Please try again.",
            type: "login",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        //sending response to the reply queue in the frontend
        const response = JSON.stringify({
          status: "OK",
          message: null,
          data: fileData[isRegistered].cart,
        });
        channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
          correlationId: data.properties.correlationId,
        });
      }

      if (dataParsed.operation == "signup") {
        const email = dataParsed.email.trim();
        const password = dataParsed.password.trim();
        const confirm = dataParsed.confirm.trim();

        //data validation
        if (!email.includes("@")) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "Please enter a valid email",
            type: "signup",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        if (password.length < 6) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "Password must be longer than six digits",
            type: "signup",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        if (password !== confirm) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "Passwords must match",
            type: "signup",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        //reading data file
        const fileData = await JSON.parse(fs.readFileSync("data.json"));

        const isRegistered = fileData.map((user) => user.email).indexOf(email);

        if (isRegistered !== -1) {
          const response = JSON.stringify({
            status: "ERROR",
            message: "A user with this email already exists",
            type: "signup",
          });
          channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
            correlationId: data.properties.correlationId,
          });
          return;
        }

        fileData.push({ email, password, cart: [] });

        //writing updated data
        fs.writeFileSync("data.json", JSON.stringify(fileData, null, 2));

        //sending response to the reply queue in the frontend
        const response = JSON.stringify({
          status: "OK",
          message: null,
          data: fileData[isRegistered].cart,
        });
        channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
          correlationId: data.properties.correlationId,
        });
      }

      if (dataParsed.operation == "add-product") {
        const email = dataParsed.email;
        const fileData = await JSON.parse(fs.readFileSync("data.json"));

        const userIdx = fileData.map((user) => user.email).indexOf(email);

        fileData[userIdx].cart++;

        fs.writeFileSync("data.json", JSON.stringify(fileData, null, 2));

        const response = JSON.stringify({
          status: "OK",
          message: null,
          data: fileData[userIdx].cart,
        });
        channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
          correlationId: data.properties.correlationId,
        });
      }

      if (dataParsed.operation == "get-cart") {
        const email = dataParsed.email;
        const fileData = await JSON.parse(fs.readFileSync("data.json"));

        const userIdx = fileData.map((user) => user.email).indexOf(email);

        const response = JSON.stringify({
          status: "OK",
          message: null,
          data: fileData[userIdx] ? fileData[userIdx].cart : 0,
        });
        channel.sendToQueue(data.properties.replyTo, Buffer.from(response), {
          correlationId: data.properties.correlationId,
        });
      }

      channel.ack(data);
    });
  });

  app.use(8080, () => console.log("server running on port 8080"));
});
