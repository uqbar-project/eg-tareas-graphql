export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  deleteTask?: Maybe<Scalars['ID']>;
  deleteUser?: Maybe<User>;
  updateTask?: Maybe<Task>;
  updateUser?: Maybe<User>;
};


export type MutationAddTaskArgs = {
  userId: Scalars['ID'];
  taskInput: TaskInput;
};


export type MutationCreateUserArgs = {
  createUserInput?: Maybe<CreateUserInput>;
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID'];
};


export type MutationUpdateTaskArgs = {
  taskId: Scalars['ID'];
  taskInput: TaskInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getListOfTasks?: Maybe<Array<Maybe<Task>>>;
  getListOfUsers?: Maybe<Array<Maybe<User>>>;
  getTasksOfUser?: Maybe<Array<Maybe<Task>>>;
};


export type QueryGetTasksOfUserArgs = {
  userId: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
};

export type TaskInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
};
