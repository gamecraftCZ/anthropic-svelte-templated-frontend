<script lang="ts">
	import "../../app.css";
	import { goto } from "$app/navigation";
	import { IsLoggedIn } from "$lib/stores/auth";

	$: if ($IsLoggedIn) {
		goto("/");
	}
</script>

<div class="flex flex-col h-screen">
	<!-- content -->
	<div class="flex grow flex-col justify-center px-6 py-12 lg:px-8">
		<slot />
	</div>
</div>
