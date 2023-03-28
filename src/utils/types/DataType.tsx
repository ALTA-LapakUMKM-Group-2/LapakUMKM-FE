export interface FeedbackTypes {
  id: number
  parent_id: number
  user_id: number
  rating: number
  feedback: string
  discussion: string
  user: Profile
}

type Profile = {
  id: number
  username: string
  profile_picture: string
  full_name: string
  photo_profile: string
}

export interface DataType {
  id: number
  category_id: number
  product_name: string
  description: string
  size: string
  price: number
  stock_remaining: number
  stock_sold: number
}