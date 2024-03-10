<script lang="ts">
  import type { Template } from "$lib/types";

  export let template: Template;
  export let variableValues: { } = {  };
  export let onCreate: () => void;
  
  $: variableValues ??= { ...template.variables.reduce((acc, variable) => ({ [variable.target]: "", ...acc }), {}) };
  
  $: console.log(variableValues);
</script>

<form on:submit={onCreate}>
<div class="flex flex-col items-center m-5 p-5 rounded-xl bg-base-300 w-96">
  <span class="text-lg font-bold">{template.name}</span>
  <span class="text-sm">{template.description}</span>
  <div class="flex flex-col mt-5">
    {#each template.variables as variable}
      <input type="text" class="input bordered border-gray-400" placeholder={variable.prompt} bind:value={variableValues[variable.target]} />
    {/each}
  </div>
  <button class="btn btn-primary mt-5" type="submit">Start chat</button>
</div>
</form>
