package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;


// clubs(club_id,club_code,name,domestic_competition_id,
// total_market_value,squad_size,average_age,
// foreigners_number,foreigners_percentage,
// national_team_players,stadium_name,
// stadium_seats,net_transfer_record,
// coach_name,last_season,url)

@Entity
@Table(name = "clubs")
public class Club {
    @Id
    @Column(name = "club_id")
    private Long clubId;

    @Column(name = "club_code")
    private String clubCode;

    @Column(name = "name")
    private String name;

    @Column(name = "domestic_competition_id")
    private Long domesticCompetitionId;

    @Column(name = "total_market_value")
    private Long totalMarketValue;

    @Column(name = "squad_size")
    private Long squadSize;

    @Column(name = "average_age")
    private Double averageAge;

    @Column(name = "foreigners_number")
    private Long foreignersNumber;

    @Column(name = "foreigners_percentage")
    private Double foreignersPercentage;

    @Column(name = "national_team_players")
    private Long nationalTeamPlayers;

    @Column(name = "stadium_name")
    private String stadiumName;

    @Column(name = "stadium_seats")
    private Long stadiumSeats;


    @Column(name = "net_transfer_record")
    private Long netTransferRecord;

    @Column(name = "coach_name")
    private String coachName;

    @Column(name = "last_season")
    private String lastSeason;

    @Column(name = "url")
    private String url;

    public Club() {
    }

    public Club(Long clubId, String clubCode, String name, Long domesticCompetitionId, Long totalMarketValue, Long squadSize, Double averageAge, Long foreignersNumber, Double foreignersPercentage, Long nationalTeamPlayers, String stadiumName, Long stadiumSeats, Long netTransferRecord, String coachName, String lastSeason, String url) {
        this.clubId = clubId;
        this.clubCode = clubCode;
        this.name = name;
        this.domesticCompetitionId = domesticCompetitionId;
        this.totalMarketValue = totalMarketValue;
        this.squadSize = squadSize;
        this.averageAge = averageAge;
        this.foreignersNumber = foreignersNumber;
        this.foreignersPercentage = foreignersPercentage;
        this.nationalTeamPlayers = nationalTeamPlayers;
        this.stadiumName = stadiumName;
        this.stadiumSeats = stadiumSeats;
        this.netTransferRecord = netTransferRecord;
        this.coachName = coachName;
        this.lastSeason = lastSeason;
        this.url = url;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getClubCode() {
        return clubCode;
    }

    public void setClubCode(String clubCode) {
        this.clubCode = clubCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    public void setDomesticCompetitionId(Long domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    public Long getTotalMarketValue() {
        return totalMarketValue;
    }

    public void setTotalMarketValue(Long totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    public Long getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(Long squadSize) {
        this.squadSize = squadSize;
    }

    public Double getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(Double averageAge) {
        this.averageAge = averageAge;
    }

    public Long getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(Long foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public Double getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(Double foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public Long getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(Long nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public Long getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(Long stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public Long getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(Long netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public String getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(String lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


}
