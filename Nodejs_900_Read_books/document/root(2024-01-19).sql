CREATE DATABASE bookdb;
USE bookdb;
CREATE TABLE tbl_books(
isbn VARCHAR(13) PRIMARY KEY,
title VARCHAR(50)	NOT NULL,	
author VARCHAR(50)	NOT NULL,	
publisher VARCHAR(50)	NOT NULL,	
price INT NOT NULL,	
discout	INT NOT NULL,	
descrip VARCHAR(4000),		
pubdate	VARCHAR(10),		
link VARCHAR(125),		
image VARCHAR(125)
);



INSERT INTO
tbl_books(isbn, title, author, publisher, price, discout)
VALUES('9791188850501','왕이된 남자','김선덕','북라이프','14000','12600');

SELECT * FROM tbl_books;