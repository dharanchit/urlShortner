import express from "express";
import generateShortUrlController from "../controllers/generateShortUrlController";
import getLongUrlController from "../controllers/getLongUrlController";

const router = express.Router();

router.post("/generateUrl", generateShortUrlController);
router.get("/redirection-link", getLongUrlController);

export default router;
