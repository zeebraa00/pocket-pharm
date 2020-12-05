const events = require("events");

const ssrhandle = (app) => {
  return (req, res, next) => {
    req.$http = (ctx) => {
      const send = ctx.res.send;
      const receiveEvent = new events.EventEmitter();
      ctx.res.send = function (body) {
        if (Array.isArray(body)) {
          ctx.res.sendValue = body.map((item) => item.toJSON());
        } else {
          ctx.res.sendValue = body.toJSON();
        }
        //send.call(ctx.res, body);
        receiveEvent.emit("data");
      };

      const fetch = () => {
        return new Promise((resolve, reject) => {
          receiveEvent.on("data", async () => {
            resolve("something");
          });
          app.get("rest")(ctx.req, ctx.res, next);
        });
      };

      const handle = async (uri) => {
        ctx.req.url = uri;
        await fetch();
        return;
      };

      handle.get = async (uri) => {
        ctx.req.method = "GET";
        await handle(uri);
        return ctx.res.sendValue;
      };

      return handle;
    };
    next();
  };
};

module.exports = ssrhandle;
