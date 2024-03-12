import { SenderType, type Template } from "$lib/types";

export const defaultTemplates: Template[] = [
  {
    id: "uuid-1",
    name: "Ask about document",
    default: true,
    description: "Questions about a document.",
    systemPrompt: "You are a large language model. You were trained to help people to understand their documents. Answer as concisely as possible. If the problem is complicated, also print your thoughts step by step before printing the answer. You can use Markdown and LaTeX to format your answer.",
    messagesPrompt: [{
      sender: SenderType.USER, text:
        `I'm going to give you a document. Then I'm going to ask you a question about it. I'd like you to first write down exact quotes of parts of the document that would help answer the question, and then I'd like you to answer the question using facts from the quoted content. Here is the document:

<document>
{document}
</document>

First, find the quotes from the document that are most relevant to answering the question, and then print them in numbered order. Quotes should be relatively short and they should refer to a specific page.

If there are no relevant quotes, write "No relevant quotes" instead.

Then, answer the question, starting with "## Answer:". Do not include or reference quoted content verbatim in the answer. Don't say "According to Quote [1]" when answering. Instead make references to quotes relevant to each section of the answer solely by adding their bracketed numbers at the end of relevant sentences.

Thus, the format of your overall response should look like what's shown between the <example></example> tags. Make sure to follow the formatting and spacing exactly.

<example>

## Relevant quotes:

[1] "Optimal state-value function is defined as

$$v_*(s) ≝ \\max_π v_π(s),$$

~~~

analogously

$$q_*(s, a) ≝ \\max_π q_π(s, a).$$

~~~

Any policy $π_*$ with $v_{π_*} = v_*$ is called an **optimal policy**. Such policy

can be defined as $π_*(s) ≝ \\argmax_a q_*(s, a) = \\argmax_a 𝔼\big[R_{t+1} + γv_*(S_{t+1}) | S_t = s, A_t = a\\big]$.

When multiple actions maximize $q_*(s, a)$, the optimal policy can

stochastically choose any of them."

---

## Answer: 

Optimal action-value function equals expected reward for doing selected action + optimal value function at next state [1]

</example>

If the question cannot be answered by the document, say so.

Answer the question immediately without preamble.

Here is the first question: 
`,
    },
      { sender: SenderType.ASSISTANT, text: "Understand. What is your question?" },
      { sender: SenderType.USER, text: "" }],
    variables: [{ target: "document", prompt: "Text document content", type: "TEXT" }],
  },
//     {
//       id: "uuid-2",
//       name: "Ask about online document",
//       description: "Questions about a document that will be downloaded from URL.",
//       systemPrompt: "You are a large language model. You were trained to help people to understand their documents. Answer as concisely as possible. If the problem is complicated, also print your thoughts step by step before printing the answer.",
//       messagesPrompt: [{
//         sender: SenderType.USER, text:
//           `I'm going to give you a document written in markdown containing LaTeX enclosed in $$ signs. Then I'm going to ask you a question about it. I'd like you to first write down exact quotes of parts of the document that would help answer the question, and then I'd like you to answer the question using facts from the quoted content. Here is the document:
//
// <document>
// {document}
// </document>
//
// First, find the quotes from the document that are most relevant to answering the question, and then print them in numbered order. Quotes should be relatively short and they should refer to a specific page.
//
// If there are no relevant quotes, write "No relevant quotes" instead.
//
// Then, answer the question, starting with "Answer:". Do not include or reference quoted content verbatim in the answer. Don't say "According to Quote [1]" when answering. Instead make references to quotes relevant to each section of the answer solely by adding their bracketed numbers at the end of relevant sentences.
//
// Thus, the format of your overall response should look like what's shown between the <example></example> tags. Make sure to follow the formatting and spacing exactly.
//
// <example>
//
// Relevant quotes:
//
// [1] "Optimal state-value function is defined as
//
// $$v_*(s) ≝ \\max_π v_π(s),$$
//
// ~~~
//
// analogously
//
// $$q_*(s, a) ≝ \\max_π q_π(s, a).$$
//
// ~~~
//
// Any policy $π_*$ with $v_{π_*} = v_*$ is called an **optimal policy**. Such policy
//
// can be defined as $π_*(s) ≝ \\argmax_a q_*(s, a) = \\argmax_a 𝔼\\big[R_{t+1} + γv_*(S_{t+1}) | S_t = s, A_t = a\\big]$.
//
// When multiple actions maximize $q_*(s, a)$, the optimal policy can
//
// stochastically choose any of them."
//
// Answer: 
//
// Optimal action-value function equals expected reward for doing selected action + optimal value function at next state [1]
//
// </example>
//
// If the question cannot be answered by the document, say so.
//
// Answer the question immediately without preamble.
//
// Here is the first question: I do not understand what is the difference between Sarsa and Q-learning. How they differ and why it matters for the results?
// `,
//       },
//         { sender: SenderType.ASSISTANT, text: "Understand. What is your question?" },
//         { sender: SenderType.USER, text: "" }],
//       variables: [{ target: "document", prompt: "URL to text document", type: "DOWNLOAD_URL" }],
//     },
  
  // Naming chat systemPrompt: You are a large language model. You are trained to give a title to a conversation between human and a AI assistant. The title should as short as possible and capture the main purpose of the conversation the human was talking about
  // However it would cost money...
  
];