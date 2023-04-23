const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const client = new PrismaClient();

//todo 읽기
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = client.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400), json({ ok: false, error: "Not exist user" });
    }
    const todos = await client.todo.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({ ok: true, todos });
  } catch (error) {
    console.error(error);
  }
});

//todo 생성
router.post("/", async (req, res) => {
  try {
    const { todo, userId } = req.body;

    if (!todo) {
      return res.status(400).json({ ok: false, error: "Not exist todo" });
    }
    if (!userId) {
      return res.status(400).json({ ok: false, error: "Not exist userId" });
    }

    const user = await client.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      return res.status(400).json({ ok: false, error: "Not exist user" });
    }

    const newTodo = await client.todo.create({
      data: {
        todo,
        isDone: false,
        userId: user.id,
      },
    });
    res.json({ ok: true, todo: newTodo });
  } catch (error) {
    console.error(error);
  }
});

//todo IsDone
router.put("/:id/done", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existTodo = await client.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!existTodo) {
      return req.status(400).json({ ok: false, error: "No exist todo" });
    }
    if (existTodo.userId !== parseInt(userId)) {
      return res
        .status(400)
        .json({ ok: false, error: "You are not todo owner " });
    }

    const updatedTodo = await client.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isDone: !existTodo.isDone,
      },
    });
    res.json({ ok: true, updatedTodo });
  } catch (eroor) {
    console.error(error);
  }
});

//todo delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existTodo = await client.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existTodo) {
      return res.status(400).json({ ok: false, error: "No exist todo" });
    }
    if (existTodo.userId !== parseInt(userId)) {
      return res.status(400).json({ ok: false, error: "U R not owner" });
    }
    const deletedTodo = await client.todo.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ ok: true, deletedTodo });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
