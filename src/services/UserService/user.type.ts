export interface User {
  id: number
  name: string
  age: number
  email: string
  photos: Photo[]
}

export interface Photo {
  id: number
  title: string
  url: string
}
