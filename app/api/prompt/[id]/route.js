
import { connectToDatabase } from "@utils/database";
import { Prompt } from "@models/prompt";

//GET
export const GET = async (request, {params}) => {
    try {
        await connectToDatabase();

        const prompt = await Prompt.findById(params.id)
        .populate("creator");

        if (!prompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }

        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to get Posts", {
            status: 500,
        });
    }
}
//PATCH

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();

    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) new Response("Prompt not Found", {status : 404})
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status : 200})
    } catch (error) {
        return new Response("Failed to update Prompt", {status : 500})
    }
}

//DELETE

export const DELETE = async (request, {params}) => {
    try {
        await connectToDatabase();
        await Prompt.findByIdAndRemove(params.id);
        
        return new Response("Prompt Deleted", {status : 200})
        
    } catch (error) {
        return new Response("Failed to delete Prompt", {status : 500})
    }
}