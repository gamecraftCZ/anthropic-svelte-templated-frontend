import { SenderType, type Template } from "$lib/types";

export const defaultTemplates: Template[] = [
  {
    id: "default-ask-about-document-en",
    name: "Ask about document",
    default: true,
    description: "Questions about a document.",
    systemPrompt: "You are a large language model. You were trained to help people to understand their documents. Answer as concisely as possible. If the problem is complicated, also print your thoughts step by step before printing the answer. You can use Markdown and LaTeX (enclosed between two '$$') to format your answer.",
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

[2] Any policy $π_*$ with $v_{π_*} = v_*$ is called an **optimal policy**. Such policy

can be defined as $π_*(s) ≝ \\argmax_a q_*(s, a) = \\argmax_a 𝔼\big[R_{t+1} + γv_*(S_{t+1}) | S_t = s, A_t = a\\big]$.

When multiple actions maximize $q_*(s, a)$, the optimal policy can

stochastically choose any of them."

---

## Answer: 

Optimal action-value function equals expected reward for doing selected action + optimal value function at next state [1] [2]

</example>

If the question cannot be answered by the document, say so.

Answer the question immediately without preamble.
`,
    },
      { sender: SenderType.ASSISTANT, text: "Understand. What is your question?" },
      { sender: SenderType.USER, text: "" }],
    variables: [{ target: "document", prompt: "Text document content", type: "TEXT" }],
  },
  {
    id: "default-ask-about-document-cs",
    name: "Otázky k dokumentu",
    default: true,
    description: "Ptejte se na otázky k tomumentu",
    systemPrompt: "Jsi velký jazykový model natrénovaný na pomoc lidem s porozuměním jejich dokumentům. Odpovíděj jak nejpřesněji dokážeš. Pokud je problém komplikovaný, napiš svoje myšlenky krok po kroky než napíšeš odpověď. Můžeš používat Markdown a LaTeX (uzavřený mezi dvě '$$') pro formátovaní své odpověďi.",
    messagesPrompt: [{
      sender: SenderType.USER, text:
        `Dám ti dokument a poté se tě zeptám na nějaké otázky, které se ho budou týkat. Než odpovíš, napiš přesnou citace částí dokumentu, které ti pomohou odpovědět na otázku. Poté odpověz na otázku pomocí faktů z citací. Zde je dokument:

<document>
{document}
</document>

Nejprve najdi citace z dokumentu, ktaré jsou relevantní k odpovědi na otázku a vypiš je v číslovaném pořadí. Citace by měly být relativně krátké a měly by se vztahovat k určité stránce.

Pokud nenajdeš žádné relevantní citace, napiš "Žádné relevantní citace" místo nich.

Poté odpověz na otázku. Začni svoji odpověď "## Odpověď:". Nepiš citace nebo odkazy na citace přímo v odpovědi. Nepiš "Podle citace [1]". Místo toho se odkazuj na citace relevantní k jednotlivým částem odpovědi pouze přidáním jejich číslicových značek na konec příslušných vět.

Tedy, formát tvé celkové odpovědi by měl vypadat tak, jak je ukázáno mezi značkami <example></example>. Ujisti se, že dodržuješ formátování a mezerování přesně.

<example>

## Relevantní citace:

[1] "Optimální state-value funkci definujeme jako

$$v_*(s) ≝ \\max_π v_π(s),$$

~~~

obdobně

$$q_*(s, a) ≝ \\max_π q_π(s, a).$$

~~~

[2] Každá policy funkce $π_*$ with $v_{π_*} = v_*$ se nazývá **optimální policy**. Takovouto policy

můžeme definovat jako as $π_*(s) ≝ \\argmax_a q_*(s, a) = \\argmax_a 𝔼\big[R_{t+1} + γv_*(S_{t+1}) | S_t = s, A_t = a\\big]$.

Pokud je více akcí, které maximalizují $q_*(s, a)$, můžeme

vybrat stochasticky kteroukoliv z nich."

---

## Answer: 

Optimální action-value funkce se rovná očekávané odměně za provedení vybrané akce + optimální value funkce v následujícím stavu [1] [2]

</example>

Pokud otázku nelze zodpovědět pomocí dokumentu, řekni to.

Odpověz na otázku okamžitě bez úvodu.
`,
    },
      { sender: SenderType.ASSISTANT, text: "Rozumím. Jaká je tvoje první otázka?" },
      { sender: SenderType.USER, text: "" }],
    variables: [{ target: "document", prompt: "Obsah dokumentu", type: "TEXT" }],
  },
  
  // Naming chat systemPrompt: You are a large language model. You are trained to give a title to a conversation between human and a AI assistant. The title should as short as possible and capture the main purpose of the conversation the human was talking about
  // However it would cost money...
  
];