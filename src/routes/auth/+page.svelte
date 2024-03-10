<script lang="ts">
  import { UserToken, checkApiKeyValidity } from "$lib/stores/auth";
  import { toasts } from "svelte-toasts";
  import { v4 as uuidv4 } from "uuid";
  import { goto } from "$app/navigation";
  import { updateUser } from "$lib/api/updateUser";
  import { getUserInfo } from "$lib/api/getUserInfo";
  import { ChatsListValid } from "$lib/stores/invalidations";

  let loading = false;
  
  let userToken = "";

  const login = async () => {
    if (userToken) {
      if ((await getUserInfo({ token: userToken })).success) {
        UserToken.set(userToken);
        ChatsListValid.set(false);
        toasts.success("Login successful", { duration: 5_000 });
      } else {
        toasts.error("Invalid Login token", { duration: 5_000 });
      }
    }
  };

  const register = async () => {
    const newToken = uuidv4();
    loading = true;
    
    if ((await updateUser({ apiKey: "", token: newToken })).success) {
      toasts.success("Registration successful", { duration: 5_000 });
      UserToken.set(newToken);
      ChatsListValid.set(false);
      setTimeout(() => goto("/settings"), 10);

    } else {
      console.warn("Registration failed");
      toasts.error("Registration failed", { duration: 5_000 });
    }

  };
</script>

{#if loading}
  <div class="loading loading-sm" />
{:else}
  <div class="flex-grow flex items-center flex-col justify-center">
    <form class="mx-auto max-w-sm" on:submit={login}>
      <input type="text" class="input input-bordered w-full mb-2" bind:value={userToken} placeholder="Login Token" />
      <button class="btn btn-primary w-full" type="submit">
        Login
      </button>
    </form>
    <button class="link mt-2" on:click={register}>New account</button>
  </div>
{/if}
