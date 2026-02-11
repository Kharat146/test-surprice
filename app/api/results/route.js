import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";

export async function GET(req) {
    // Check for Redis configuration (Production/Vercel)
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        try {
            const redis = new Redis({
                url: process.env.UPSTASH_REDIS_REST_URL,
                token: process.env.UPSTASH_REDIS_REST_TOKEN,
            });

            // Get all items from the list 'quiz_responses'
            const data = await redis.lrange('quiz_responses', 0, -1);

            return NextResponse.json({ count: data.length, responses: data });
        } catch (e) {
            return NextResponse.json({ error: "Redis Error: " + e.message }, { status: 500 });
        }
    }

    // Fallback to local file system (Local Development)
    const filePath = path.join(process.cwd(), "answers.json");
    let allAnswers = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        if (fileData) {
            try {
                const parsed = JSON.parse(fileData);
                if (Array.isArray(parsed)) allAnswers = parsed;
            } catch (err) { }
        }
    }

    return NextResponse.json({ count: allAnswers.length, responses: allAnswers });
}
