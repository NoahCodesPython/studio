'use server';

/**
 * @fileOverview AI agent for generating personalized introductory messages based on viewer profiles.
 *
 * - generateIntro - A function that generates a personalized intro message.
 * - GenerateIntroInput - The input type for the generateIntro function.
 * - GenerateIntroOutput - The return type for the generateIntro function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIntroInputSchema = z.object({
  viewerProfile: z
    .string()
    .optional()
    .describe('The profile of the person viewing the portfolio.'),
  ownerName: z.string().describe('The name of the portfolio owner.'),
  ownerProfession: z.string().describe('The profession of the portfolio owner.'),
});
export type GenerateIntroInput = z.infer<typeof GenerateIntroInputSchema>;

const GenerateIntroOutputSchema = z.object({
  introMessage: z.string().describe('A personalized introductory message.'),
});
export type GenerateIntroOutput = z.infer<typeof GenerateIntroOutputSchema>;

export async function generateIntro(input: GenerateIntroInput): Promise<GenerateIntroOutput> {
  return generateIntroFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIntroPrompt',
  input: {schema: GenerateIntroInputSchema},
  output: {schema: GenerateIntroOutputSchema},
  prompt: `You are a personal assistant helping to create a personalized introduction for a portfolio website.

  The portfolio owner's name is {{{ownerName}}}, and their profession is {{{ownerProfession}}}.

  {{#if viewerProfile}}
  The viewer of the portfolio has the following profile: {{{viewerProfile}}}.
  Create an introductory message that is personalized to them.
  {{else}}
  Create a generic but engaging introductory message.
  {{/if}}
  `,
});

const generateIntroFlow = ai.defineFlow(
  {
    name: 'generateIntroFlow',
    inputSchema: GenerateIntroInputSchema,
    outputSchema: GenerateIntroOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
