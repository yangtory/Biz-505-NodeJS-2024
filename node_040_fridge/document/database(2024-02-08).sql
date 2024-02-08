CREATE DATABASE fridge2db;
USE fridge2db;

CREATE TABLE tbl_product(
p_seq	INT	AUTO_INCREMENT	PRIMARY KEY,
p_fseq	INT	NOT NULL	,
p_name	VARCHAR(125)	NOT NULL	,
p_exdate	VARCHAR(12)	NOT NULL	,
p_quan	INT	NOT NULL	,
p_date	VARCHAR(12)	NOT NULL	,
p_memo	VARCHAR(125) DEFAULT NULL	
);

-- 오늘날짜에서 10일 전부터 임의 날짜에 상품구매
-- 유통기간: 구입일로부터 5 ~ 15 범위의
-- 임의의 날짜로 생성
SELECT COUNT(*) FROM tbl_product;