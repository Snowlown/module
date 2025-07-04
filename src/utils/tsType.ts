export type StringRecord = Record<string, any>

export type StringValueKey<T extends StringRecord> = {
	[K in keyof T]: T[K] extends (string | null | undefined) ? K : never
}[keyof T];

export type ArrayValueKey<T extends StringRecord> = {
	[K in keyof T]: T[K] extends (Array<T> | null | undefined) ? K : never
}[keyof T];
