export interface ReviewStatisticsResponseInterface {
  statistics: ReviewStatistics;
  total: number;
}

export interface ReviewStatistics {
  positive: number;
  neutral: number;
  negative: number;
}
