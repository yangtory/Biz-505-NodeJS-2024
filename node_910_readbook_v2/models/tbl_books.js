import Sequelize from "sequelize";
const book = (sequelize) => {
  // json데이터를 book_table 변수로 만들겠다
  const book_table = {
    // booktable 이라는 객체 안에 isbn 변수를 만들고 그 변수값이 또! json 임
    // DTO 같은거 데이터 클래스, 데이터 객체, 모델 객체 라고함
    isbn: {
      type: Sequelize.DataTypes.STRING(13),
      primaryKey: true, // PK
      defaultValue: "",
    },
    title: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // NOTNULL
      defaultValue: "",
    },
    author: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // NOTNULL
      defaultValue: "",
    },
    publisher: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // NOTNULL
      defaultValue: "",
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  };
  // 테이블이름,데이터,설정
  return sequelize.define("tbl_books", book_table, {
    // 두번째 seq: 매개변수로받은거, 첫번째 seq: define에게보내주는애
    // seqelize 라는 변수를 선언하고, book 함수에서 매개변수로 받은 sequelize 를
    // 값으로 세팅한다
    // 단, 선언하는 변수명과, 세팅하는 값이 담긴 변수명이 같으면 값이 담긴 변수명을 생략할 수 있다.
    // sequelize : sequelize 이 명령문 을 sequelize 만 사용해도 된다
    sequelize: sequelize,
    tableName: "tbl_books",
    timestamps: false,
  });
};

export default book;
