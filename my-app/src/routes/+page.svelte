<script lang="ts">
	let count = $state(0)
	let double = $derived(count * 2)
</script>

<div class="flex flex-col justify-center items-center h-screen">
	<div class="flex flex-col justify-center items-center w-1/3">
		<input type="number" class="input text-center w-24 mb-8" bind:value={count}>
		<p>DOUBLED: {double}</p>
	</div>
	
</div>
