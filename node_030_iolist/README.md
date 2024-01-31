# Sequelize DBMS 핸들링

- sequelize 를 상요할때 Table 에 대한 Model 을 생성한다.
- 수동으로 Model 을 생성하고, 프로젝트를 시작하면 Table 을 자동으로 만드는 기능이 프로젝트에 추가된다.
- 지금 프로젝트는 이미 생성된 `ecountDB` 를 대상으로 진행할 예정이다.
- DB Schema 를 자동으로 생성해주는 도구를 사용하여 DB 구성을 만들 것이다.

## Sequelize 자동화 도구를 사용하여 DB Schema 만들기

- 도구 테스트 : shell 에서 `npx sequelize-auto` 명령 실행 해 보기

```bash
npm install -g mysql2
npm install -g sequelize-auto
sequelize-auto -o "./models" -d edb -h localhost -u root -x '!Biz8080' -e mysql -l esm
```

## 로그인 수행하기

- 기본 `http` 프로토콜은 `(연결)상태가 없다`
- client 가 `requset(요청)`을 하면, server 는 `response(응답)`을 한다
- 한번의 이 과정이 끝나면 연결이 종료된다
- client 와 server 간의 요청, 응답이 진행되는 동안 server 는 사용자에 대한 정보를 알고 싶을때가 있다.
- 최초의 사용자 인증은 `http://server/book@callor:12341234` 와 같이 사용자의 정보를 요청하고
- 서버에서 인증을 수행했었다. 이 방식은 사용자의 중요 정보(id, password) 가 매우 쉽게 노출된다.

### Cookie 의 사용

- 사용자의 로그인 절차를 수행한다.
- 서버에서 사용자의 정보를 조회하여 정상 사용자 인지 검증
- 검증된 사용자의 정보를 문자열로 변환하여 응답한다.
- 응답을 하면서 사용자의 정보를 `cookie` 영역에 저장해 달라고 `Browser` 에게 요청한다.(서버가 클라이언트에게 요청)
- `Browser` 는 `Cookie` 영역에 사용자 정보를 저장한다.
- 이 때 사용자의 여러 중요 정보가 평문(평범한 문자열, plan text) 으로 `Browser` 에 저장된다.
- 이 `cookie` 영역은 누구나 쉽게 열어볼수 있다. 때문에 사용자의 정보가 쉽게 노출된다.
