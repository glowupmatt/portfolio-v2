export interface SanityImageAsset {
  url:      string
  metadata: { lqip: string }
}

export interface SanityImage {
  asset:    SanityImageAsset
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?:    { top: number; bottom: number; left: number; right: number }
}

export interface SiteSettings {
  name:           string
  tagline:        string
  location:       string
  isOpenToWork:   boolean
  email:          string
  githubUrl:      string
  linkedInUrl:    string
  resume?:        { asset: { url: string } }
  editionLabel?:  string
  heroItalicLine?: string
  heroHeadline?:  string
}

export interface SkillArea {
  _key:  string
  label: string
  sub:   string
}

export interface About {
  introQuote:        string
  introAccentPhrase: string
  bioParagraph1:     string
  bioParagraph2:     string
  skillAreas:        SkillArea[]
  portrait?:         SanityImage
}

export interface Project {
  _id:         string
  order:       number
  no:          string
  kind:        string
  title:       string
  description: string
  tags:        string[]
  liveUrl:      string
  hasLiveSite?:        boolean
  codeUrl:             string
  hasBreakdownVideo?:  boolean
  image?:      SanityImage
}

export interface PortableTextBlock {
  _type: string
  _key:  string
  [key: string]: unknown
}

export interface SanityBodyImage {
  _type:    'image'
  _key:     string
  alt?:     string
  caption?: string
  asset?: {
    url:      string
    metadata?: {
      lqip?:       string
      dimensions?: { width: number; height: number }
    }
  }
}

export interface Breakdown {
  _id:        string
  order:      number
  title:      string
  slug:       { current: string }
  challenge?: string
  role?:      string
  tools?:     string[]
  heroImage?: SanityImage
  body?:      PortableTextBlock[]
}

export interface Walkthrough {
  _id:             string
  order:           number
  title:           string
  youtubeEmbedUrl: string
}

export interface PageData {
  settings:     SiteSettings | null
  about:        About        | null
  projects:     Project[]
  techStack:    string[]
  walkthroughs: Walkthrough[]
}
