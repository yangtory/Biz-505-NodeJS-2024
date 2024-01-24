import _tbl_books from "./tbl_books.js"; // _ 있는 변수는 대충쓰고 버림

const initModels = (sequelize) => {
  // 모델 이름 설정
  // 함수호출해서 변수에 넣기, 테이블 만들기
  const tbl_books = _tbl_books(sequelize);

  // 다른 곳에서 model 을 사용할수 있도록 export 준비
  return {
    tbl_books,
  };
};

export default initModels;
