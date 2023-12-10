


export interface ShortPlayer{

    _id: string;
    first_name?: string;
    last_name?: string;

    image_url: string;
    market_value_in_eur?: number
    highest_market_value_in_eur?: number
}
export type Position ='Missing'| 'Midfield'| 'Attack'| 'Defender' | 'Goalkeeper';

export type SubPosition =
    'Attacking Midfield'|
    'Central Midfield'|
    'Centre-Back'|
    'Centre-Forward'|
    'Defensive Midfield'|
    'Goalkeeper'|
    'Left Midfield'|
    'Left Winger'|
    'Left-Back'|
    'Right Midfield'|
    'Right Winger'|
    'Right-Back'|
    'Second Striker'

export type LineupPosition =
    'Goalkeeper'|
    'Right-Back'|
    'Central Midfield'|
    'Left Winger'|
    'Attacking Midfield'|
    'Right Midfield'|
    'Right Winger'|
    'Defender'|
    'Defensive Midfield'|
    'Left-Back'|
    'midfield'|
    'Attack'|
    'Centre-Back'|
    'Centre-Forward'|
    'Second Striker'|
    'Left Midfield'|
    'Sweeper'
export interface Player extends ShortPlayer{
    last_season: string;
    player_code: string;
    country_of_birth?: string;
    date_of_birth?: string;
    sub_position?:SubPosition;
    position: Position;
    foot?:number;
    height_in_cm?: number;
    contract_expiration_date?: string;
    agent_name?: string;
    current_club?: string;
    url?: string;

}


type Statistic = {
    [key: string]: number
}
