import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface Job {
    jobID: Scalars['ID']
    nom: Scalars['String']
    __typename: 'Job'
}

export interface Mutation {
    createJob: Job
    __typename: 'Mutation'
}

export interface Query {
    job: Job
    jobs: Job[]
    __typename: 'Query'
}

export interface JobRequest{
    jobID?: boolean | number
    nom?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    createJob?: [{nom: Scalars['String']},JobRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    job?: [{jobID: Scalars['String']},JobRequest]
    jobs?: JobRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Job_possibleTypes: string[] = ['Job']
export const isJob = (obj?: { __typename?: any } | null): obj is Job => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isJob"')
  return Job_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}


export interface JobPromiseChain{
    jobID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    nom: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface JobObservableChain{
    jobID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    nom: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface MutationPromiseChain{
    createJob: ((args: {nom: Scalars['String']}) => JobPromiseChain & {get: <R extends JobRequest>(request: R, defaultValue?: FieldsSelection<Job, R>) => Promise<FieldsSelection<Job, R>>})
}

export interface MutationObservableChain{
    createJob: ((args: {nom: Scalars['String']}) => JobObservableChain & {get: <R extends JobRequest>(request: R, defaultValue?: FieldsSelection<Job, R>) => Observable<FieldsSelection<Job, R>>})
}

export interface QueryPromiseChain{
    job: ((args: {jobID: Scalars['String']}) => JobPromiseChain & {get: <R extends JobRequest>(request: R, defaultValue?: FieldsSelection<Job, R>) => Promise<FieldsSelection<Job, R>>}),
    jobs: ({get: <R extends JobRequest>(request: R, defaultValue?: FieldsSelection<Job, R>[]) => Promise<FieldsSelection<Job, R>[]>})
}

export interface QueryObservableChain{
    job: ((args: {jobID: Scalars['String']}) => JobObservableChain & {get: <R extends JobRequest>(request: R, defaultValue?: FieldsSelection<Job, R>) => Observable<FieldsSelection<Job, R>>}),
    jobs: ({get: <R extends JobRequest>(request: R, defaultValue?: FieldsSelection<Job, R>[]) => Observable<FieldsSelection<Job, R>[]>})
}