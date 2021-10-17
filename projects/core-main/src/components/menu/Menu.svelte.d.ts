import { SvelteComponentTyped } from "svelte";
import { Writable } from "svelte/store";

type Props = {
	class?: string;
};
type Slots = {
	default: {};
};
export default class Menu extends SvelteComponentTyped<Props, never, Slots> {}

export const get: () => Writable<string>;
