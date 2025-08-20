export type EventType = {
  event_id: number
  provider: string
}

export type LauncheType = {
  launch_id: string
  provider: string
}

export type SocialsType = {
  x: string
  youtube: string
  instagram: string
  linkedin: string
  mastodon: string
  bluesky: string
}

export type AuthorType = {
  name: string
  socials: SocialsType
}
export type NewsType = {
  id: number
  title: string
  authors: AuthorType[]
  url: string
  image_url: string
  news_site: string
  summary: string
  published_at: string
  updated_at: string
  featured: boolean
  launches: LauncheType[]
  events: EventType[]
}
