/* eslint-disable @typescript-eslint/no-explicit-any */

/*!
 * https://github.com/ArthurHeitmann/photon-reddit/blob/master/src/static/scripts/types/redditTypes.ts
 * Licensed under GPL-3.0
 */

export type RedditApiObj = {
  kind: string;
  data: RedditApiData;
};

export interface RedditCommentObj extends RedditApiObj {
  kind: 't1';
  data: RedditCommentData | RedditCommentMessageData;
}

export interface RedditUserObj extends RedditApiObj {
  kind: 't2';
  data: RedditUserInfo;
}

export interface RedditPostObj extends RedditApiObj {
  kind: 't3';
  data: RedditPostData;
}

export interface RedditMessageObj extends RedditApiObj {
  kind: 't4';
  data: RedditMessageData;
}

export interface RedditSubredditObj extends RedditApiObj {
  kind: 't5';
  data: SubredditInfoBase;
}

export interface RedditListingObj<T> extends RedditApiObj {
  kind: 'Listing';
  data: RedditListing<T>;
}

export interface RedditMoreCommentsObj extends RedditApiObj {
  kind: 'more';
  data: RedditMoreCommentsData;
}

export interface RedditMultiObj extends RedditApiObj {
  kind: 'LabeledMulti';
  data: RedditMultiInfo;
}

export interface RedditWikiObj extends RedditApiObj {
  kind: 'wikipage';
  data: RedditWikiData;
}

// eslint-disable-next-line
export interface RedditApiData {}

export interface RedditListing<T> extends RedditApiData {
  dist: number;
  children: T[];
  before: string | null;
  after: string | null;
}

export interface RedditPostData extends RedditApiData {
  all_awardings: RedditAward[];
  allow_live_comments: boolean;
  approved_at_utc: any;
  approved_by: any;
  archived: boolean;
  author_cakeday?: boolean;
  author_flair_background_color: any;
  author_flair_css_class: any;
  author_flair_richtext: any[];
  author_flair_template_id: any;
  author_flair_text_color: any;
  author_flair_text: any;
  author_flair_type: string;
  author_fullname: string;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  author: string;
  awarders: any[];
  banned_at_utc: any;
  banned_by: any;
  can_gild: boolean;
  can_mod_post: boolean;
  category: any;
  clicked: boolean;
  content_categories: any;
  contest_mode: boolean;
  created_utc: number;
  created: number;
  crosspost_parent_list?: RedditPostData[];
  discussion_type: any;
  distinguished: any;
  domain: string;
  downs: number;
  edited?: number;
  gallery_data?: {
    items: {
      caption: string;
      media_id: string;
      id: number;
      outbound_url?: string;
    }[];
  };
  gilded: number;
  gildings?: {
    gid_1: number;
    gid_2: number;
    gid_3: number;
  };
  hidden: boolean;
  hide_score: boolean;
  id: string;
  is_created_from_ads_ui: boolean;
  is_crosspostable: boolean;
  is_meta: boolean;
  is_original_content: boolean;
  is_reddit_media_domain: boolean;
  is_robot_indexable: boolean;
  is_self: boolean;
  is_video: boolean;
  likes: boolean | null;
  link_flair_background_color: string;
  link_flair_css_class: any;
  link_flair_richtext: any[];
  link_flair_text_color: string;
  link_flair_text: any;
  link_flair_type: string;
  locked: boolean;
  media_embed?: MediaEmbed;
  media_metadata?: {
    [mediaId: string]: {
      status: string;
      e: string;
      m: string;
      p: AlbumEntry[];
      s: AlbumEntry;
      id: string;
    };
  };
  media_only: boolean;
  media?: {
    reddit_video?: RedditVideo;
    oembed?: MediaOembed;
  };
  mod_note: any;
  mod_reason_by: any;
  mod_reason_title: any;
  mod_reports: any[];
  name: string;
  no_follow: boolean;
  num_comments: number;
  num_crossposts: number;
  num_duplicates?: number;
  num_reports: any;
  over_18: boolean;
  parent_whitelist_status?: string;
  permalink: string;
  pinned: boolean;
  poll_data?: {
    user_selection: string;
    voting_end_timestamp: number;
    total_vote_count: number;
    options: {
      text: string;
      id: string;
      vote_count?: number;
    }[];
    is_prediction: boolean;
    prediction_status: any;
    resolved_option_id: any;
    total_stake_amount: any;
    tournament_id: any;
    user_won_amount: any;
    vote_updates_remained: any;
  };
  post_hint: string;
  preview?: {
    images: {
      source: ImageEntry;
      resolutions: ImageEntry[];
      variants?: {
        obfuscated?: {
          source: ImageEntry;
          resolutions: ImageEntry[];
        };
        nsfw?: {
          source: ImageEntry;
          resolutions: ImageEntry[];
        };
        gif?: {
          source: ImageEntry;
          resolutions: ImageEntry[];
        };
        mp4?: {
          source: ImageEntry;
          resolutions: ImageEntry[];
        };
      };
      id?: string;
    }[];
    reddit_video_preview?: RedditVideo;
    enabled: boolean;
  };
  pwls?: number;
  quarantine: boolean;
  removal_reason: any;
  removed_by_category: any;
  removed_by: any;
  report_reasons: any;
  saved: boolean;
  score: number;
  secure_media_embed:
    | MediaEmbed
    | {
        reddit_video?: RedditVideo;
      };
  secure_media: {
    reddit_video?: RedditVideo;
    type?: string;
    oembed?: MediaOembed;
  };
  selftext_html?: string;
  selftext: string;
  send_replies: boolean;
  spoiler: boolean;
  sr_detail?: SubredditInfoBase;
  stickied: boolean;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit_subscribers: number;
  subreddit_type: string;
  subreddit: string;
  suggested_sort: string | null;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail: string;
  title: string;
  top_awarded_type: any;
  total_awards_received: number;
  treatment_tags: any[];
  ups: number;
  upvote_ratio: number;
  url_overridden_by_dest: string;
  url: string;
  user_reports: any[];
  view_count: any;
  visited: boolean;
  whitelist_status?: string;
  wls?: number;
}

