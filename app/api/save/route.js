import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        const data = await req.json();
        const filePath = path.join(process.cwd(), "answers.json");

        let allAnswers = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf-8");
            if (fileData) {
                try {
                    const parsed = JSON.parse(fileData);
                    if (Array.isArray(parsed)) {
                        allAnswers = parsed;
                    }
                } catch (err) {
                    console.error("Error parsing JSON, starting fresh:", err);
                }
            }
        }

        const newAnswer = {
            timestamp: new Date().toISOString(),
            answers: data.answers,
        };

        allAnswers.push(newAnswer);

        fs.writeFileSync(filePath, JSON.stringify(allAnswers, null, 2));

        return NextResponse.json({ success: true, message: "Saved successfully!" });
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save data." },
            { status: 500 }
        );
    }
}
