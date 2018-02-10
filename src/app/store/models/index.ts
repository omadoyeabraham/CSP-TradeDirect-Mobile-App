/**
 * This file is used to export all models in the 'app/store/models' directory.
 * The advantage of this design decision is that we only need to import one file / module wherever models in this folder are required, thus limiting the number of import statements clogging other parts of the application (import noise)
 *
 */

export * from "./appState.interface";
export * from "./cashState.interface";
export * from "./fixedincomeState.interface";
export * from "./stockbrokingState.interface";
export * from "./userState.interface";
export * from "./authState.interface";
export * from "./errorState.interface";