export interface RedditCommentData extends RedditApiData {
  all_awardings: RedditAward[];
  approved_at_utc: any;
  approved_by: any;
  archived: boolean;
  associated_award: any;
  author_flair_background_color: any;
  author_flair_css_class: any;
  author_flair_richtext: any[];
  author_flair_template_id: any;
  author_flair_text_color: any;
  author_flair_text: any;
  author_flair_type: string;
  author_fullname: string;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  author: string;
  awarders: any[];
  banned_at_utc: any;
  banned_by: any;
  body_html: string;
  body: string;
  can_gild: boolean;
  can_mod_post: boolean;
  collapsed_because_crowd_control: any;
  collapsed_reason_code: any;
  collapsed_reason: any;
  collapsed: boolean;
  comment_type: any;
  controversiality: number;
  created_utc: number;
  created: number;
  depth: number;
  distinguished: any;
  downs: number;
  edited?: number;
  gilded: number;
  gildings?: {
    gid_1: number;
    gid_2: number;
    gid_3: number;
  };
  id: string;
  is_submitter: boolean;
  likes: boolean | null;
  link_id: string;
  locked: boolean;
  media_metadata?: {
    [key: string]: {
      e: string;
      id: string;
      m: string;
      s: {
        x: number;
        y: number;
        u?: string;
        gif?: string;
      };
      status: string;
      t: string;
    };
  };
  mod_note: any;
  mod_reason_by: any;
  mod_reason_title: any;
  mod_reports: any[];
  name: string;
  no_follow: boolean;
  num_reports: any;
  parent_id: string;
  permalink: string;
  removal_reason: any;
  replies: RedditListingObj<RedditCommentObj | RedditMoreCommentsObj>;
  report_reasons: any;
  saved: boolean;
  score_hidden: boolean;
  score: number;
  send_replies: boolean;
  stickied: boolean;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit_type: string;
  subreddit: string;
  top_awarded_type: any;
  total_awards_received: number;
  treatment_tags: any[];
  ups: number;
  user_reports: any[];
}

export interface RedditMoreCommentsData extends RedditApiData {
  children: string[];
  count: number;
  depth: number;
  id: string;
  name: string;
  parent_id: string;
}

