'use server';

/**
 * @fileOverview A flow that summarizes game descriptions using AI.
 *
 * - summarizeGameDescriptions - A function that summarizes a list of game descriptions.
 * - SummarizeGameDescriptionsInput - The input type for the summarizeGameDescriptions function.
 * - SummarizeGameDescriptionsOutput - The return type for the summarizeGameDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGameDescriptionsInputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the game.'),
    description: z.string().describe('The full description of the game.'),
  })
);
export type SummarizeGameDescriptionsInput = z.infer<
  typeof SummarizeGameDescriptionsInputSchema
>;

const SummarizeGameDescriptionsOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the game.'),
    summary: z.string().describe('A short, engaging summary of the game.'),
  })
);
export type SummarizeGameDescriptionsOutput = z.infer<
  typeof SummarizeGameDescriptionsOutputSchema
>;

export async function summarizeGameDescriptions(
  input: SummarizeGameDescriptionsInput
): Promise<SummarizeGameDescriptionsOutput> {
  return summarizeGameDescriptionsFlow(input);
}

const summarizeGameDescriptionPrompt = ai.definePrompt({
  name: 'summarizeGameDescriptionPrompt',
  input: {schema: SummarizeGameDescriptionsInputSchema},
  output: {schema: SummarizeGameDescriptionsOutputSchema},
  prompt: `You are an AI assistant designed to generate short, engaging summaries of game descriptions.

  Here are the game descriptions you need to summarize:

  {{#each this}}
  Title: {{title}}
  Description: {{description}}
  ---\n  {{/each}}

  Generate a concise summary for each game, highlighting the key aspects and unique features in a way that would capture the attention of potential players.

  The output should be an array of objects, where each object contains the title of the game and its corresponding summary.
  Ensure that each summary is engaging and informative.
  `,
});

const summarizeGameDescriptionsFlow = ai.defineFlow(
  {
    name: 'summarizeGameDescriptionsFlow',
    inputSchema: SummarizeGameDescriptionsInputSchema,
    outputSchema: SummarizeGameDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await summarizeGameDescriptionPrompt(input);
    return output!;
  }
);
