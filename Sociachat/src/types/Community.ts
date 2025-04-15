interface Community {
    links: CommunityLink[];
    nodes: CommunityNode[];
}

interface CommunityLink {
    full_text: string;
    source: string;
    source_community: number,
    target: string;
    target_community: number,
    topic: string;
    url_tweet: string;
}

interface CommunityNode  {
    community: number;
    id: string;
    name: string;
    profile_url: string;
    val: number;
}

export type { Community, CommunityLink, CommunityNode };