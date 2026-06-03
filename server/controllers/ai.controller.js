import Resume from "../models/resume.model.js";
import genAI from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Content is required" });
        }

        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            systemInstruction: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlight key skills, experience and career objects. Make it compelling and ATS-friendly and only return text no options or anything else."
        });

        const result = await model.generateContent(userContent);
        const enhancedContent = result.response.text().trim();

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Content is required" });
        }

        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            systemInstruction: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results wherever possible. Make it compelling and ATS-friendly and only return text no options or anything else."
        });

        const result = await model.generateContent(userContent);
        const enhancedContent = result.response.text().trim();

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const enhanceBulletPoint = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Content is required" });
        }

        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            systemInstruction: "You are an expert technical resume coach. Transform the user's vague job experience bullet point into a strong, metric-driven achievement using the XYZ structured formula: 'Accomplished [X], as measured by [Y], by doing [Z]'. Start with a strong action verb. Keep it to one single bullet point. Return only the text without any quotes or markdown."
        });

        const result = await model.generateContent(userContent);
        const enhancedContent = result.response.text().trim();

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Resume text is required" });
        }

        const schema = {
            type: "OBJECT",
            properties: {
                professional_summary: { type: "STRING" },
                skills: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                personal_info: {
                    type: "OBJECT",
                    properties: {
                        image: { type: "STRING" },
                        full_name: { type: "STRING" },
                        profession: { type: "STRING" },
                        email: { type: "STRING" },
                        phone: { type: "STRING" },
                        location: { type: "STRING" },
                        linkedin: { type: "STRING" },
                        website: { type: "STRING" }
                    }
                },
                experience: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            company: { type: "STRING" },
                            position: { type: "STRING" },
                            start_date: { type: "STRING" },
                            end_date: { type: "STRING" },
                            description: { type: "STRING" },
                            is_current: { type: "BOOLEAN" }
                        }
                    }
                },
                project: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            name: { type: "STRING" },
                            type: { type: "STRING" },
                            description: { type: "STRING" }
                        }
                    }
                },
                education: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            institution: { type: "STRING" },
                            degree: { type: "STRING" },
                            graduation_data: { type: "STRING" },
                            field: { type: "STRING" },
                            gpa: { type: "STRING" }
                        }
                    }
                }
            }
        };

        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            systemInstruction: "You are an expert AI agent to extract structured data from resumes."
        });

        const prompt = `Extract all details from the following resume text and format it into the expected JSON structure:\n\n${resumeText}`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });

        const extractedData = result.response.text();
        const parsedData = JSON.parse(extractedData);
        
        const newResume = await Resume.create({
            userId,
            title: title,
            ...parsedData
        });

        return res.json({ resumeId: newResume._id });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};