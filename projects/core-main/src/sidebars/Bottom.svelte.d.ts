import { SvelteComponentTyped } from "svelte";
import { Writable } from "svelte/store";

type Props = {
	isCalendarModalOpen?: boolean;
	url?: string;
	right?: number
};

type Slots = {
	default: {};
};

export default class Bottom extends SvelteComponentTyped<Props, never, Slots> {}
