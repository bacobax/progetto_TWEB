/**
 * Club response json
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

export interface Competition {
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


export interface GameEvent {
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
    player: {
        first_name: string;
        last_name: string;
    }[]
    player_in: {
        first_name: string;
        last_name: string;
    }[]
    player_assist: {
        first_name: string;
        last_name: string;
    }[]
    game?: {
        competition_id: string;
        home_club_name: string;
        away_club_name: string;
    }

}