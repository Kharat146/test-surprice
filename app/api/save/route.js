import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

export async function POST(req) {
    try {
        const data = await req.json();
        const newAnswer = {
            timestamp: new Date().toISOString(),
            answers: data.answers,
        };

        // Check if Redis is configured (for Vercel deployment)
        if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
            const redis = new Redis({
                url: process.env.UPSTASH_REDIS_REST_URL,
                token: process.env.UPSTASH_REDIS_REST_TOKEN,
            });

            // Push to a list called 'quiz_responses'
            await redis.lpush("quiz_responses", JSON.stringify(newAnswer));

            return NextResponse.json({ success: true, message: "Saved to database!" });
        }

        // Fallback to local file system (for local development)
        const filePath = path.join(process.cwd(), "answers.json");
        let allAnswers = [];

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf-8");
            if (fileData) {
                try {
                    const parsed = JSON.parse(fileData);
                    if (Array.isArray(parsed)) allAnswers = parsed;
                } catch (err) {
                    console.error("Error parsing JSON:", err);
                }
            }
        }

        allAnswers.push(newAnswer);
        fs.writeFileSync(filePath, JSON.stringify(allAnswers, null, 2));

        return NextResponse.json({ success: true, message: "Saved locally!" });

    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save data." },
            { status: 500 }
        );
    }
}
