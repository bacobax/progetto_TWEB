import {Competition} from "../Game/types";

export interface ShortClub {
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

export interface Club extends ShortClub {
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