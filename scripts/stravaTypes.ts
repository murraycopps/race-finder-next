interface StatsSection {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
};
interface RecentRunsSection extends StatsSection {
    achievement_count: number;
};
type Stats = {
    recent_run_totals: RecentRunsSection;
    all_run_totals: StatsSection;
    ytd_run_totals: StatsSection;
};

interface Athlete {
    id: number;
    username: string;
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    sex: "M" | "F" | null;
    summit: boolean;
    created_at: string;
    updated_at: string;
    badge_type_id: number;
    weight: number;
    profile_medium: string;
    profile: string;
    friend: boolean | null;
    follower: boolean | null;
    blocked: boolean;
    can_follow: boolean;
    follower_count: number;
    friend_count: number;
    mutual_friend_count: number;
    athlete_type: number;
    date_preference: string;
    measurement_preference: string;
    clubs: Club[];
    ftp: number | null;
    shoes: Shoe[];
}

interface Club {
    id: number;
    resource_state: number;
    name: string;
    profile_medium: string;
    profile: string;
    cover_photo: string | null;
    cover_photo_small: string | null;
    activity_types: string[];
    activity_types_icon: string;
    dimensions: string[];
    sport_type: string;
    city: string;
    state: string;
    country: string;
    private: boolean;
    member_count: number;
    featured: boolean;
    verified: boolean;
    url: string;
    membership: string;
    admin: boolean;
    owner: boolean;
}

type Shoe = {
    id: string;
    primary: boolean;
    name: string;
    nickname: string | null;
    resource_state: number;
    retired: boolean;
    distance: number;
    converted_distance: number;
}

type Map = {
    id: string;
    polyline?: string;
    summary_polyline: string;
    resource_state: number;
};
type Run = {
    resource_state: number;
    athlete: {
        id: number;
        resource_state: number;
    };
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    workout_type: number;
    id: number;
    start_date: string;
    start_date_local: string;
    timezone: string;
    utc_offset: number;
    location_city: null;
    location_state: null;
    location_country: null;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: Map;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    visibility: string;
    flagged: boolean;
    gear_id: string;
    start_latlng: [number, number];
    end_latlng: [number, number];
    average_speed: number;
    max_speed: number;
    average_cadence: number;
    has_heartrate: boolean;
    average_heartrate: number;
    max_heartrate: number;
    heartrate_opt_out: boolean;
    display_hide_heartrate_option: boolean;
    elev_high: number;
    elev_low: number;
    upload_id: number;
    upload_id_str: string;
    external_id: string;
    from_accepted_tag: boolean;
    pr_count: number;
    total_photo_count: number;
    has_kudoed: boolean;
};

export type { Stats, RecentRunsSection, StatsSection, Athlete, Club, Shoe, Run, Map }