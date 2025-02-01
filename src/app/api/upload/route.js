import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload directory in the project root
        const uploadDir = path.join(process.cwd(), "uploads");

        // Ensure the directory exists
        await mkdir(uploadDir, { recursive: true });

        // Save the file with the same name as received from frontend
        const filePath = path.join(uploadDir, file.name);
        await writeFile(filePath, buffer);

        return new Response(JSON.stringify({ success: true, filePath: `/uploads/${file.name}` }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to upload file" }), { status: 500 });
    }
}
