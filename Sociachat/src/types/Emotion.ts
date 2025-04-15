interface Emotion {
  emotion: TEmotion[];
  emotion_percentage?: EmotionPercentage;
  emotion_percentage_by_topic?: EmotionPercentage;
  total_data: number;
}

interface TEmotion {
  _id: string;
  conversation_id_str: string;
  full_text: string;
  id_str: string;
  in_reply_to_screen_name?: string;
  predicted_emotions_cnn: string;
  predicted_emotions_bilstm: string;
  predicted_emotions_bilstm_probability: EmotionProbability;
  predicted_emotions_cnn_probability: EmotionProbability;
  processed_text: string;
  projectId: string;
  topic: string;
  tweet_url: string;
}

interface EmotionPercentage {
  Anger: number;
  Fear: number;
  Joy: number;
  Love: number;
  Neutral: number;
  Sad: number;
}

interface EmotionProbability {
  Anger: number;
  Fear: number;
  Joy: number;
  Love: number;
  Neutral: number;
  Sad: number;
}

export type { Emotion, TEmotion, EmotionPercentage };
