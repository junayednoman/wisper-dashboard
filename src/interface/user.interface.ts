export interface TUserProfile {
  coverPhoto: any
  _id: string
  name: string
  email: string
  photoUrl: string
  bio: string
  address: any
  scores: number
  status: string
  id: string
  createdAt: string
  avgRating: number
}

export type TUserCharts = TUserChart[]

export interface TUserChart {
  month: string
  amount: number
}