import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import {
    register,
    login,
    me,
    logout,
  } from "../controllers/auth.controller";


const router = Router();

router.post(
  "/register",

  register
);

router.post(
  "/login",

  login
);

router.get(
    "/me",
    authenticate,
    me
  );

  router.post(
    "/logout",
    logout
  );

export default router;