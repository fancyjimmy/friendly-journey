import { type Writable, writable } from 'svelte/store';

export const protocolId: Writable<number> = writable();
