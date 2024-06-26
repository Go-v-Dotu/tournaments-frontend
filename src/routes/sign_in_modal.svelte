<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';

	import RotateCW from 'lucide-svelte/icons/rotate-cw';

	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { signInFormSchema } from '$lib/forms/auth';
	import Timing from '$lib/timing';

	export let signInForm: SuperValidated<Infer<typeof signInFormSchema>>;

	let isSubmitting: boolean = false;
	const form = superForm(signInForm, {
		validators: zodClient(signInFormSchema),
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
		}
	});

	const { form: formData, enhance, errors } = form;

	const dispatch = createEventDispatcher();
</script>

<Dialog.Root>
	<Dialog.Trigger
		class={buttonVariants({ variant: 'outline' })}
		asChild
		let:builder={modalTriggerBuilder}
	>
		<slot {modalTriggerBuilder} />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<div class="flex flex-col">
			<Dialog.Header>
				<Dialog.Title class="text-2xl">Sign In</Dialog.Title>
				<Dialog.Description>
					Enter your credentials below to create Tournaments account
				</Dialog.Description>
			</Dialog.Header>
			<form method="POST" use:enhance action="?/signUp">
				<Form.Field {form} name="username">
					<Form.Control let:attrs>
						<Form.Label>Username</Form.Label>
						<Input {...attrs} bind:value={$formData.username} />
					</Form.Control>
					<Form.Description>This is your public display name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password" class="py-4">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$formData.password} />
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
					Sign In
				</Form.Button>
			</form>
			<Dialog.Footer class="sm:flex-col sm:justify-center">
				<div class="text-s m mt-4 text-center">
					Don&apos;t have an account?
		// on clickdispatch('signupRequired', event.detail);
					
					<a href="" class="underline"> Sign up </a>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>
