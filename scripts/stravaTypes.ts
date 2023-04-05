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

type Split = {
    distance: number;
    elapsed_time: number;
    elevation_difference: number;
    moving_time: number;
    split: number;
    average_speed: number;
    average_grade_adjusted_speed: number;
    average_heartrate: number;
    pace_zone: number;
}

type SegmentEffort = {
    id: number;
    resource_state: number;
    name: string;
    activity: any;
    athlete: any;
    elapsed_time: number;
    moving_time: number;
    start_date: string;
    start_date_local: string;
    distance: number;
    start_index: number;
    end_index: number;
    average_cadence: number;
    device_watts: boolean;
    average_heartrate: number;
    max_heartrate: number;
    segment: any;
    pr_rank: number;
    achievements: any;
    hidden: boolean;
}

type Lap = {
    id: number;
    resource_state: number;
    name: string;
    activity: any;
    athlete: any;
    elapsed_time: number;
    moving_time: number;
    start_date: string;
    start_date_local: string;
    distance: number;
    start_index: number;
    end_index: number;
    total_elevation_gain: number;
    average_speed: number;
    max_speed: number;
    average_cadence: number;
    device_watts: boolean;
    average_heartrate: number;
    max_heartrate: number;
    lap_index: number;
    split: number;
    pace_zone: number;
}

type BestEffort = {
    id: number;
    resource_state: number;
    name: string;
    activity: object;
    athlete: object;
    elapsed_time: number;
    moving_time: number;
    start_date: string;
    start_date_local: string;
    distance: number;
    start_index: number;
    end_index: number;
    total_elevation_gain?: number;
    average_speed: number;
    max_speed?: number;
    average_cadence?: number;
    device_watts?: boolean;
    average_heartrate?: number;
    max_heartrate?: number;
    lap_index?: number;
    split?: number;
    pace_zone?: number;
    pr_rank?: number | null;
    achievements?: any[];
}


type DetailedRun = {
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
    location_city: string | null;
    location_state: string | null;
    location_country: string | null;
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
    description: string;
    calories: number;
    perceived_exertion: number | null;
    prefer_perceived_exertion: boolean;
    segment_efforts: SegmentEffort[];
    splits_metric: Split[];
    splits_standard: Split[];
    laps: Lap[];
    best_efforts: BestEffort[];
    gear: Shoe;
    photos: {
        primary: string | null;
        count: number;
    };
    stats_visibility: {
        type: string;
        visibility: string;
    }[];
    hide_from_home: boolean;
    device_name: string;
    embed_token: string;
    similar_activities: {
        effort_count: number;
        average_speed: number;
        min_average_speed: number;
        mid_average_speed: number;
        max_average_speed: number;
        pr_rank: number;
        frequency_milestone: number;
        trend: {
            speeds: number[];
            current_activity_index: number;
            min_speed: number;
            mid_speed: number;
            max_speed: number;
            direction: number;
        };
        resource_state: number;
    };
    available_zones: any[];
}

export type { Stats, RecentRunsSection, StatsSection, Athlete, Club, Shoe, Run, Map, DetailedRun, Split, SegmentEffort, Lap, BestEffort }