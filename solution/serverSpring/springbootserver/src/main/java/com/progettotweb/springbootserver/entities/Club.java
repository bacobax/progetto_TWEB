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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id")
    private Long clubId;

    @Column(name = "club_code")
    private String clubCode;


    @Column(name = "name")
    private String name;

    @Column(name = "total_market_value" , nullable = true)
    private Long totalMarketValue;

    @Column(name = "squad_size")
    private String squadSize;

    @Column(name = "average_age" , nullable = true)
    private String averageAge;

    @Column(name = "foreigners_number")
    private String foreignersNumber;

    @Column(name = "foreigners_percentage" , nullable = true)
    private String foreignersPercentage;

    @Column(name = "national_team_players")
    private String nationalTeamPlayers;

    @Column(name = "stadium_name")
    private String stadiumName;

    @Column(name = "stadium_seats")
    private String stadiumSeats;

    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    @Column(name = "coach_name" , nullable = true)
    private String coachName;

    @Column(name = "last_season")
    private String lastSeason;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "domestic_competition_id", referencedColumnName = "competition_id")
    private Competition domesticCompetition;

    public Club(Long clubId, String clubCode, String name, Long totalMarketValue, String squadSize, String averageAge, String foreignersNumber, String foreignersPercentage, String nationalTeamPlayers, String stadiumName, String stadiumSeats, String netTransferRecord, String coachName, String lastSeason, String url, Competition domesticCompetition) {
        this.clubId = clubId;
        this.clubCode = clubCode;
        this.name = name;
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
        this.domesticCompetition = domesticCompetition;
    }

    public Club() {

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

    public Long getTotalMarketValue() {
        return totalMarketValue;
    }

    public void setTotalMarketValue(Long totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    public String getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(String squadSize) {
        this.squadSize = squadSize;
    }

    public String getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(String averageAge) {
        this.averageAge = averageAge;
    }

    public String getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(String foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public String getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(String foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public String getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(String nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public String getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(String stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(String netTransferRecord) {
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

    public Competition getDomesticCompetition() {
        return domesticCompetition;
    }

    public void setDomesticCompetition(Competition domesticCompetition) {
        this.domesticCompetition = domesticCompetition;
    }
}