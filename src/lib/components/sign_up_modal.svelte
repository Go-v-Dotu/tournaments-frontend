<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import RotateCW from 'lucide-svelte/icons/rotate-cw';

	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { signUpFormSchema } from '$lib/forms/auth';
	import Timing from '$lib/timing';

	export let signUpForm: SuperValidated<Infer<typeof signUpFormSchema>>;

	let isSubmitting: boolean = false;
	const form = superForm(signUpForm, {
		id: 'signUp',
		validators: zodClient(signUpFormSchema),
		onSubmit: () => {
			isSubmitting = true;
		},

		onUpdate: async ({ form, result }) => {
			await new Promise((r) =>
				setTimeout(() => {
					isSubmitting = false;
					r(true);
				}, Timing.SignUpFormSubmitUX)
			);
		}
	});

	const { form: formData, enhance, errors } = form;

	export let dialogOpened = false;
</script>

<Dialog.Root bind:open={dialogOpened}>
	<Dialog.Trigger
		class={buttonVariants({ variant: 'outline' })}
		asChild
		let:builder={modalTriggerBuilder}
	>
		<slot {modalTriggerBuilder} />
	</Dialog.Trigger>
	<Dialog.Content class="border border-card-foreground bg-muted w-5/6">
		<div class="flex flex-col">
			<Dialog.Header>
				<Dialog.Title class="text-2xl">Sign Up</Dialog.Title>
				<Dialog.Description>Enter your credentials below to create account</Dialog.Description>
			</Dialog.Header>
			<form method="POST" use:enhance action="/?/signUp" class="my-2">
				<Form.Field {form} name="username">
					<Form.Control let:attrs>
						<Form.Label>Username</Form.Label>
						<Input {...attrs} bind:value={$formData.username} class="border border-foreground" />
					</Form.Control>
					<Form.Description>This is your public display name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password" class="py-4">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input
							{...attrs}
							type="password"
							bind:value={$formData.password}
							class="border border-foreground"
						/>
					</Form.Control>
					<div class="flex items-center justify-between">
						<Form.Description>This is your password.</Form.Description>
						<a
							href="https://media.tenor.com/LsQ6gXZQE4sAAAAM/sad-cat-sad.gif"
							class=" text-sm underline"
						>
							Forgot your password?
						</a>
					</div>
					<Form.FieldErrors />
				</Form.Field>
				<div class="flex justify-end py-2">
					{#each $errors._errors || [] as error}
						<p class="text-sm font-medium text-destructive">{error}</p>
					{/each}
				</div>
				<Form.Button disabled={isSubmitting} class="w-full">
					{#if isSubmitting}
						<RotateCW class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Sign Up
				</Form.Button>
			</form>
		</div>
	</Dialog.Content>
</Dialog.Root>
