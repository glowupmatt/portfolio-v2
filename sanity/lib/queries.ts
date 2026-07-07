import type { PageData, Walkthrough, Breakdown } from './types'
import { client } from './client'

const PAGE_QUERY = `{
  "settings": *[_type == "siteSettings"][0] {
    ...,
    resume { asset->{ url } }
  },
  "about": *[_type == "about"][0] {
    ...,
    portrait {
      asset->{ url, metadata { lqip } },
      hotspot,
      crop
    }
  },
  "projects": *[_type == "project"] | order(order asc) {
    ...,
    image {
      asset->{ url, metadata { lqip } },
      hotspot,
      crop
    }
  },
  "techStack": *[_type == "techStack"][0].tools,
  "walkthroughs": *[_type == "walkthrough"] | order(order asc)
}`

export async function getWalkthroughs(): Promise<Walkthrough[]> {
  const data = await client.fetch<Walkthrough[]>(
    `*[_type == "walkthrough"] | order(order asc)`,
    {},
    { next: { revalidate: 60 } }
  )
  return data ?? []
}

export async function getBreakdowns(): Promise<Breakdown[]> {
  const data = await client.fetch<Breakdown[]>(
    `*[_type == "breakdown"] | order(order asc) { _id, order, title, slug, challenge, role, tools, heroImage { asset->{ url, metadata { lqip } }, hotspot, crop } }`,
    {},
    { next: { revalidate: 60 } }
  )
  return data ?? []
}

export async function getBreakdown(slug: string): Promise<Breakdown | null> {
  return client.fetch<Breakdown | null>(
    `*[_type == "breakdown" && slug.current == $slug][0] {
      ...,
      heroImage { asset->{ url, metadata { lqip } }, hotspot, crop },
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url, metadata { lqip, dimensions { width, height } } }
        }
      }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

export async function getPageData(): Promise<PageData> {
  const data = await client.fetch<PageData>(
    PAGE_QUERY,
    {},
    { next: { revalidate: 60 } }
  )

  return {
    settings:     data?.settings     ?? null,
    about:        data?.about        ?? null,
    projects:     data?.projects     ?? [],
    techStack:    data?.techStack    ?? [],
    walkthroughs: data?.walkthroughs ?? [],
  }
}
