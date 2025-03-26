import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  //console.log("Request Headers:", req.headers); // Kiểm tra xem có gì bất thường
  
  try {
    const decision = await aj.protect(req, {requested: 1});

    if(decision.isDenied()) {
      console.log("Lí do chặn req: ", decision.reason);
      
      //lỗi: bị quá nhiều request / Có khả năng là bot (hệ thống nó quyết định cái này)
      if(decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
      if(decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot detected" });
      }
      
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware error: ${error}`);
    next(error);
  }
}

export default arcjetMiddleware;