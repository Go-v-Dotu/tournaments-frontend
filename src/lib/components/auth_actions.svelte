<script lang="ts">
	import SignUpModal from '$lib/components/sign_up_modal.svelte';
	import SignInModal from '$lib/components/sign_in_modal.svelte';
	import { Button } from '$lib/components/ui/button';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { signInFormSchema, signUpFormSchema } from '$lib/forms/auth';

	export let signUpForm: SuperValidated<Infer<typeof signUpFormSchema>>;
	export let signInForm: SuperValidated<Infer<typeof signInFormSchema>>;

	let signUpDialogOpened: boolean = false;
</script>

<SignUpModal let:modalTriggerBuilder {signUpForm} dialogOpened={signUpDialogOpened}>
	<Button builders={[modalTriggerBuilder]}>Sign Up</Button>
</SignUpModal>
<SignInModal
	let:modalTriggerBuilder
	{signInForm}
	on:signupRequired={() => {
		signUpDialogOpened = true;
	}}
>
	<Button variant="secondary" class="border border-card-foreground" builders={[modalTriggerBuilder]}
		>Sign In</Button
	>
</SignInModal>
