package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;


// clubs(club_id,club_code,name,domestic_competition_id,
// total_market_value,squad_size,average_age,
// foreigners_number,foreigners_percentage,
// national_team_players,stadium_name,
// stadium_seats,net_transfer_record,
// coach_name,last_season,url)

/**
 * This is the entity class for Club.
 * It contains the mapping between the database and the Java object.
 */

/**
 * The Club class is an entity that represents a club in the database.
 * It contains fields that map to columns in the "clubs" table.
 */
@Entity
@Table(name = "clubs")
public class Club {

    /**
     * The unique identifier of the club.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id")
    private Long clubId;

    /**
     * The code of the club.
     */
    @Column(name = "club_code")
    private String clubCode;

    /**
     * The name of the club.
     */
    @Column(name = "name")
    private String name;

    /**
     * The total market value of the club.
     */
    @Column(name = "total_market_value" , nullable = true)
    private Long totalMarketValue;

    /**
     * The size of the squad of the club.
     */
    @Column(name = "squad_size")
    private String squadSize;

    /**
     * The average age of the players in the club.
     */
    @Column(name = "average_age" , nullable = true)
    private String averageAge;

    /**
     * The number of foreign players in the club.
     */
    @Column(name = "foreigners_number")
    private String foreignersNumber;

    /**
     * The percentage of foreign players in the club.
     */
    @Column(name = "foreigners_percentage" , nullable = true)
    private String foreignersPercentage;

    /**
     * The number of players in the club who are also national team players.
     */
    @Column(name = "national_team_players")
    private String nationalTeamPlayers;

    /**
     * The name of the stadium of the club.
     */
    @Column(name = "stadium_name")
    private String stadiumName;

    /**
     * The number of seats in the stadium of the club.
     */
    @Column(name = "stadium_seats")
    private String stadiumSeats;

    /**
     * The net transfer record of the club.
     */
    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    /**
     * The name of the coach of the club.
     */
    @Column(name = "coach_name" , nullable = true)
    private String coachName;

    /**
     * The last season of the club.
     */
    @Column(name = "last_season")
    private String lastSeason;

    /**
     * The URL of the club's website.
     */
    @Column(name = "url")
    private String url;

    /**
     * The domestic competition that the club participates in.
     */
    @ManyToOne
    @JoinColumn(name = "domestic_competition_id", referencedColumnName = "competition_id")
    private Competition domesticCompetition;

    /**
     * Constructs a new Club with the specified details.
     */
    /**
 * Constructs a new Club with the specified details.
 *
 * @param clubId the unique identifier of the club
 * @param clubCode the code of the club
 * @param name the name of the club
 * @param totalMarketValue the total market value of the club
 * @param squadSize the size of the squad of the club
 * @param averageAge the average age of the players in the club
 * @param foreignersNumber the number of foreign players in the club
 * @param foreignersPercentage the percentage of foreign players in the club
 * @param nationalTeamPlayers the number of players in the club who are also national team players
 * @param stadiumName the name of the stadium of the club
 * @param stadiumSeats the number of seats in the stadium of the club
 * @param netTransferRecord the net transfer record of the club
 * @param coachName the name of the coach of the club
 * @param lastSeason the last season of the club
 * @param url the URL of the club's website
 * @param domesticCompetition the domestic competition that the club participates in
 */
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

    /**
     * Constructs a new Club with no details.
     */
    public Club() {

    }

    /**
     * Returns the unique identifier of the club.
     *
     * @return the club's ID
     */
    public Long getClubId() {
        return clubId;
    }

    /**
     * Sets the unique identifier of the club.
     *
     * @param clubId the club's ID
     */
    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    /**
     * Returns the code of the club.
     *
     * @return the club's code
     */
    public String getClubCode() {
        return clubCode;
    }

    /**
     * Sets the code of the club.
     *
     * @param clubCode the club's code
     */
    public void setClubCode(String clubCode) {
        this.clubCode = clubCode;
    }

