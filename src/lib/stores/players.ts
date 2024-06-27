import { writable } from 'svelte/store';

import { type Player } from 'domain/tournament_management';

export const playersStore = writable<Player[]>([]);
