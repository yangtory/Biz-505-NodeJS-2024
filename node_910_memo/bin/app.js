/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2024-01-19
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from 'express';
import createError from 'http-errors';
import path from 'path';
import helmet from 'helmet';

// 3rd party lib modules
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// MySQL Sequelize
import DB from '../models/index.js';

// import router modules
import indexRouter from '../routes/index.js';
import usersRouter from '../routes/users.js';

// create express framework
const app = express();

// helmet security module
app.use(helmet());
/**
 * img-src 정책
 * URL.createObjectURL() 함수를 사용하여
 * 가상으로 생성된 이미지 img tag의 src(소스)로
 * 사용할수 있도록 정책 설정하기
 */
const cspDirective = {
    directives: {
        defaultSrc: ["'self'"], // 우리 서버에 있는것만 쓸거얌
        'img-src': ["'self'", 'blob:', 'data:'], // blob 파일을 src 로 쓸수 있게 해줘
        // imgSrc: ["'self'", "blob:", "data:"], 위랑 같다
        'script-src': ["'self'", "'unsafe-inline'", 'https://fontawesome.com/'], // 스크립트 소스를 인라인으로 하고,저거 허용
        'style-src': ["'self'", "'unsafe-inline'", 'https://fontawesome.com/'], // 스타일도 허용
    },
};
// https://fontawesome.com/
app.use(helmet.contentSecurityPolicy(cspDirective)); // helmet아 이 정책 풀어줘

// MySQL DB 연결
// 주의!!! force 를 true 로 하면 기존의 Table 을 모두 DROP 한 후 재생성 한다
DB.sequelize.sync({ force: false }).then((dbConn) => {
    console.log(dbConn.options.host, dbConn.config.database, 'DB Connection OK');
});

// Disable the fingerprinting of this web technology.
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join('views'));
app.set('view engine', 'pug');

// middleWare enable
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));

// router link enable, link connection
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
