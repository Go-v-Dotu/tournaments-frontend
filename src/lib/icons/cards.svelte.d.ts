import { SvelteComponentTyped } from 'svelte';
import type { IconProps } from 'lucide-svelte';
declare const __propDef: {
	props: IconProps;
	events: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		default: {};
	};
};
export type CardsProps = typeof __propDef.props;
export type CardsEvents = typeof __propDef.events;
export type CardsSlots = typeof __propDef.slots;

export default class Cards extends SvelteComponentTyped<CardsProps, CardsEvents, CardsSlots> {}
export {};
