export interface Brewery {
  id: string
  name: string
  breweryType:
    | 'micro'
    | 'nano'
    | 'regional'
    | 'brewpub'
    | 'large'
    | 'planning'
    | 'bar'
    | 'contract'
    | 'proprietor'
    | 'closed'
  street: string
  address2?: string
  address3?: string
  city: string
  state: string
  countyProvince?: string
  postalCode: string
  country: string
  longitude?: string
  latitude?: string
  phone: string
  websiteUrl: string
  updatedAt: string
  createdAt: string
}
