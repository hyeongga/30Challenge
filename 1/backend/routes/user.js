const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const client = new PrismaClient();

//유저생성
router.post("/", async (req, res) => {
  try {
    const { account } = req.body;

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });
    if (existUser) {
      return res
        .status(400)
        .json({ ok: false, error: "Already exist account" });
    }

    const user = await client.user.create({
      data: {
        account,
      },
    });

    res.json({ ok: true, user });
  } catch (error) {
    console.error(error);
  }
});

//유저 조회
router.get("/:account", async (req, res) => {
  try {
    const { account } = req.params;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Not exist user",
      });
    }
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
});

//유저 수정
router.put("/:account", async (req, res) => {
  try {
    const { account } = req.params;
    const { newAccount } = req.body;
    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Not exist user",
      });
    }

    const changeUser = await client.user.update({
      where: {
        account,
      },
      data: {
        account: newAccount,
      },
    });

    res.json({
      ok: true,
      user: changeUser,
    });
  } catch (error) {
    console.error(error);
  }
});

//유저 삭제
router.delete("/:account", async (req, res) => {
  try {
    const { account } = req.params;

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!existUser) {
      return res.status(400).json({ ok: false, error: "Not exist user" });
    }

    const deletedUser = await client.user.delete({
      where: { account },
    });
    res.json({ ok: true, user: deletedUser });
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