export interface RedditMessageData extends RedditApiData {
  associated_awarding_id: string;
  author_fullname: string;
  author: string;
  body_html: string;
  body: string;
  context: string;
  created_utc: number;
  created: number;
  dest: string;
  distinguished: string;
  first_message_name: string;
  first_message: number;
  id: string;
  likes: boolean | null;
  name: string;
  new: boolean;
  num_comments: number;
  parent_id: string;
  replies: '' | RedditListingObj<RedditMessageObj>;
  score: number;
  subject: string;
  subreddit_name_prefixed: string;
  subreddit: string;
  type: 'unknown' | 'comment_reply';
  was_comment: boolean;
}

export interface RedditCommentMessageData extends RedditMessageData {
  subreddit_name_prefixed: string;
  type: 'comment_reply';
}

export interface RedditUserInfo extends RedditApiData {
  accept_chats: boolean;
  accept_followers: boolean;
  accept_pms: boolean;
  awardee_karma: number;
  awarder_karma: number;
  comment_karma: number;
  created_utc: number;
  created: number;
  has_subscribed: boolean;
  has_verified_email: boolean;
  hide_from_robots: boolean;
  icon_img: string;
  id: string;
  is_blocked: boolean;
  is_employee: boolean;
  is_friend: boolean;
  is_gold: boolean;
  is_mod: boolean;
  is_suspended?: boolean;
  link_karma: number;
  name: string;
  pref_show_snoovatar: boolean;
  snoovatar_img: string;
  snoovatar_size: number[] | null;
  subreddit: UserSubreddit;
  total_karma: number;
  verified: boolean;
}

export interface RedditMultiInfo extends RedditApiData {
  can_edit: boolean;
  copied_from?: any;
  created_utc: number;
  created: number;
  description_html: string;
  description_md: string;
  display_name: string;
  icon_url: string;
  is_favorited: boolean;
  is_subscriber: boolean;
  key_color?: any;
  name: string;
  num_subscribers: number;
  over_18: boolean;
  owner_id: string;
  owner: string;
  path: string;
  subreddits: {
    name: string;
    data: SubredditExpanded;
  }[];
  visibility: 'private' | 'public' | 'hidden';
}

export interface SubredditInfoBase {
  accept_followers: boolean;
  banner_img: string;
  banner_size: number[] | null;
  community_icon: string;
  description: string;
  display_name_prefixed: string;
  display_name: string;
  free_form_reports: boolean;
  header_size: number[] | null;
  icon_img: string;
  icon_size: any;
  key_color: string;
  link_flair_enabled: boolean;
  name: string;
  public_description: string;
  restrict_commenting: boolean;
  restrict_posting: boolean;
  show_media: boolean;
  submit_text_label: string;
  subscribers: number;
  title: string;
  url: string;
  user_is_contributor: boolean;
  user_is_moderator: boolean;
  user_is_muted: boolean;
  user_is_subscriber: boolean;
}

export interface SubredditDetails extends SubredditInfoBase {
  accounts_active_is_fuzzed: boolean;
  accounts_active: number;
  active_user_count: number;
  advertiser_category: string;
  all_original_content: boolean;
  allow_discovery: boolean;
  allow_galleries: boolean;
  allow_images: boolean;
  allow_polls: boolean;
  allow_predictions_tournament: boolean;
  allow_predictions: boolean;
  allow_videogifs: boolean;
  allow_videos: boolean;
  banner_background_color: string;
  banner_background_image: string;
  can_assign_link_flair: boolean;
  can_assign_user_flair: boolean;
  collapse_deleted_comments: boolean;
  comment_score_hide_mins: number;
  community_reviewed: boolean;
  created_utc: number;
  created: number;
  description_html: string;
  disable_contributor_requests: boolean;
  emojis_custom_size: any;
  emojis_enabled: boolean;
  has_menu_widget: boolean;
  header_img: string;
  header_title: string;
  hide_ads: boolean;
  id: string;
  is_crosspostable_subreddit: boolean | null;
  is_enrolled_in_new_modmail: any;
  lang: string;
  link_flair_position: string;
  mobile_banner_image: string;
  notification_level: string | null;
  original_content_tag_enabled: boolean;
  over18: boolean;
  prediction_leaderboard_entry_type: string;
  primary_color: string;
  public_description_html: string;
  public_traffic: boolean;
  quarantine: boolean;
  show_media_preview: boolean;
  spoilers_enabled: boolean;
  submission_type: string;
  submit_link_label: string;
  submit_text_html: string;
  submit_text: string;
  subreddit_type: string;
  suggested_comment_sort: string | null;
  user_can_flair_in_sr: boolean | null;
  user_flair_background_color: any;
  user_flair_css_class: any;
  user_flair_enabled_in_sr: boolean;
  user_flair_position: string;
  user_flair_richtext: any[];
  user_flair_template_id: any;
  user_flair_text_color: any;
  user_flair_text: any;
  user_flair_type: string;
  user_has_favorited: boolean;
  user_is_banned: boolean;
  user_sr_flair_enabled: boolean;
  user_sr_theme_enabled: boolean;
  videostream_links_count?: number;
  whitelist_status?: string;
  wiki_enabled: boolean;
  wls?: number;
}

