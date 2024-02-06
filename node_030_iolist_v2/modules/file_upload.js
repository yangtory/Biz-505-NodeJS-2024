/**
 * 파일이 업로드 되면
 * 업로드 된 파일을 저장폴더에 저장하는 미들웨어
 */
// 필요한 함수만 쓰기, import fs from "fs"
// fs.existsSync 이렇게 썼었는데 직접 함수를 적어서 그것만 쓰기
// fs 모듈에서 existsSync() 함수와 mkditSync()함수만 사용하겠다
import { existsSync, mkdirSync } from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuid } from "uuid"; //uuid 모듈에 있는 v4()함수를 uuid()이름으로 쓰겟음

// 프로젝트의 물리적 저장소 경로
// ~/Document/workspace/nodejs/node_030/iolist 경로가 사용된다
const appRoot = process.env.PWD;
// ~/Document/workspace/nodejs/node_030/iolist/public/uploads
const uploadPath = path.join(appRoot, "public", "uploads"); //운영체제에 맞도록 폴더 접근을 도와줌, /

// client가 file > router > upLoad > req 순으로 흐름
/**
 * multer 는 destination 과 filename 이라는 2개의 함수가 필요하다.
 * destination : 파일을 저장할때 사용할 설정들
 * filename : 파일 이름에 대한 핸들링
 */

const storageOption = {
  // multer가 제공해주는 칭구들
  destination: async (req, file, callback) => {
    if (!existsSync(uploadPath)) {
      // upLoadPath확인해서 폴더가 없으면 만들어
      mkdirSync(uploadPath);
    }
    // 나머진 multer 니가 처리해
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    // image name injection 해킹 공격에 대비하여
    // 원래 이름을 변경하여 업로드 하도록 지시
    const upFileName = `${uuid()}-${file.originalname}`;
    callback(null, upFileName); //originalname=걍파일이름임
  },
};

//
const storage = multer.diskStorage(storageOption);
const upLoad = multer({ storage }); //storageOption을 json 으로 만들어서 {} 해주기

export { upLoad }; //함수 직접 내보내기
