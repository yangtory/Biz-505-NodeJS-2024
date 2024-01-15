import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const st_name = req.query.name || "이름을 전달해 주세요";
  const st_grade = req.query.grade || 0;
  const st_dept = req.query.dept || "학과를 전달해 주세요";
  const student = {
    name: st_name,
    dept: st_dept,
    grade: st_grade,
  };
  res.render("users", student);
}); // router.get("/")

// post 로 보내려면 post는 form 으로만 보낼수 있음
router.post("/", async (req, res) => {
  // const name = req.body.name;
  // const grade = req.body.grade;
  // const dept = req.body.dept; 밑에 한줄로 줄이기(구조분해방식)
  const { name, grade, dept } = req.body;
  res.render("users", { name, grade, dept });
});

export default router;
