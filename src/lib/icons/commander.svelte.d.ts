import { SvelteComponentTyped } from "svelte";
import type {IconProps} from 'lucide-svelte'
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
export type CommanderProps = typeof __propDef.props;
export type CommanderEvents = typeof __propDef.events;
export type CommanderSlots = typeof __propDef.slots;

export default class Commander extends SvelteComponentTyped<CommanderProps, CommanderEvents, CommanderSlots> {
}
export {};
