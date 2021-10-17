import { SvelteComponentTyped } from "svelte";

type Props = {
	chatUrl?: string;
};
type Slots = {
	default: {};
};
export default class PanelChat extends SvelteComponentTyped<
	Props,
	never,
	Slots
> {}
