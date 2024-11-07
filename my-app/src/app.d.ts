// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface Activity {
	Activity: string
	Location: string
	Category: string
	LowEstimatedCost: number
	MediumEstimatedCost: number
	HighEstimatedCost: number
	Notes: string
}

interface Item {
	Activity: string
	StartTime: Date
	EndTime: Date
	LowEstimatedCost: number
	MediumEstimatedCost: number
	HighEstimatedCost: number
}