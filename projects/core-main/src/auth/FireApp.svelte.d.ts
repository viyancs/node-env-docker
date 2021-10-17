import { SvelteComponentTyped } from "svelte";
import { Writable } from "svelte/store";
import { Auth, User } from "firebase/auth";

type Props = {};
type Slots = {
	default: {
		auth?: Auth;
		currentUser?: User;
	};
};

export default class FireApp extends SvelteComponentTyped<
	Props,
	never,
	Slots
> {}

export const get: () => Writable<{
	[string]: any;
	auth: Auth;
}>;
