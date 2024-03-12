<script lang="ts">
  import type { Template } from "$lib/types";
  import { TrashBinSolid } from "flowbite-svelte-icons";

  export let template: Template;
  export let variableValues: { [key: string]: string } = {};
  export let onCreate: () => void;
  export let creating: boolean = false;

  $: variableValues ??= { ...template.variables.reduce((acc, variable) => ({ [variable.target]: "", ...acc }), {}) };

  // $: console.log(variableValues);
  export let removeTemplateCallback;
</script>

<form on:submit={() => creating ? null : onCreate()}>
  <div class="flex flex-col items-center m-5 p-5 rounded-xl bg-base-300 w-96">
    <div>
      <span class="text-lg font-bold">{template.name}</span>
      {#if removeTemplateCallback}
        <button class="w-5 h-5" on:click={() => removeTemplateCallback?.(template)} type="button">
          <TrashBinSolid />
        </button>
      {/if}
    </div>
    <span class="text-sm">{template.description}</span>
    <div class="flex flex-col mt-5">
      {#each template.variables as variable}
        <input type="text" class="input bordered border-gray-400" placeholder={variable.prompt}
               bind:value={variableValues[variable.target]} />
      {/each}
    </div>
    <button class="btn btn-primary mt-5" type="submit" disabled={creating}>
      {#if creating}<div class="loading loading-sm" />{/if}
      Start chat
    </button>
  </div>
</form>
