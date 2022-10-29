// var http = require("http");

// //create a server object:
// http
//   .createServer(function (req, res) {
//     res.write("Hi World!"); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080

const express = require("express"); //宣告引用ewxpress 套件
const line = require("@line/bot-sdk");
const app = express();
const config = {
  channelAccessToken: `K1MJlAsjyBBnoIkMI96KSy0p8pC5tiDQ8g3e6kRombH5SAQMLnMpdPBzLFePVO2D7wLumvinPtMGEJ7kpDE4/hqjnR1uorcD6/mxFdD0Z0DCGXEcZSPLVhXGsO21Xt53EKJAU2d1R6lail9YNudUAQdB04t89/1O/w1cDnyilFU=`,
  channelSecret: `2e4d55d77467b4e2220b383f08fe7a94`
};
console.log(config);
const client = new line.Client(config);
app.get(`/`, (req, res) => {
  res.end(`Hi`); //訪問根目錄時回應
});
app.post(`/webhook`, line.middleware(config), (req, res) => {
  console.log(req); //將LINE傳來的內容印出來看一下
  console.log(req.body.events[0].message); //將LINE傳來的內容印出來看
  let msg = {
    type: "text",
    text: req.body.events[0].message.text //使用者傳來的訊息
  };
  client.replyMessage(req.body.events[0].replyToken, msg);
});
// app.post(`/webhook`, (req, res) => {
//   console.log(req); //將LINE傳來的內容印出來看一下
//   res.end(`OK`);
// });
app.listen(8080); //監聽8080 port
