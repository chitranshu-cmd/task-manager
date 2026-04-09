const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/JWTmiddleware");

router.post("/", auth, async (req,res)=>{
  const task = await Task.create({
    title: req.body.title,
    userId: req.user.id
  });
  res.send(task);
});

router.get("/", auth, async (req,res)=>{
  const tasks = await Task.find({userId:req.user.id});
  res.send(tasks);
});

router.put("/:id", auth, async (req,res)=>{
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

router.delete("/:id", auth, async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;