import express from 'express';
import DB from '../models/index.js';
import moment from 'moment';
import { upLoad } from '../modules/file_upload.js';

const router = express.Router();
const MEMO = DB.models.tbl_memo;
const today = moment().format('yyyy-MM-DD');
const time = moment().format('HH:mm:ss');

router.get('/', async (req, res, next) => {
    try {
        const rows = await MEMO.findAll();
        // return res.json(time);
        return res.render('index', { MEMO: rows, today, time });
    } catch (error) {
        return res.json(error);
    }
});

router.get('/memo', async (req, res) => {
    const rows = await MEMO.findAll();
    return res.render('memo/input', { MEMO: rows, today, time });
});

router.post('/memo', upLoad.single('m_image'), async (req, res) => {
    const data = req.body;
    const file = req.file;
    req.body.m_date = today;
    req.body.m_time = time;
    req.body.m_author = 'wjdduscldrn@naver.com';
    if (file) {
        req.body.m_image = file.filename;
    }
    try {
        await MEMO.create(data);
        return res.redirect('/');
    } catch (error) {
        return res.json(error);
    }
});

router.get('/:m_seq/detail', async (req, res) => {
    const m_seq = req.params.m_seq;
    try {
        const row = await MEMO.findByPk(m_seq);
        const rows = await MEMO.findAll();
        // return res.json(row);
        return res.render('memo/detail', { memo: row, MEMO: rows, today, time });
    } catch (error) {
        return res.json(error);
    }
});

router.get('/:m_seq/update', async (req, res) => {
    const m_seq = req.params.m_seq;
    try {
        const item = await MEMO.findByPk(m_seq);
        const rows = await MEMO.findAll();
        return res.render('memo/input', { memo: item, MEMO: rows, today, time });
    } catch (error) {
        return res.json(error);
    }
});

router.post('/:m_seq/update', upLoad.single('m_image'), async (req, res) => {
    const data = req.body;
    const m_seq = req.params.m_seq;
    req.body.m_date = today;
    req.body.m_time = time;
    req.body.m_author = 'wjdduscldrn@naver.com';
    try {
        await MEMO.update(data, { where: { m_seq } });
        // return res.json(data);
        return res.redirect(`/${m_seq}/detail`);
    } catch (error) {
        return res.json(error);
    }
});

router.get('/:m_seq/delete', async (req, res) => {
    const m_seq = req.params.m_seq;
    try {
        await MEMO.destroy({ where: { m_seq } });
        return res.redirect('/');
    } catch (error) {
        return res.json(error);
    }
});
export default router;
