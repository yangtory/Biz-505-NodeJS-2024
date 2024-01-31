import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  return res.render("iolist/list");
});

router.get("/insert", async (req, res) => {
  const user = req.session?.user; // session 에 있는 user 정보 가져오기
  if (user) {
    return res.render("iolist/input");
  } else {
    const message = "로그인이 필요한 서비스 입니다";
    return res.redirect(`/users/login?fail=${message}`);
  }
});

export default router;
