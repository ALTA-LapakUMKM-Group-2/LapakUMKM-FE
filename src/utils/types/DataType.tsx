type Profile = {
  id: number
  username: string
  full_name: string
  photo_profile: string
}

type Product = {
  product_name: string
  price: number
  total_product: number
  rating: number
  image: string
  size: string
}

type Child = {
  id: number
  parent_id: number
  user_id: number
  discussion: string
  user: Profile
}

export interface Chat {
  id: number
  room_id: string
  sender_id: number
  recipient_id: number
  recipient: Profile
  text: string
}

export interface FeedbackTypes {
  id: number
  parent_id: number
  user_id: number
  rating: number
  feedback: string
  discussion: string
  user: Profile
  childs: Child[]
}

export interface DataType {
  id: number
  category_id: number
  product_name: string
  product_transaction_id: number
  description: string
  size: string
  price: number
  stock_remaining: number
  stock_sold: number
}

export interface HistoryType {
  id: any
  user_id: number
  total_product: number
  product_transaction_id: number
  total_payment: number
  payment_status: string
  payment_link: string
  user: Profile
  product_id: number
  product: Product
  rating: number
  product_image: string
  shop_name: string
  size: string
  product_name: string
}

export interface HistoryIDType {
  id?: number
  product_id?: number
  product?: Product
  total_product?: number
  rating?: number
}