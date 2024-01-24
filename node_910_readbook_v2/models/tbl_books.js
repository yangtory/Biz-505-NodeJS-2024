import sequelize from "sequelize";

// seq : sequelize 도구에서 제공하는 data 객체 생성 도구
const books = (seq) => {
  const book_table = {
    // sequelize 를 이용해서 books_table DTO 만들기
    isbn: {
      type: sequelize.DataTypes.STRING(13),
      primaryKey: true, //PK
    },
    title: {
      type: sequelize.DataTypes.STRING(50),
      allowNull: false, //NOTNULL
    },
    author: {
      type: sequelize.DataTypes.STRING(50),
      allowNull: false,
    },
    publisher: {
      type: sequelize.DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: sequelize.DataTypes.INTEGER,
    },
    discount: {
      type: sequelize.DataTypes.INTEGER,
    },
  };
  const seq_init = {
    // seq 매개변수를 sequelize 로 선언
    sequelize: seq,
    tableName: "tbl_books",
  };
  // tbl_books data 객체 생성
  // define() 테이블을 객체로 선언해놓고, 프로젝트가 시작되면 테이블이 자동으로 생성됨
  return seq.define("tbl_books", book_table, seq_init);
};

export default books;
