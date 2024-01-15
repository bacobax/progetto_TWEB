



export type Position ='Missing'| 'Midfield'| 'Attack'| 'Defender' | 'Goalkeeper';

export const positions: Position[] = [
    'Missing',
    'Midfield',
    'Attack',
    'Defender',
    'Goalkeeper'
]

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

export const subPositions: SubPosition[] = [
    'Attacking Midfield',
    'Central Midfield',
    'Centre-Back',
    'Centre-Forward',
    'Defensive Midfield',
    'Goalkeeper',
    'Left Midfield',
    'Left Winger',
    'Left-Back',
    'Right Midfield',
    'Right Winger',
    'Right-Back',
    'Second Striker'
]

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

export const lineupPositions: LineupPosition[] = [
    'Goalkeeper',
    'Right-Back',
    'Central Midfield',
    'Left Winger',
    'Attacking Midfield',
    'Right Midfield',
    'Right Winger',
    'Defender',
    'Defensive Midfield',
    'Left-Back',
    'midfield',
    'Attack',
    'Centre-Back',
    'Centre-Forward',
    'Second Striker',
    'Left Midfield',
    'Sweeper'
]

export interface ShortPlayer{

    _id: string;
    first_name?: string;
    last_name?: string;

    image_url: string;
    market_value_in_eur?: number
    highest_market_value_in_eur?: number
}

export interface PlayerStats {

        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        minutes_played: number;
        appearances: number;

}
export interface Player extends ShortPlayer{
    last_season: string;
    player_code: string;
    country_of_birth?: string;
    city_of_birth?: string;
    date_of_birth?: string;
    sub_position?:SubPosition;
    position: Position;
    foot?:number;
    height_in_cm?: number;
    contract_expiration_date?: string;
    agent_name?: string;
    clubName: string;
    url?: string;
    stats: {
        [competitionID:string] : PlayerStats & {competitionName:string}
    };
    totalStats: PlayerStats
    lineupsCount?: {
        [lineupPosition:string] : number
    }
    market_values_in_eur?: [
        {
            market_value_in_eur: number,
            date: string
        }
    ]
    gameEvents?: GameEvent[]

}

/**
 * club response json
 * {
 *         "clubId": 3690,
 *         "clubCode": "ska-khabarovsk",
 *         "name": "SKA Khabarovsk",
 *         "totalMarketValue": null,
 *         "squadSize": "27",
 *         "averageAge": "25.7",
 *         "foreignersNumber": "4",
 *         "foreignersPercentage": "14.8",
 *         "nationalTeamPlayers": "0",
 *         "stadiumName": "Lenin Stadion",
 *         "stadiumSeats": "15200",
 *         "netTransferRecord": "€-93k",
 *         "coachName": null,
 *         "lastSeason": "2017",
 *         "url": "https://www.transfermarkt.co.uk/ska-khabarovsk/startseite/verein/3690",
 *         "domesticCompetition": {
 *             "competitionId": "RU1",
 *             "competitionCode": "premier-liga",
 *             "name": "premier-liga",
 *             "subType": "first_tier",
 *             "type": "domestic_league",
 *             "countryId": "141",
 *             "countryName": "Russia",
 *             "domesticLeagueCode": "RU1",
 *             "confederation": "europa",
 *             "url": "https://www.transfermarkt.co.uk/premier-liga/startseite/wettbewerb/RU1"
 *         }
 *     },
 */

export interface Competition{
    competitionId: string;
    competitionCode: string;
    name: string;
    subType: string;
    type: string;
    countryId: string;
    countryName: string;
    domesticLeagueCode: string;
    confederation: string;
    url: string;
}

export interface ShortClub{
    clubId: number;
    name: string;
    squadSize: string;
    stadiumName: string;
    url: string;
    lastSeason: string;
    domesticCompetition: {
        competitionId: string;
        name: string;
    }
}

export interface PlayerInsideClub {
    _id: string
    first_name: string,
    last_name: string,
    country_of_citizenship: string,
    date_of_birth: string,
    position: string,
    market_value_in_eur: string,
    id: string,
    contract_expiration_date: string,
}

export interface Club extends ShortClub{
    clubCode: string;
    totalMarketValue: number;
    averageAge: string;
    foreignersNumber: string;
    foreignersPercentage: string;
    nationalTeamPlayers: string;
    stadiumSeats: string;
    netTransferRecord: string;
    coachName: string;
    domesticCompetition: Competition;
    players: PlayerInsideClub[];
}


type Statistic = {
    [key: string]: number
}
export interface Message{
    from: {
        _id: string;
        id: string;
        name: string;
    };
    text: string;
}
export interface Room{
    name: string;
    _id: string;
    admin: string;
    members: string[];
    messages: Message[];
    description?: string;
}

/**
 * game example:
 * "_id": "6574baea291260c74de2888d",
 *             "competition_id": "CIT",
 *             "season": "2023",
 *             "round": "First Round",
 *             "date": "2023-08-14T00:00:00.000Z",
 *             "home_club_id": 1038,
 *             "away_club_id": 4554,
 *             "home_club_goals": 8,
 *             "away_club_goals": 7,
 *             "home_club_position": null,
 *             "away_club_position": null,
 *             "stadium": "Luigi Ferraris",
 *             "attendance": 10948,
 *             "referee": "Kevin Bonacina",
 *             "url": "https://www.transfermarkt.co.uk/spielbericht/index/spielbericht/4137134",
 *             "home_club_formation": "4-3-3 Attacking",
 *             "away_club_formation": "4-4-2 double 6",
 *             "home_club_name": "",
 *             "away_club_name": "",
 *             "aggregate": "8:7",
 *             "competition_type": "domestic_cup",
 *             "createdAt": "2023-12-09T19:09:36.851Z",
 *             "updatedAt": "2023-12-09T19:09:36.851Z",
 *             "id": "6574baea291260c74de2888d"
 */

export interface Player {
    _id: string;
    competition_id: string;
    season: string;
    round: string;
    date: string;
    home_club_id: number;
    away_club_id: number;
    home_club_goals: number;
    away_club_goals: number;
    home_club_position: number;
    away_club_position: number;
    stadium: string;
    attendance: number;
    referee: string;
    url?: string;
    home_club_formation: string;
    away_club_formation: string;
    home_club_name: string;
    away_club_name: string;
    aggregate: string;
    competition_type: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}


/**
 * GAme event shape example:
 * {
 *             "_id": "6574db930a845340382cfe54",
 *             "date": "2012-08-18T00:00:00.000Z",
 *             "game_id": "6574bae9291260c74de18e18",
 *             "minute": 84,
 *             "type": "Cards",
 *             "club_id": 52,
 *             "player_id": "6574baf3975bb4cdf6a015da",
 *             "description": "1. Yellow card",
 *             "player_in_id": null,
 *             "player_assist_id": null
 *         },
 */


export interface GameEvent{
    _id: string;
    date: string;
    game_id: string;
    minute: number;
    type: string;
    club_id: number;
    player_id: string;
    description: string;
    player_in_id: string;
    player_assist_id: string;
    player:{
        first_name: string;
        last_name:string;
    }[]
    player_in: {
        first_name: string;
        last_name:string;
    }[]
    player_assist: {
        first_name: string;
        last_name:string;
    }[]
    game?: {
        competition_id: string;
        home_club_name: string;
        away_club_name: string;
    }

}

export interface PlayerSearchFilters{
    min_market_value_in_eur?: number;
    max_market_value_in_eur?: number;
    position?: Position;
    sub_position?: SubPosition;
    country_of_citizenship?: string;
}