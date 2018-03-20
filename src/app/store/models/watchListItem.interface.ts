export interface IWatchlistItem {
  condition: string;
  condition_name: string;
  date_created: string;
  date_updated: any;
  id: string;
  name: string;
  notify_price: string;
  status: string;
  user_id: string;
  watchlist_name: string;
  current_price?: any;
  price_change_percent?: any;
}
