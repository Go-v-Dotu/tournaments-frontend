<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import RotateCW from 'lucide-svelte/icons/rotate-cw';

	import {
		superForm,
		type SuperValidated,
		type Infer,
		type FormResult
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import type { Player, PlayerId } from 'domain/tournament_management';
	import { addGuestPlayerFormSchema } from '$lib/forms/tournament_management';
	import Timing from '$lib/timing';
	import type { ActionData } from './$types';

	export let addGuestPlayerForm: SuperValidated<Infer<typeof addGuestPlayerFormSchema>>;

	export let actionPath: string;

	export let onGuestAdded: (player: Player) => void;

	let dialogOpened = false;

	let isSubmitting: boolean = false;
	const form = superForm(addGuestPlayerForm, {
		id: Math.random().toString(36).slice(2, 7),
		validators: zodClient(addGuestPlayerFormSchema),
		onSubmit: () => {
			isSubmitting = true;
		},

		onUpdate: async ({ form, result }) => {
			await new Promise((r) =>
				setTimeout(() => {
					isSubmitting = false;
					r(true);
				}, Timing.SignInFormSubmitUX)
			);
			if (!form.valid) return;

			const action = result.data as FormResult<ActionData>;
			if (action.playerId)
				onGuestAdded({
					userId: undefined,
					playerId: action.playerId,
					username: form.data.username,
					dropped: false
				});
		},
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				dialogOpened = false;
			}
		}
	});

	const { form: formData, enhance, errors } = form;
</script>

<Dialog.Root bind:open={dialogOpened}>
	<Dialog.Trigger
		class={buttonVariants({ variant: 'outline' })}
		asChild
		let:builder={modalTriggerBuilder}
	>
		<slot {modalTriggerBuilder} />
	</Dialog.Trigger>
	<Dialog.Content class="border border-card-foreground bg-muted">
		<div class="flex h-full flex-col overflow-hidden">
			<Dialog.Header>
				<Dialog.Title class="text-2xl">Add Guest</Dialog.Title>
				<Dialog.Description>Enter Guest details below</Dialog.Description>
			</Dialog.Header>
			<form
				method="POST"
				use:enhance
				action={actionPath}
				class="my-2 flex flex-1 flex-col overflow-hidden"
			>
				<div class="overflow-auto px-4">
					<Form.Field {form} name="username">
						<Form.Control let:attrs>
							<Form.Label>Username</Form.Label>
							<Input {...attrs} bind:value={$formData.username} class="border border-foreground" />
						</Form.Control>
						<Form.Description>This is temporary username of a guest.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
					<div class="flex justify-end py-2">
						{#each $errors._errors || [] as error}
							<p class="text-sm font-medium text-destructive">{error}</p>
						{/each}
					</div>
				</div>
				<Form.Button disabled={isSubmitting} class="w-full">
					{#if isSubmitting}
						<RotateCW class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Add
				</Form.Button>
			</form>
		</div>
	</Dialog.Content>
</Dialog.Root>
