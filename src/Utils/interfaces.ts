export interface ResponseRepository<T = unknown> {
  error: boolean
  message?: string
  response?: T
  status?: number
}
