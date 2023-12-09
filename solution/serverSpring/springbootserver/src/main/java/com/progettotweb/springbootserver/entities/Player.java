package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;

/**
 * players(player_id,first_name,last_name,last_season,current_club_id,
 * player_code,country_of_birth,city_of_birth,country_of_citizenship,
 * date_of_birth,sub_position,position,foot,height_in_cm,market_value_in_eur,
 * highest_market_value_in_eur,contract_expiration_date,agent_name,image_url,url
 * )
 */

/**
 * players(player_id,first_name,last_name,last_season,current_club_id,
 * player_code,country_of_birth,city_of_birth,country_of_citizenship,
 * date_of_birth,sub_position,position,foot,height_in_cm,market_value_in_eur,
 * highest_market_value_in_eur,contract_expiration_date,agent_name,image_url,url
 * )
 */

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private Long playerId;


    @Column(name = "first_name", nullable = true)
    private String firstName;


    @Column(name = "last_name")
    private String lastName;

    @Column(name = "last_season")
    private String lastSeason;

    @Column(name = "player_code")
    private String playerCode;

    @Column(name = "country_of_birth", nullable = true)
    private String countryOfBirth;

    @Column(name = "city_of_birth" , nullable = true)
    private String cityOfBirth;

    @Column(name = "country_of_citizenship" , nullable = true)
    private String countryOfCitizenship;

    @Column(name = "date_of_birth" , nullable = true)
    private String dateOfBirth;

    @Column(name = "sub_position" , nullable = true)
    private String subPosition;

    @Column(name = "position")
    private String position;

    @Column(name = "foot" , nullable = true)
    private String foot;

    @Column(name = "height_in_cm" , nullable = true)
    private String heightInCm;

    @Column(name = "market_value_in_eur" , nullable = true)
    private String marketValueInEur;

    @Column(name = "highest_market_value_in_eur" , nullable = true)
    private String highestMarketValueInEur;

    @Column(name = "contract_expiration_date" , nullable = true)
    private String contractExpirationDate;

    @Column(name = "agent_name" , nullable = true)
    private String agentName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "url")
    private String url;


    @ManyToOne
    @JoinColumn(name = "current_club_id", referencedColumnName = "club_id")
    private Club currentClub;


    public Player(Long playerId, String firstName, String lastName, String lastSeason, String playerCode, String countryOfBirth, String cityOfBirth, String countryOfCitizenship, String dateOfBirth, String subPosition, String position, String foot, String heightInCm, String marketValueInEur, String highestMarketValueInEur, String contractExpirationDate, String agentName, String imageUrl, String url, Club currentClub, Competition currentClubDomesticCompetition) {
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.lastSeason = lastSeason;
        this.playerCode = playerCode;
        this.countryOfBirth = countryOfBirth;
        this.cityOfBirth = cityOfBirth;
        this.countryOfCitizenship = countryOfCitizenship;
        this.dateOfBirth = dateOfBirth;
        this.subPosition = subPosition;
        this.position = position;
        this.foot = foot;
        this.heightInCm = heightInCm;
        this.marketValueInEur = marketValueInEur;
        this.highestMarketValueInEur = highestMarketValueInEur;
        this.contractExpirationDate = contractExpirationDate;
        this.agentName = agentName;
        this.imageUrl = imageUrl;
        this.url = url;
        this.currentClub = currentClub;
    }

    public Player() {

    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(String lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getPlayerCode() {
        return playerCode;
    }

    public void setPlayerCode(String playerCode) {
        this.playerCode = playerCode;
    }

    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public String getCityOfBirth() {
        return cityOfBirth;
    }

    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    public String getCountryOfCitizenship() {
        return countryOfCitizenship;
    }

    public void setCountryOfCitizenship(String countryOfCitizenship) {
        this.countryOfCitizenship = countryOfCitizenship;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSubPosition() {
        return subPosition;
    }

    public void setSubPosition(String subPosition) {
        this.subPosition = subPosition;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getFoot() {
        return foot;
    }

    public void setFoot(String foot) {
        this.foot = foot;
    }

    public String getHeightInCm() {
        return heightInCm;
    }

    public void setHeightInCm(String heightInCm) {
        this.heightInCm = heightInCm;
    }

    public String getMarketValueInEur() {
        return marketValueInEur;
    }

    public void setMarketValueInEur(String marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public String getHighestMarketValueInEur() {
        return highestMarketValueInEur;
    }

    public void setHighestMarketValueInEur(String highestMarketValueInEur) {
        this.highestMarketValueInEur = highestMarketValueInEur;
    }

    public String getContractExpirationDate() {
        return contractExpirationDate;
    }

    public void setContractExpirationDate(String contractExpirationDate) {
        this.contractExpirationDate = contractExpirationDate;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Club getCurrentClub() {
        return currentClub;
    }

    public void setCurrentClub(Club currentClub) {
        this.currentClub = currentClub;
    }

}