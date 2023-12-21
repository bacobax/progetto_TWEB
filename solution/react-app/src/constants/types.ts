



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