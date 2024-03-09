<script lang="ts">
	import "../../app.css";
	import { goto } from "$app/navigation";
	import { ApiKey, IsLoggedIn } from '$lib/stores/auth';

	$: if (!$IsLoggedIn) {
		goto("/auth");
	}
</script>

<div class="flex h-screen">
	<!-- content -->
	<div class="flex flex-col w-64 m-1 p-3 bg-base-300 rounded">
		<div class="mb-4">
			<span class="font-bold">Chats</span>
			<button class="ml-2 btn">new</button>
		</div>
		<button class="btn mb-2">chat 1</button>
		<button class="btn mb-2">chat 2</button>
		<div class="flex flex-col items-center mt-auto">
			<a class="cursor-pointer mt-2 font-light" href="/templates">Templates</a>
			<a class="cursor-pointer mt-2 font-extralight" on:click={() => ApiKey.set("")}>Change API Key</a>
		</div>
	</div>
	<div class="flex-1 flex flex-col m1 p-3">
		<slot/>
	</div>
</div>