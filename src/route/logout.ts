import { Authkey } from "../model";
import { RequestHandler } from "express";


const logout: RequestHandler = async function (req, res) {
  const authkey: string = typeof req.body.authkey === "string" ? req.body.authkey : "";

  Authkey.destroy({
    where: {
      value: authkey
    }
  });

  res.json({});
};


export default logout;
