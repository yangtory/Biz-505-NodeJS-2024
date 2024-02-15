import path from "path";
import multer from "multer";
import { existsSync, mkdirSync } from "node:fs";
import { v4 as uuidv4 } from "uuid";

// 프로젝트의 root 폴더
const appRoot = process.env.PWD;
const upLoadFolder = path.join(appRoot, "public", "images");

// 파일 업로드를 위한 multer 설정
// 업로드를 시도할 때 파일을 저장할 폴더를 관리할 함수
const destination = async (req, file, callback) => {
  // 파일을 업로드할 폴더가 없으면
  if (!existsSync(upLoadFolder)) {
    mkdirSync(upLoadFolder, { recursive: true });
  }
  // 실제 multer upLoadFolder 정보 알려주기
  callback(null, upLoadFolder);
};

// 업로드할 때 파일 이름을 변경하거나 하는 용도의 함수
const filename = async (req, file, callback) => {
  // 원본 파일에 uuid 값을 부착하여 새로운 파일 이름 만들기
  const upLoadFileName = `${uuidv4()}-${file.originalname}`;
  callback(null, upLoadFileName);
};

const storage = multer.diskStorage({ destination, filename });
const limits = { filesize: 1024 * 1024 * 2 }; // 최대파일크기 1KByte * 1024 *2 = 2MByte로 지정
const upLoad = multer({ storage, limits });

export { upLoad };
