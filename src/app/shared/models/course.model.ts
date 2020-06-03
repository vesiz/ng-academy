export interface Course {
	id: number;
	title: string;
	description: string;
	coverImage: string;
	date?: number;
	ratings?: number[];
	adminId?: number;
	favouritedBy?: number[];
}
