export enum ComponentsRegistryErrorTypes {
	INVALID_ARGUMENTS = 'INVALID_ARGUMENTS',
	INITIALIZATION_ERROR = 'INITIALIZATION_ERROR',
	COMPONENT_LOADING_ERROR = 'COMPONENT_LOADING_ERROR',
}

export class ComponentsRegistryError extends Error {
	errorType: ComponentsRegistryErrorTypes

	constructor(message: string, errorType: ComponentsRegistryErrorTypes) {
		super(message)
		this.errorType = errorType
	}
}
