export interface IUser {
  id: string
  name: string
  first_name: string
  last_name: string
  email: string,
  number: string,
  profile_picture: string,
  created_at: string
  country: {
    country_name: string
  }
  country_name: string
}