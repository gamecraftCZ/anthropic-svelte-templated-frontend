<script>
	import { FlatToast, ToastContainer } from 'svelte-toasts';
</script>

<ToastContainer placement="top-right" let:data={data}>
	<FlatToast {data} /> <!-- Provider template for your toasts -->
</ToastContainer>

<slot />
