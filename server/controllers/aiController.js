import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import FormData from "form-data";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";


const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Free usage limit reached. Please upgrade to premium plan."
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_tokens: length
        });

        const content = response.choices[0].message.content;

        await sql`
            INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'article')
        `;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        res.json({ success: true, content });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// generate blog title

export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Free usage limit reached. Please upgrade to premium plan."
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response.choices[0].message.content;

        await sql`
            INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
        `;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        res.json({ success: true, content });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// generate image

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({
                success: false,
                message: "This feature is available for premium users only. Please upgrade to premium plan."
            });
        }

        console.log("====================================");
        console.log("IMAGE GENERATION START");
        console.log("Prompt:", prompt);
        console.log("Publish:", publish);
        console.log("User:", userId);
        console.log("====================================");

        const formData = new FormData();
        formData.append("prompt", prompt);

        const response = await axios({
            method: "post",
            url: "https://clipdrop-api.co/text-to-image/v1",
            data: formData,
            headers: {
                ...formData.getHeaders(),
                "x-api-key": process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer",
            validateStatus: () => true,
        });

        console.log("ClipDrop Status:", response.status);

        if (response.status !== 200) {
            console.log("ClipDrop Error:");
            console.log(Buffer.from(response.data).toString());

            return res.json({
                success: false,
                message: `ClipDrop returned ${response.status}`,
            });
        }

        console.log("ClipDrop Success");

        const imageBuffer = Buffer.from(response.data);

        console.log("Image Size:", imageBuffer.length);

         const base64Image = `data:image/png;base64,${Buffer.from(
    response.data
).toString("base64")}`;

      console.log("Before Cloudinary Upload");

console.log("Base64 length:", base64Image.length);
console.log(base64Image.substring(0, 80));

let result;

try {

    result = await cloudinary.uploader.upload(base64Image, {
        resource_type: "image",
    });

    console.log("UPLOAD SUCCESS");
    console.log(result);

} catch (err) {

    console.log("UPLOAD FAILED");
    console.log("HTTP:", err.http_code);
    console.log("MESSAGE:", err.message);
    console.dir(err, { depth: null });

    return res.json({
        success: false,
        message: err.message,
    });
}

     const secure_url = result.secure_url;

console.log("Secure URL:", secure_url);

await sql`
    INSERT INTO creations
    (user_id, prompt, content, type, publish)
    VALUES
    (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
`;

return res.json({
    success: true,
    content: secure_url,
});

    } catch (error) {
        console.log("==============================");
        console.log("MAIN ERROR");
        console.log(error);
        console.log("==============================");

        return res.json({
            success: false,
            message: error.message,
        });
    }
};


// Remove Image Background
export const removeImageBackground = async (req, res) => {
try {
        const { userId } = req.auth();
        const plan = req.plan;
        const { publish } = req.body;

        if (plan !== "premium") {
            return res.json({
                success: false,
                message:
                    "This feature is available for premium users only. Please upgrade to premium plan.",
            });
        }

        if (!req.file) {
            return res.json({
                success: false,
                message: "Please upload an image.",
            });
        }

        console.log("====================================");
        console.log("REMOVE BACKGROUND START");
        console.log("User:", userId);
        console.log("====================================");

        const formData = new FormData();

        formData.append(
            "image_file",
            fs.createReadStream(req.file.path)
        );

        const response = await axios.post(
            "https://clipdrop-api.co/remove-background/v1",
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                },
                responseType: "arraybuffer",
            }
        );

        console.log("ClipDrop Status:", response.status);

        if (response.status !== 200) {
            return res.json({
                success: false,
                message: "Failed to remove background.",
            });
        }

        const base64Image = `data:image/png;base64,${Buffer.from(
            response.data
        ).toString("base64")}`;

        console.log("Uploading to Cloudinary...");

        const result = await cloudinary.uploader.upload(base64Image, {
            resource_type: "image",
        });

        console.log("Cloudinary Upload Success");

        const secure_url = result.secure_url;

        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type, publish)
            VALUES
            (
                ${userId},
                ${"Background Removed"},
                ${secure_url},
                ${"image"},
                ${publish ?? false}
            )
        `;

        return res.json({
            success: true,
            content: secure_url,
        });

    } catch (error) {
        console.log("==============================");
        console.log("REMOVE BACKGROUND ERROR");
        console.log(error.message);
        console.log("==============================");

        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// Remove Object
export const removeImageobject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const plan = req.plan;
        const { publish } = req.body;

        if (plan !== "premium") {
            return res.json({
                success: false,
                message: "This feature is available for premium users only.",
            });
        }

        if (!req.files?.image || !req.files?.mask) {
            return res.json({
                success: false,
                message: "Image and mask are required.",
            });
        }

        const image = req.files.image[0];
        const mask = req.files.mask[0];

        console.log("====================================");
        console.log("REMOVE OBJECT START");
        console.log("User:", userId);
        console.log("====================================");

        const formData = new FormData();

        formData.append("image_file", fs.createReadStream(image.path));
        formData.append("mask_file", fs.createReadStream(mask.path));

        const response = await axios.post(
            "https://clipdrop-api.co/cleanup/v1",
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                },
                responseType: "arraybuffer",
            }
        );

        const base64Image = `data:image/png;base64,${Buffer.from(
            response.data
        ).toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            resource_type: "image",
        });

        const secure_url = result.secure_url;

        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type, publish)
            VALUES
            (
                ${userId},
                ${"Object Removed"},
                ${secure_url},
                ${"image"},
                ${publish ?? false}
            )
        `;

        return res.json({
            success: true,
            content: secure_url,
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// Review Resume
export const resumeReview = async (req, res) => {
        try {

        const { userId } = req.auth();
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Free Usage Limit
        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Free usage limit reached. Please upgrade to premium plan."
            });
        }

        // Check Resume Uploaded
        if (!req.file) {
            return res.json({
                success: false,
                message: "Please upload your resume."
            });
        }

        const resume = req.file;

        // Allow only PDF
        if (resume.mimetype !== "application/pdf") {
            return res.json({
                success: false,
                message: "Only PDF resumes are allowed."
            });
        }

        // Maximum File Size = 5 MB
        const MAX_FILE_SIZE = 5 * 1024 * 1024;

        if (resume.size > MAX_FILE_SIZE) {
            return res.json({
                success: false,
                message: "Resume file size should not exceed 5 MB."
            });
        }

        // Read PDF
        const dataBuffer = fs.readFileSync(resume.path);

        // Extract Text
        const pdfData = await pdfParse(dataBuffer);

        const resumeText = pdfData.text;

        // Gemini AI
        const response = await AI.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert ATS Resume Reviewer and Career Coach."
                },
                {
                    role: "user",
                    content: `
Review the following resume professionally.

Resume:

${resumeText}

Give your answer in Markdown format.

Include the following sections:

# ATS Score (Out of 100)

# Overall Summary

# Strengths

# Weaknesses

# Missing Skills

# Projects Review

# Experience Review

# Education Review

# Suggestions to Improve

# Final Verdict
`
                }
            ],
            temperature: 0.5,
            max_tokens: 1500
        });

        const content = response.choices[0].message.content;

        // Save Review
        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type)
            VALUES
            (
                ${userId},
                'Resume Review',
                ${content},
                'resume-review'
            )
        `;

        // Update Free Usage
        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        res.json({
            success: true,
            content
        });

    } catch (error) {

        console.log("==============================");
        console.log("RESUME REVIEW ERROR");
        console.log(error);
        console.log("==============================");

        res.json({
            success: false,
            message: error.message
        });
    }
};