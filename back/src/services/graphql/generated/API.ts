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


export type CreateTaskInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  priority: Scalars['Int'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  picture: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  deleteTask?: Maybe<Task>;
  deleteUser?: Maybe<User>;
  loginUser?: Maybe<User>;
  updateTask?: Maybe<Task>;
  updateUser?: Maybe<User>;
};


export type MutationAddTaskArgs = {
  userId: Scalars['ID'];
  createTaskInput: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID'];
};


export type MutationLoginUserArgs = {
  userCredentialsInput: UserCredentialsInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getListOfTasks?: Maybe<Array<Maybe<Task>>>;
  getListOfUsers?: Maybe<Array<Maybe<User>>>;
  getTask?: Maybe<Task>;
  getUser?: Maybe<User>;
};


export type QueryGetTaskArgs = {
  taskId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  userId: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
};

export type UpdateTaskInput = {
  _id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  picture: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
};

export type UserCredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};
