export type LoginProps = {
	username: string;
	password: string;
};

export enum SchemaType {
	STRING = 'string',
	NUMBER = 'number'
}

export type UserResponse = {
	id: number;
	username: string;
};

export type Schema<T extends string = string> = Record<T, FieldSchema>;
export type FieldSchema = {
	type: SchemaType;
	nullable: boolean;
	isArray: boolean;
	isReadonly: boolean;
};

export type BasicResponse<T> = {
	code: number;
	status: string;
	data: T;
};

export type Project = {
	id: number;
	name: string;
	description: string;
	href?: string;
	img: string;
	githubUrl?: string;
	imgFileId: number;
};

export type ProjectResponse = BasicResponse<Project[]>;
