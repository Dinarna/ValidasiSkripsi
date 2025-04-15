interface Topic {
    context: string;
    keyword: string;
    projectId: string;
    topicId: number;
    words: [];
}

interface TweetTopic {
    full_text: string;
    tweet_url: string;
    username: string;
}

export type { Topic, TweetTopic };