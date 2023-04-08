import {Map, Shoe } from './stravaTypes'
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

type Segment = {
    id: number;
    resource_state: number;
    name: string;
    activity_type: string;
    distance: number;
    average_grade: number;
    maximum_grade: number;
    elevation_high: number;
    elevation_low: number;
    start_latlng: [number, number];
    end_latlng: [number, number];
    elavation_profile: string | null;
    climb_category: number;
    city: string;
    state: string;
    country: string;
    private: boolean;
    hazardous: boolean;
    starred: boolean;
};

type SegmentEffort = {
    id: number;
    resource_state: number;
    name: string;
    activity: {
        id: number;
        resource_state: number;
    };
    athlete: {
        id: number;
        resource_state: number;
    };
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
    segment: Segment;
    pr_rank: number | null;
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
    pr_rank: number | null;
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

type Comment = {
    id: number;
    activity_id: number;
    post_id: null | number;
    resource_state: number;
    text: string;
    mentions_metadata: null | any;
    created_at: string;
    cursor: null | any;
    athlete: {
      resource_state: number;
      firstname: string;
      lastname: string;
    };
    reaction_count: number;
    has_reacted: boolean;
  };

  
export type {DetailedRun, Split, SegmentEffort, Lap, BestEffort, Comment }