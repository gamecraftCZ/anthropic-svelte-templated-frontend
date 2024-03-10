<script lang="ts">
  import { toasts } from "svelte-toasts";
  import type { Template } from "$lib/types";

  let templates: Template[] = [
    {
      id: "uuid",
      name: "Ask about document",
      description: "Questions about a document that will be downloaded from URL",
      prompt: [],
      variables: [{ target: "document_url", prompt: "URL for text document", type: "DOWNLOAD_URL" }],
    },
  ];

  const startChat = (template: Template) => {
    toasts.success("TODO Chat started");
  };
</script>

<div class="flex-grow flex items-center flex-col mt-5 overflow-hidden">
  <div class="flex justify-center items-center">
    <span class="text-xl font-bold ">New chat from template</span>
    <span class="m-5">OR</span>
    <button class="btn">New empty chat</button>
  </div>


  <div class="flex w-full overflow-y-auto">
    {#each templates as template}
      <div class="flex flex-col items-center m-5 p-5 rounded-xl bg-base-300">
        <span class="text-lg font-bold">{template.name}</span>
        <span class="text-sm">{template.description}</span>
        <div class="flex flex-col mt-5">
          {#each template.variables as variable}
            <input type="text" class="input bordered border-gray-400" placeholder={variable.prompt} />
          {/each}
        </div>
        <button class="btn btn-primary mt-5">Start chat</button>
      </div>
    {/each}
  </div>
</div>
