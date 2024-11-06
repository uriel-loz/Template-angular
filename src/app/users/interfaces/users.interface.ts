export interface Pagination {
    current_page:   number;
    data:           User[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface User {
    id:                number;
    name:              string;
    last_name:         string;
    email:             string;
    created_at:        Date;
    updated_at:        Date;
}


export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface Filter {
    [key: string]: number | string | boolean;
}