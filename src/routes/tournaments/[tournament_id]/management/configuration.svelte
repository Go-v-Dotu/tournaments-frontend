<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { tick } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { browser } from '$app/environment';
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
	<Form.Field name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input placeholder="@shadcn" {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.Description>
			This is your public display name. It can be your real name or a pseudonym. You can only change
			this once every 30 days.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Select.Root>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a verified email to display" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="m@example.com" label="m@example.com" />
					<Select.Item value="m@google.com" label="m@google.com" />
					<Select.Item value="m@support.com" label="m@supporte.com" />
				</Select.Content>
			</Select.Root>
			<input hidden name={attrs.name} />
		</Form.Control>
		<Form.Description>
			You can manage verified email addresses in your <a href="/examples/forms">email settings</a>.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<div>
		<Form.Fieldset name="urls">
			<Form.Legend>URLs</Form.Legend>
		</Form.Fieldset>
		<Button type="button" variant="outline" size="sm" class="mt-2">Add URL</Button>
	</div>

	<Form.Button>Update profile</Form.Button>
</form>
