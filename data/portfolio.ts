export type Media =
  | { id: string; type: 'image'; url: string; caption?: string; platform?: 'instagram'|'tiktok'|'other'; tags?: string[] }
  | { id: string; type: 'video'; url: string; poster?: string; caption?: string; platform?: 'instagram'|'tiktok'|'other'; tags?: string[] }
  | { id: string; type: 'embed'; url: string; caption?: string; platform?: 'instagram'|'tiktok'|'other'; tags?: string[] }

  export type Client = {
    id: string
    name: string
    avatar?: string
    instagram_url?: string
    tiktok_url?: string
    facebook_url?: string
    projects: { id: string; title: string; media: Media[] }[]
  }

export const clients: Client[] = [
  {
    id: 'c1', name: 'Client 1',
    instagram_url: '#', tiktok_url: '#', facebook_url: '#',
    projects: [
      { id: 'p1', title: 'Campanie IG', media: [
        { id:'m1', type:'image', url:'/og.jpg', caption:'Post imagine' },
        { id:'m2', type:'video', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster:'/og.jpg', caption:'Short video' }
      ] }
    ]
  },
  {
    id: 'c2', name: 'Client 2',
    instagram_url: '#',
    projects: [{ id:'p2', title:'TikTok', media: [
      { id:'m3', type:'video', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster:'/og.jpg', platform:'tiktok' }
    ]}]
  },
  {
    id: 'c3', name: 'Client 3',
    tiktok_url: '#', facebook_url: '#',
    projects: [{ id:'p3', title:'YouTube Shorts', media: [
      { id:'m4', type:'image', url:'/og.jpg', caption:'Teaser' },
      { id:'m5', type:'embed', url:'https://www.tiktok.com/embed/7221234567890123456', platform:'tiktok' }
    ]}]
  }
]