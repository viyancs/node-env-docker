import { writable, Writable } from "svelte/store";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, getFirestore, Firestore } from "firebase/firestore";
import { User } from "../models";

export type AuthStore = {
	subscribe: Writable<FirebaseUser>["subscribe"];
	auth: Auth;
	app: FirebaseApp;
	db: Firestore;
	stateChanged: Promise<FirebaseUser>;
	profile: {
		subscribe: Writable<User>["subscribe"];
	};
};

export type FirebaseConfig = {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
};

export let store: AuthStore;

export const getStore: () => AuthStore;

const initializer: (config: FirebaseConfig) => AuthStore;

export default initializer;
