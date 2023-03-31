type Profile = {
  id: number
  username: string
  profile_picture: string
  full_name: string
  photo_profile: string
}

type Product = {
  product_name: string
  price: number
  total_product: number
  rating: number
}

export interface FeedbackTypes {
  id: number
  parent_id: number
  user_id: number
  rating: number
  feedback: string
  discussion: string
  user: Profile
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

export interface HistoryType {
  id: number
  user_id: number
  total_product: number
  total_payment: number
  payment_status: string
  payment_link: string
  user: Profile
  product_id: number
  product: Product
  rating: number
}

export interface HistoryIDType {
  id?: number
  product_id?: number
  product?: Product
  total_product?: number
  rating?: number
}