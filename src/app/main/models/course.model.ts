export interface Course {
	id: number;
	title: string;
	description: string;
	date: number;
	ratings: number[];
	adminId: number;
	favouritedBy: number[];
}
