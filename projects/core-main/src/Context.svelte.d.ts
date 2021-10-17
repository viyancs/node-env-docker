import { SvelteComponentTyped } from "svelte";
import { Writable } from "svelte/store";

type Props = {
	value?: any;
};
type Slots = {
	default: {};
};
export default class Context extends SvelteComponentTyped<
	Props,
	never,
	Slots
> {}

export const KEY: string;
export const get: <T>() => Writable<T>;
