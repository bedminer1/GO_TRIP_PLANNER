<script lang="ts">
    import { superForm } from 'sveltekit-superforms'
	import { Paginator, getToastStore } from '@skeletonlabs/skeleton'

    export let data

    const { form, errors, message } = superForm(data.form)

    // paginator logic
	const source = [...data.records]
	let paginationSettings = {
		page: 0,
		limit: 5,
		size: source.length,
		amounts: [5,10,30],
	}
	$: paginatedSource = source.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	)
</script>

<div class="flex flex-col justify-center items-center h-screen">
    <form class="w-1/4 flex flex-col mb-10 justify-center items-center gap-3" action="?/saveRecord" method="POST">
        <div class="flex flex-col w-full">
            {#if $errors.Activity}<span class="invalid italic m-0 p-0 text-xs text-error-400 ml-2 w-full">{$errors.Activity}</span>{/if}
            <input name="Activity" type="text" bind:value={$form.Activity} class="input mt-0" placeholder="Activity">
        </div>
        
        <div class="flex flex-col w-full">
            {#if $errors.Location}<span class="invalid italic m-0 p-0 text-xs text-error-400 ml-2 w-full">{$errors.Location}</span>{/if}
            <input name="Location" type="text" bind:value={$form.Location} class="input mt-0" placeholder="Location">
        </div>

        <div class="flex flex-col w-full">
            {#if $errors.Category}<span class="invalid italic m-0 p-0 text-xs text-error-400 ml-2 w-full">{$errors.Category}</span>{/if}
            <input name="Category" type="text" bind:value={$form.Category} class="input mt-0" placeholder="Category">
        </div>

        <div class="flex flex-col w-full">
            {#if $errors.LowEstimatedCost}<span class="invalid italic m-0 p-0 text-xs text-error-400 ml-2 w-full">{$errors.LowEstimatedCost}</span>{/if}
            <input name="LowEstimatedCost" type="text" bind:value={$form.LowEstimatedCost} class="input mt-0" placeholder="Low Estimated Cost">
        </div>

        <div class="flex flex-col w-full">
            {#if $errors.MediumEstimatedCost}<span class="invalid italic m-0 p-0 text-xs text-error-400 ml-2 w-full">{$errors.MediumEstimatedCost}</span>{/if}
            <input name="MediumEstimatedCost" type="text" bind:value={$form.MediumEstimatedCost} class="input mt-0" placeholder="Medium Estimated Cost">
        </div>

        <div class="flex flex-col w-full">
            {#if $errors.HighEstimatedCost}<span class="invalid italic m-0 p-0 text-xs text-error-400 ml-2 w-full">{$errors.HighEstimatedCost}</span>{/if}
            <input name="HighEstimatedCost" type="text" bind:value={$form.HighEstimatedCost} class="input mt-0" placeholder="High Estimated Cost">
        </div>

        <div class="flex flex-col w-full">
            {#if $errors.Notes}<span class="invalid italic m-0 p-0 text-xs text-error-400 ml-2 w-full">{$errors.Notes}</span>{/if}
            <input name="Notes" type="text" bind:value={$form.Notes} class="input mt-0" placeholder="Notes">
        </div>

        <button class="btn variant-ghost-primary w-1/2 rounded-md mt-4 text-wheat-500">Save Activity</button>
    </form>

<!-- TABLE -->
<div class="table-container w-1/2">
	<table class="table table-hover mb-4">
		<thead>
			<tr>
				<th>Activity</th>
				<th>Location</th>
				<th>Catergory</th>
				<th>Estimated Cost</th>
				<th>Notes</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedSource as record, i}
				<tr>
					<td class="text-center">{record.Activity}</td>
					<td class="text-center">{record.Location}</td>
					<td class="text-center">{record.Category}</td>
					<td class="text-center">{record.MediumEstimatedCost}</td>
					<td class="text-center">{record.Notes}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<Paginator
		bind:settings={paginationSettings}
		showFirstLastButtons="{false}"
		showPreviousNextButtons="{true}"
		amountText="Records"
	/>

	<p class="w-full text-right underline italic mt-4"><a href="/stats">see stats?</a></p>
</div>
</div>