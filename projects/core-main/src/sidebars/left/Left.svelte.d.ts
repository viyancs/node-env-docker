import { SvelteComponentTyped } from "svelte";

type Props = {
	marginLeft?: number;
	isOpen?: boolean;
};
type Slots = {
	default: {};
};

export default class Left extends SvelteComponentTyped<Props, never, Slots> {}
