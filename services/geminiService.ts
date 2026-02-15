
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getGeminiAI = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const diagnoseCrop = async (base64Image: string): Promise<string> => {
  const ai = getGeminiAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "You are an agricultural expert for farmers in Maharashtra. Analyze this image of a plant. Identify the disease or pest. Provide the diagnosis in English, Marathi, and Hindi. Include recommended organic and chemical treatments specifically available in Maharashtra. Use a structured output format.",
        },
      ],
    },
  });
  return response.text || "Could not generate diagnosis.";
};

export const getMarketAdvice = async (crop: string, district: string): Promise<string> => {
  const ai = getGeminiAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze current market trends for ${crop} in ${district}, Maharashtra. Suggest whether the farmer should sell now or wait. Use a friendly expert tone.`,
  });
  return response.text || "No advice available currently.";
};

// Utils for Live API
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