export interface SubredditExpanded extends SubredditInfoBase {
  created_utc: number;
  created: number;
  default_set: boolean;
  disable_contributor_requests: boolean;
  header_img: string;
  icon_color: string;
  link_flair_position: string;
  over_18: boolean;
  previous_names: any[];
  primary_color: string;
  quarantine: boolean;
  submit_link_label: string;
  subreddit_type: string;
  user_is_banned: boolean;
}

export interface UserSubreddit extends SubredditInfoBase {
  banner_background_color?: string;
  default_set: boolean;
  disable_contributor_requests: boolean;
  header_img?: any;
  icon_color: string;
  is_default_banner: boolean;
  is_default_icon: boolean;
  link_flair_position: string;
  over_18: boolean;
  previous_names: any[];
  primary_color: string;
  quarantine: boolean;
  submit_link_label: string;
  subreddit_type: string;
  user_is_banned: boolean;
}

export interface RedditWikiData {
  content_html: string;
  content_mod: string;
  may_revise: boolean;
  reason: string;
  revised_by: RedditUserObj;
  revision_data: number;
  revision_id: string;
}

export interface ImageEntry {
  url: string;
  width: number;
  height: number;
}

export interface AlbumEntry {
  x: number;
  y: number;
  u?: string;
  gif?: string;
  mp4?: string;
}

export interface RedditVideo {
  height: number;
  width: number;
  fallback_url: string;
  dash_url: string;
  hls_url: string;
  scrubber_media_url: string;
  duration: number;
  bitrate_kbps: number;
  is_gif: boolean;
  transcoding_status: string;
}

export interface MediaEmbed {
  content: string;
  width: number;
  height: number;
  scrolling: boolean;
}

export interface MediaOembed {
  author_name: string;
  description: string;
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_url: string;
  thumbnail_width: number;
  title: string;
  type: string;
  version: string;
  width: number;
}

export interface RedditAward {
  award_sub_type: string;
  award_type: string;
  awardings_required_to_grant_benefits: null;
  coin_price: number;
  coin_reward: number;
  count: number;
  days_of_drip_extension: number;
  days_of_premium: number;
  description: string;
  end_date: null;
  giver_coin_reward: number;
  icon_format: string;
  icon_height: number;
  icon_url: string;
  icon_width: number;
  id: string;
  is_enabled: boolean;
  is_new: boolean;
  name: string;
  penny_donate: number;
  penny_price: number;
  resized_icons: ImageEntry[];
  resized_static_icons: ImageEntry[];
  start_date: null;
  static_icon_height: number;
  static_icon_url: string;
  static_icon_width: number;
  subreddit_coin_reward: number;
  subreddit_id: any;
  tiers_by_required_awardings: any;
}

export interface RedditJsonApiResponse {
  json: {
    data: {
      things: RedditApiObj[];
    };
    errors: any[][];
  };
}

export interface SubredditRule {
  created_utc: number;
  description_html: string;
  description: string;
  kind: string;
  priority: number;
  short_name: string;
  violation_reason: string;
}

export interface SubredditModerator {
  author_flair_css_class: string;
  author_flair_text: string;
  date: number;
  id: string;
  mod_permissions: string[];
  name: string;
  rel_id: string;
}

