'use server';
/**
 * @fileOverview AI agent for generating project images.
 *
 * - generateProjectImage - A function that generates an image based on a prompt.
 * - GenerateProjectImageInput - The input type for the generateProjectImage function.
 * - GenerateProjectImageOutput - The return type for the generateProjectImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectImageInputSchema = z.object({
  prompt: z.string().describe('A detailed prompt for image generation, aiming for a visually appealing and relevant image for a software project. Include keywords and desired style (e.g., modern digital art).'),
});
export type GenerateProjectImageInput = z.infer<typeof GenerateProjectImageInputSchema>;

const GenerateProjectImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI (e.g., data:image/png;base64,...). Returns an empty string on failure or if no image is generated.'),
});
export type GenerateProjectImageOutput = z.infer<typeof GenerateProjectImageOutputSchema>;

export async function generateProjectImage(input: GenerateProjectImageInput): Promise<GenerateProjectImageOutput> {
  return generateProjectImageFlow(input);
}

const generateProjectImageFlow = ai.defineFlow(
  {
    name: 'generateProjectImageFlow',
    inputSchema: GenerateProjectImageInputSchema,
    outputSchema: GenerateProjectImageOutputSchema,
  },
  async (input) => {
    try {
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation', // MUST use this model for images
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
        },
      });

      if (media && media.url) {
        return { imageDataUri: media.url };
      }
      console.warn('Image generation did not return a media URL for prompt:', input.prompt);
      return { imageDataUri: '' };
    } catch (error) {
      console.error('Error during image generation flow for prompt "', input.prompt, '":', error);
      return { imageDataUri: '' }; // Return empty string on error
    }
  }
);
