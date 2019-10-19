import { Authkey } from "../model";

import { ResponseJSON } from "./ResponseJSON";
import { RequestHandler } from "express";


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
