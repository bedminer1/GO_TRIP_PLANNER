<script lang="ts">
	let count = $state(0)
	let double = $derived(count * 2)
</script>

<div class="flex flex-col justify-center items-center h-screen">
	<a href="/bucket">bucket</a>
	<a href="/itinerary">itinerary</a>
</div>
