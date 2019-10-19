import { RequestHandler } from "express";
import { Authkey } from "../model";
import { ResponseJSON } from "./ResponseJSON";


const logout: RequestHandler = async function (req, res) {
  const authkey = String(req.body.authkey);

  Authkey.destroy({
    where: {
      value: authkey
    }
  });

  res.json(ResponseJSON.buildSuccessResponse());
};


export default logout;
