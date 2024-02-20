<script >
    // TODO move this component to the library
    // TODO handle pipeline config differently
	export let config;

	const data = config ? Object.entries(config).sort(([ka], [kb]) => ka.localeCompare(kb)) : [];
</script>

{#if config}
	<table>
		<tbody>
			{#each data as [k, v]}
				<tr>
					<td class="table-cell-fit">{k}</td>
					<td class="overflow-x-scroll"><code>{JSON.stringify(v, null, 2)}</code></td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

