export interface FeedbackTypes {
  id: number
  rating: number
  feedback: string
  discussion: string
  user: Profile[]
}

type Profile = {
  id: number
  username: string
  profile_picture: string
} 