import route from "koa-route";

export const liveDraftSocketMiddleware = route.all("/test/:id", function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.send("Hello World");
  ctx.websocket.on("message", function (message) {
    // do something with the message from client
    console.log(message);
  });
})