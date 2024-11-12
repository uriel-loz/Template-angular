export interface Campaigns {
    id:                      number;
    campaign_name:           string;
    version:                 string;
    temporality?:             string;
    start_date?:              Date;
    end_date?:                Date;
}