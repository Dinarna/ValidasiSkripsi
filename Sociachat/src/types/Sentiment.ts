interface Sentiment {
  sentiment: TSentiment[];
  sentiment_percentage?: SentimentPercentage;
  sentiment_percentage_by_topic?: SentimentPercentage;
  total_data: number;
}

interface TSentiment {
  _id: string;
  conversation_id_str: string;
  full_text: string;
  id_str: string;
  in_reply_to_screen_name?: string;
  predicted_sentiment_cnn: string;
  predicted_sentiment_cnn_lstm: string;
  predicted_sentiment_cnn_lstm_probability: number;
  predicted_sentiment_cnn_probability: number;
  processed_text: string;
  project_id: string;
  topic: string;
  tweet_url: string;
}

interface SentimentPercentage {
  negative: number;
  positive: number;
}

export type { Sentiment, TSentiment, SentimentPercentage };
