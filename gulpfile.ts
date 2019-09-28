import fs from "fs-extra";


/**
 * 删除编译`src`后得到的`bin`文件夹。
 */
function clean(cb) {
  fs.removeSync("bin");
  cb();
}


export {
  clean,
};
