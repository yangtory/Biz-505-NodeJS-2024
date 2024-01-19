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