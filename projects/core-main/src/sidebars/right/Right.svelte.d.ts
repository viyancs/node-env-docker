import { SvelteComponentTyped } from "svelte";

type Props = {
	value?: number;
};
type Slots = {
	default: {};
};

export default class Right extends SvelteComponentTyped<Props, never, Slots> {}
