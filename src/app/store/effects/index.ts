import { AuthEffects } from "./auth.effects";

/**
 * Add all effects into an array of effects, and export this array.
 * This aids the addition of the side effects to our root module without unnecessarily bloating up the module code.
 *
 */
export const effects: any[] = [AuthEffects];

export * from "./auth.effects";
