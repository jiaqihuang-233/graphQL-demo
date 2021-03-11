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
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  game: Game;
  getAllGames: Array<Game>;
  user: User;
  review: Review;
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryReviewArgs = {
  gameId: Scalars['ID'];
  reviewerId: Scalars['ID'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['ID'];
  title: Scalars['String'];
  price: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  reviews: Array<Review>;
  averageRating?: Maybe<Scalars['Float']>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  game: Game;
  rating: Scalars['Int'];
  comment: Scalars['String'];
  reviewer: User;
  dateCreated: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  reviews: Array<Review>;
};


export type Mutation = {
  __typename?: 'Mutation';
  addGame: Game;
  editGame: Game;
  addUser: User;
  addReview: Review;
};


export type MutationAddGameArgs = {
  input: NewGameInput;
};


export type MutationEditGameArgs = {
  input: EditGameInput;
};


export type MutationAddUserArgs = {
  input: NewUserInput;
};


export type MutationAddReviewArgs = {
  input: NewReviewInput;
};

export type NewGameInput = {
  title: Scalars['String'];
  price: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
};

export type EditGameInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
};

export type NewUserInput = {
  name: Scalars['String'];
};

export type NewReviewInput = {
  gameId: Scalars['ID'];
  reviewerId: Scalars['ID'];
  rating: Scalars['Int'];
  comment: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newReviewAdded: Review;
};


export type SubscriptionNewReviewAddedArgs = {
  subscribedGameIds: Array<Scalars['ID']>;
};
