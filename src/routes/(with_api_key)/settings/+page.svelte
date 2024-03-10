<script lang="ts">
  import { UserToken, checkApiKeyValidity } from "$lib/stores/auth";
  import { toasts } from "svelte-toasts";
  import { updateUser } from "$lib/api/updateUser";

  let apiKeyInput = "";
  let checkingValidity = false;

  const submit = async () => {
    if (apiKeyInput && !checkingValidity) {
      checkingValidity = true;
      if (await checkApiKeyValidity(apiKeyInput)) {
        if ((await updateUser({ apiKey: apiKeyInput })).success) {
          toasts.success("API key updated successfully", { duration: 5_000 });
        } else {
          console.warn("API key validation failed");
          toasts.error("API key validation failed", { duration: 5_000 });
        }
        
      } else {
        console.warn("API key validation failed");
        toasts.error("API key validation failed", { duration: 5_000 });
      }
      
      checkingValidity = false;
    }
  };
</script>

<div class="flex-grow flex items-center flex-col justify-center">
  <div class="mb-5">
    <div>Your user token is:</div>
    <div><code class="bg-gray-700 display-inline p-1 rounded">{$UserToken}</code></div>
    <div>Keep it in save place as it is the only way to login to your account.</div>
  </div>
  
  <div class="divider"/>
  <form class="mx-auto max-w-sm" on:submit={submit}>
    <input type="text" class="input input-bordered w-full mb-2" disabled={checkingValidity} bind:value={apiKeyInput}
           placeholder="Anthropic API Key <redacted>" />
    <button class="btn btn-primary w-full" disabled={checkingValidity || !apiKeyInput} type="submit">
      {#if checkingValidity}
        <div class="loading loading-sm" />
      {/if}
      Save
    </button>

  </form>
</div>
