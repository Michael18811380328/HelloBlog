import fs from 'fs';
import jwt from 'jsonwebtoken';
import multipart from 'connect-multiparty';
import {PRIVATE_KEY} from '../config/config';

export function deleteDir(path) {
  if (fs.existsSync(path)) {
    var info = fs.statSync(path);
    if (info.isDirectory()) {
      var data = fs.readdirSync(path);
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          delPath(`${path}/${data[i]}`);
          if (i == data.length - 1) {
            delPath(`${path}`);
          }
        }
      } else {
        fs.rmdirSync(path);
      }
    } else if (info.isFile()) {
      fs.unlinkSync(path);
    }
  }
}

export function loadJsonFile(file) {
  var json = fs.readFileSync(file).toString();
  return JSON.parse(json);
}

export function genJWT(dtable_uuid) {
  let token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (5 * 60),
    dtable_uuid: dtable_uuid,
  }, PRIVATE_KEY);
  return token;
}

export const multiMiddleware = multipart();
