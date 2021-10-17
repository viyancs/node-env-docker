import { SvelteComponentTyped } from "svelte";
import { Writable } from "svelte/store";
import "../../svelte-jsx";
type Props = {
	key?: string;
	img?: string;
};
type Slots = {
	default: {};
};

export default class Item extends SvelteComponentTyped<
	Props,
	{ click: svelte.JSX.MouseEventHandler<HTMLAnchorElement> },
	Slots
> {}