    /**
     * Returns the name of the club.
     *
     * @return the club's name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the club.
     *
     * @param name the club's name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns the total market value of the club.
     *
     * @return the club's total market value
     */
    public Long getTotalMarketValue() {
        return totalMarketValue;
    }

    /**
     * Sets the total market value of the club.
     *
     * @param totalMarketValue the club's total market value
     */
    public void setTotalMarketValue(Long totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    /**
     * Returns the size of the squad of the club.
     *
     * @return the club's squad size
     */
    public String getSquadSize() {
        return squadSize;
    }

    /**
     * Sets the size of the squad of the club.
     *
     * @param squadSize the club's squad size
     */
    public void setSquadSize(String squadSize) {
        this.squadSize = squadSize;
    }

    /**
     * Returns the average age of the players in the club.
     *
     * @return the club's average age
     */
    public String getAverageAge() {
        return averageAge;
    }

    /**
     * Sets the average age of the players in the club.
     *
     * @param averageAge the club's average age
     */
    public void setAverageAge(String averageAge) {
        this.averageAge = averageAge;
    }

    /**
     * Returns the number of foreign players in the club.
     *
     * @return the club's number of foreign players
     */
    public String getForeignersNumber() {
        return foreignersNumber;
    }

    /**
     * Sets the number of foreign players in the club.
     *
     * @param foreignersNumber the club's number of foreign players
     */
    public void setForeignersNumber(String foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    /**
     * Returns the percentage of foreign players in the club.
     *
     * @return the club's percentage of foreign players
     */
    public String getForeignersPercentage() {
        return foreignersPercentage;
    }

    /**
     * Sets the percentage of foreign players in the club.
     *
     * @param foreignersPercentage the club's percentage of foreign players
     */
    public void setForeignersPercentage(String foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    /**
     * Returns the number of players in the club who are also national team players.
     *
     * @return the club's number of national team players
     */
    public String getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    /**
     * Sets the number of players in the club who are also national team players.
     *
     * @param nationalTeamPlayers the club's number of national team players
     */
    public void setNationalTeamPlayers(String nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    /**
     * Returns the name of the stadium of the club.
     *
     * @return the club's stadium name
     */
    public String getStadiumName() {
        return stadiumName;
    }

    /**
     * Sets the name of the stadium of the club.
     *
     * @param stadiumName the club's stadium name
     */
    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    /**
     * Returns the number of seats in the stadium of the club.
     *
     * @return the club's stadium seats
     */
    public String getStadiumSeats() {
        return stadiumSeats;
    }

    /**
     * Sets the number of seats in the stadium of the club.
     *
     * @param stadiumSeats the club's stadium seats
     */
    public void setStadiumSeats(String stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    /**
     * Returns the net transfer record of the club.
     *
     * @return the club's net transfer record
     */
    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    /**
     * Sets the net transfer record of the club.
     *
     * @param netTransferRecord the club's net transfer record
     */
    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    /**
     * Returns the name of the coach of the club.
     *
     * @return the club's coach name
     */
    public String getCoachName() {
        return coachName;
    }

    /**
     * Sets the name of the coach of the club.
     *
     * @param coachName the club's coach name
     */
    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    /**
     * Returns the last season of the club.
     *
     * @return the club's last season
     */
    public String getLastSeason() {
        return lastSeason;
    }

    /**
     * Sets the last season of the club.
     *
     * @param lastSeason the club's last season
     */
    public void setLastSeason(String lastSeason) {
        this.lastSeason = lastSeason;
    }

    /**
     * Returns the URL of the club's website.
     *
     * @return the club's URL
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the URL of the club's website.
     *
     * @param url the club's URL
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Returns the domestic competition that the club participates in.
     *
     * @return the club's domestic competition
     */
    public Competition getDomesticCompetition() {
        return domesticCompetition;
    }

    /**
     * Sets the domestic competition that the club participates in.
     *
     * @param domesticCompetition the club's domestic competition
     */
    public void setDomesticCompetition(Competition domesticCompetition) {
        this.domesticCompetition = domesticCompetition;
    }
}