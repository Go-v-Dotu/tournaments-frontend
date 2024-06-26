<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';

	import { API_V1_PREFIX, HTTPMethod } from '$lib/constants';

	export let username: string;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-10 w-10 rounded-full">
			<Avatar.Root class="h-10 w-10">
				<Avatar.Fallback>{username.slice(0, 1)}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-base font-medium leading-none">{username}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item
				class="hover:cursor-pointer"
				on:click={() => {
					goto('/me');
				}}
			>
				My account
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			class="hover:cursor-pointer"
			on:click={async () => {
				const response = await fetch(`${API_V1_PREFIX}/sign-out`, { method: HTTPMethod.POST });
				await invalidateAll();
			}}
		>
			Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
