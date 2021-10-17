import { SvelteComponentTyped } from "svelte";
import { Writable } from "svelte/store";

type Props = {};
type Slots = {
	default: {};
};
export default class Spinner extends SvelteComponentTyped<
	Props,
	never,
	Slots
> {}
