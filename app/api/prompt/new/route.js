import { connectToDatabase } from "@utils/database";
import { Prompt } from "@models/prompt";

export const POST = async (req) => {
    const {prompt, userId, tag} = await req.json();

    try {
        await connectToDatabase();
        console.log("Tag", tag);
      
        const newPrompt = await Prompt.create({
            prompt,
            creator: userId,
            tag: tag,
        });
        console.log("New prompt created1:", newPrompt);
        await newPrompt.save();
        console.log("New prompt created2:", newPrompt);
        return new Response(JSON.stringify(newPrompt), {
            status: 201,
        });

    } catch (error) {
       console.error(error);
        return new Response("Failed to create prompt", {
            status: 500,
        })
    }

}