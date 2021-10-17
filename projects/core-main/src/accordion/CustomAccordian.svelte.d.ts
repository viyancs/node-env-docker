import { SvelteComponentTyped } from "svelte";

type Props = {
	title?: string
	style?: string
	isOpen?: boolean
};
type Slots = {
	default: {};
};

export default class CustomAccordian extends SvelteComponentTyped<Props, never, Slots> {}

