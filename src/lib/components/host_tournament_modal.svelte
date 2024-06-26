<script lang="ts">
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';

	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import RotateCW from 'lucide-svelte/icons/rotate-cw';

	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { hostTournamentFormSchema } from '$lib/forms/tournament';
	import Timing from '$lib/timing';

	import AdvancedCalendar from './advanced_calendar.svelte';

	export let hostTournamentForm: SuperValidated<Infer<typeof hostTournamentFormSchema>>;

	export let actionPath: string;

	let isSubmitting: boolean = false;
	const form = superForm(hostTournamentForm, {
		id: 'host',
		validators: zodClient(hostTournamentFormSchema),
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

	let dialogOpened = false;

	let value: DateValue | undefined;

	$: value = $formData.date ? parseDate($formData.date) : undefined;

	let placeholder: DateValue = today(getLocalTimeZone());
</script>

<Dialog.Root bind:open={dialogOpened}>
	<Dialog.Trigger
		class={buttonVariants({ variant: 'outline' })}
		asChild
		let:builder={modalTriggerBuilder}
	>
		<slot {modalTriggerBuilder} />
	</Dialog.Trigger>
	<Dialog.Content class="h-5/6 border border-card-foreground bg-muted">
		<div class="flex flex-col">
			<Dialog.Header>
				<Dialog.Title class="text-2xl">Host Tournament</Dialog.Title>
				<Dialog.Description>Enter tournament details below</Dialog.Description>
			</Dialog.Header>
			<form
				method="POST"
				use:enhance
				action={actionPath}
				id="{actionPath}hostTournament"
				class="my-2"
			>
				<Form.Field {form} name="title">
					<Form.Control let:attrs>
						<Form.Label>Title</Form.Label>
						<Input {...attrs} bind:value={$formData.title} class="border border-foreground" />
					</Form.Control>
					<Form.Description>This is public name of tournament</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="date" class="py-4">
					<Form.Control let:attrs>
						<Form.Label>Date</Form.Label>
						<div class="flex justify-start">
							<AdvancedCalendar
								{value}
								bind:placeholder
								minValue={new CalendarDate(1900, 1, 1)}
								maxValue={today(getLocalTimeZone())}
								calendarLabel="Tournament Date"
								initialFocus
								onValueChange={(v) => {
									if (v) {
										$formData.date = v.toString();
									} else {
										$formData.date = '';
									}
								}}
							/>
						</div>

						<input hidden value={$formData.date} name={attrs.name} />
					</Form.Control>
					<Form.Description>This is the date when the tournament will take place.</Form.Description>

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
					Host
				</Form.Button>
			</form>
		</div>
	</Dialog.Content>
</Dialog.Root>