export interface FlairData {
  type: string;
  backgroundColor?: string;
  textColor?: string;
  richText?: {
    a?: string;
    e: string;
    u?: string;
    t: string;
  }[];
  text?: string;
  isEditable?: boolean;
  id?: string;
}

export interface FlairApiData {
  background_color: string;
  id: string;
  richtext: {
    a?: string;
    e: string;
    u?: string;
    t: string;
  }[];
  text: string;
  text_color: string;
  text_editable: boolean;
  type: string;
}

export interface RedditPreferences {
  accept_pms?: 'everyone' | 'whitelisted';
  activity_relevant_ads?: boolean;
  allow_clicktracking?: boolean;
  bad_comment_autocollapse?: 'off' | 'low' | 'medium' | 'high';
  beta?: boolean;
  clickgadget?: boolean;
  collapse_read_messages?: boolean;
  compress?: boolean;
  country_code?:
    | 'WF'
    | 'JP'
    | 'JM'
    | 'JO'
    | 'WS'
    | 'JE'
    | 'GW'
    | 'GU'
    | 'GT'
    | 'GS'
    | 'GR'
    | 'GQ'
    | 'GP'
    | 'GY'
    | 'GG'
    | 'GF'
    | 'GE'
    | 'GD'
    | 'GB'
    | 'GA'
    | 'GN'
    | 'GM'
    | 'GL'
    | 'GI'
    | 'GH'
    | 'PR'
    | 'PS'
    | 'PW'
    | 'PT'
    | 'PY'
    | 'PA'
    | 'PF'
    | 'PG'
    | 'PE'
    | 'PK'
    | 'PH'
    | 'PN'
    | 'PL'
    | 'PM'
    | 'ZM'
    | 'ZA'
    | 'ZZ'
    | 'ZW'
    | 'ME'
    | 'MD'
    | 'MG'
    | 'MF'
    | 'MA'
    | 'MC'
    | 'MM'
    | 'ML'
    | 'MO'
    | 'MN'
    | 'MH'
    | 'MK'
    | 'MU'
    | 'MT'
    | 'MW'
    | 'MV'
    | 'MQ'
    | 'MP'
    | 'MS'
    | 'MR'
    | 'MY'
    | 'MX'
    | 'MZ'
    | 'FR'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FM'
    | 'FO'
    | 'CK'
    | 'CI'
    | 'CH'
    | 'CO'
    | 'CN'
    | 'CM'
    | 'CL'
    | 'CC'
    | 'CA'
    | 'CG'
    | 'CF'
    | 'CD'
    | 'CZ'
    | 'CY'
    | 'CX'
    | 'CR'
    | 'CW'
    | 'CV'
    | 'CU'
    | 'SZ'
    | 'SY'
    | 'SX'
    | 'SS'
    | 'SR'
    | 'SV'
    | 'ST'
    | 'SK'
    | 'SJ'
    | 'SI'
    | 'SH'
    | 'SO'
    | 'SN'
    | 'SM'
    | 'SL'
    | 'SC'
    | 'SB'
    | 'SA'
    | 'SG'
    | 'SE'
    | 'SD'
    | 'YE'
    | 'YT'
    | 'LB'
    | 'LC'
    | 'LA'
    | 'LK'
    | 'LI'
    | 'LV'
    | 'LT'
    | 'LU'
    | 'LR'
    | 'LS'
    | 'LY'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'IQ'
    | 'VI'
    | 'IS'
    | 'IR'
    | 'IT'
    | 'VN'
    | 'IM'
    | 'IL'
    | 'IO'
    | 'IN'
    | 'IE'
    | 'ID'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BA'
    | 'BB'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BT'
    | 'BV'
    | 'BW'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BY'
    | 'BZ'
    | 'RU'
    | 'RW'
    | 'RS'
    | 'RE'
    | 'RO'
    | 'OM'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'HK'
    | 'HN'
    | 'HM'
    | 'EH'
    | 'EE'
    | 'EG'
    | 'EC'
    | 'ET'
    | 'ES'
    | 'ER'
    | 'UY'
    | 'UZ'
    | 'US'
    | 'UM'
    | 'UG'
    | 'UA'
    | 'VU'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NF'
    | 'NG'
    | 'NZ'
    | 'NP'
    | 'NR'
    | 'NU'
    | 'XK'
    | 'XZ'
    | 'XX'
    | 'KG'
    | 'KE'
    | 'KI'
    | 'KH'
    | 'KN'
    | 'KM'
    | 'KR'
    | 'KP'
    | 'KW'
    | 'KZ'
    | 'KY'
    | 'DO'
    | 'DM'
    | 'DJ'
    | 'DK'
    | 'DE'
    | 'DZ'
    | 'TZ'
    | 'TV'
    | 'TW'
    | 'TT'
    | 'TR'
    | 'TN'
    | 'TO'
    | 'TL'
    | 'TM'
    | 'TJ'
    | 'TK'
    | 'TH'
    | 'TF'
    | 'TG'
    | 'TD'
    | 'TC'
    | 'AE'
    | 'AD'
    | 'AG'
    | 'AF'
    | 'AI'
    | 'AM'
    | 'AL'
    | 'AO'
    | 'AN'
    | 'AQ'
    | 'AS'
    | 'AR'
    | 'AU'
    | 'AT'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'QA';
  creddit_autorenew?: boolean;
  default_comment_sort?: 'confidence' | 'top' | 'new' | 'controversial' | 'old' | 'random' | 'qa' | 'live';
  domain_details?: boolean;
  email_chat_request?: boolean;
  email_comment_reply?: boolean;
  email_community_discovery?: boolean;
  email_digests?: boolean;
  email_messages?: boolean;
  email_post_reply?: boolean;
  email_private_message?: boolean;
  email_unsubscribe_all?: boolean;
  email_upvote_comment?: boolean;
  email_upvote_post?: boolean;
  email_user_new_follower?: boolean;
  email_username_mention?: boolean;
  enable_default_themes?: boolean;
  enable_followers?: boolean;
  feed_recommendations_enabled?: boolean;
  g?: string;
  hide_ads?: boolean;
  hide_downs?: boolean;
  hide_from_robots?: boolean;
  hide_ups?: boolean;
  highlight_controversial?: boolean;
  highlight_new_comments?: boolean;
  ignore_suggested_sort?: boolean;
  in_redesign_beta?: boolean;
  label_nsfw?: boolean;
  lang?: string;
  legacy_search?: boolean;
  live_orangereds?: boolean;
  mark_messages_read?: boolean;
  media?: 'on' | 'off' | 'subreddit';
  media_preview?: 'on' | 'off' | 'subreddit';
  /** -100 to 100 */
  min_comment_score?: number;
  /** -100 to 100 */
  min_link_score?: number;
  monitor_mentions?: boolean;
  newwindow?: boolean;
  nightmode?: boolean;
  no_profanity?: boolean;
  /** 1 to 500 */
  num_comments?: number;
  /** 1 to 100 */
  numsites?: number;
  organic?: boolean;
  /** subreddit name */
  other_theme?: string;
  over_18?: boolean;
  private_feeds?: boolean;
  profile_opt_out?: boolean;
  public_votes?: boolean;
  research?: boolean;
  search_include_over_18?: boolean;
  send_crosspost_messages?: boolean;
  send_welcome_messages?: boolean;
  show_flair?: boolean;
  show_gold_expiration?: boolean;
  show_link_flair?: boolean;
  show_location_based_recommendations?: boolean;
  show_presence?: boolean;
  show_promote?: boolean;
  show_stylesheets?: boolean;
  show_trending?: boolean;
  show_twitter?: boolean;
  store_visits?: boolean;
  survey_last_seen_time?: number;
  /** subreddit name */
  theme_selector?: number;
  third_party_data_personalized_ads?: boolean;
  third_party_personalized_ads?: boolean;
  third_party_site_data_personalized_ads?: boolean;
  third_party_site_data_personalized_content?: boolean;
  threaded_messages?: boolean;
  threaded_modmail?: boolean;
  top_karma_subreddits?: boolean;
  use_global_defaults?: boolean;
  video_autoplay?: boolean;
}

export interface RedditQuarantineError {
  quarantine_requires_email_optin: boolean;
  reason: string;
  quarantine_message_html: string;
  quarantine_message: string;
  error: number;
  message: string;
}
