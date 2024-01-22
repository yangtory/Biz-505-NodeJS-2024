import mysql from "mysql2/promise"; // 동기방식으로 사용하기위해

const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "000000",
  database: "bookdb2",
};

/**
 * 동기식으로 DB 연결 설정하기
 * async 로 시작하고
 * 각 실행 함수 앞에 await 를 붙혀주면
 * await 로 시작하는 함수가 완료될때까지 blocking 된다
 */
const dbCeate = {
  // 연결 정보를 동기식으로 쓰겠다
  init: async () => {
    const connection = await mysql.createConnection(mysql_info);
    return connection;
  },
};

export default dbCeate;
