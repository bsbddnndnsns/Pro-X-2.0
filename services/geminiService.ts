import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_TEXT, GEMINI_MODEL_IMAGE } from '../constants';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set REACT_APP_GEMINI_API_KEY or use the process.env.API_KEY shim.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSocialCaptions = async (topic: string, platform: 'Instagram' | 'YouTube'): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      Write 3 engaging, viral ${platform} captions for a video/post about: "${topic}".
      Include relevant hashtags. 
      Format the output clearly with separation between the 3 options.
      Keep it energetic and professional.
    `;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate captions. Check your API key or try again.");
  }
};

export const editImageBackground = async (base64Image: string, instruction: string): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using gemini-2.5-flash-image for image editing/generation capabilities
    const prompt = instruction || "Remove the background and place the subject on a pure white background.";

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_IMAGE,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG for upload, API handles conversion usually
              data: base64Image
            }
          },
          {
            text: prompt + " Return the result as a high quality image."
          }
        ]
      }
    });

    // Extract image from response
    // The response for image generation/editing usually contains inlineData in the parts
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    // Fallback if no image found but text exists (error message or description)
    if (response.text) {
        throw new Error("Model returned text instead of image: " + response.text);
    }

    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw new Error("Failed to process image. Ensure your API key supports image generation.");
  }
};

export const generateImageFromText = async (prompt: string): Promise<string> => {
  try {
    const ai = getClient();
    
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_IMAGE,
      contents: {
        parts: [
          {
            text: prompt
          }
        ]
      }
    });

    for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (response.text) {
        throw new Error("Model returned text instead of image: " + response.text);
    }

    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw new Error("Failed to generate image. Please try a different prompt.");
  }
};