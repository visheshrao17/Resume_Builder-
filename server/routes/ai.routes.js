import express from "express";
import { enhanceJobDescription, enhanceProfessionalSummary, enhanceBulletPoint, uploadResume } from "../controllers/ai.controller.js";
import protect from "../middleware/auth.middleware.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/enhance-bullet', protect, enhanceBulletPoint);
aiRouter.post('/upload-resume', protect, uploadResume)

export default aiRouter;