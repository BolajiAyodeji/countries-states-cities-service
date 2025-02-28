import countries from '#data/countries.json'
import { dataFiltered } from './utils'

export type Translations =
  | 'kr'
  | 'br'
  | 'pt'
  | 'nl'
  | 'hr'
  | 'fa'
  | 'de'
  | 'es'
  | 'fr'
  | 'ja'
  | 'it'
  | 'cn'

type Countries = {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: string
  capital: string
  currency: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  subregion: string
  timezones: {
    zoneName: string
    gmtOffset: number
    gmtOffsetName: string
    abbreviation: string
    tzName: string
  }[]
  translations: Record<Translations, string>
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
}[]

type Args = {
  filters?:
    | {
        iso2: string
        iso3?: never
      }
    | {
        iso2?: never
        iso3: string
      }
  locale?: Translations
}

export function getCountries(args?: Args): Countries {
  let data = [...(countries as Countries)]
  if (args?.filters !== undefined) {
    const { filters } = args
    data = dataFiltered(data, filters as any)
  }
  if (args?.locale !== undefined) {
    const { locale } = args
    data = data.map((item) => {
      const newItem = { ...item }
      const name = newItem.translations?.[locale]
      if (name) newItem.name = name
      return newItem
    })
  }
  return data
}

export default {
  getCountries,
}
