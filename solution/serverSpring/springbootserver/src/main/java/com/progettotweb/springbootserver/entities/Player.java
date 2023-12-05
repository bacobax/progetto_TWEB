package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;
//players(player_id,first_name,last_name,
// name,last_season,current_club_id,
// player_code,country_of_birth,
// city_of_birth,country_of_citizenship,
// date_of_birth,sub_position,position,
// foot,height_in_cm,market_value_in_eur,
// highest_market_value_in_eur,
// contract_expiration_date,agent_name,
// image_url,url,
// current_club_domestic_competition_id,
// current_club_name)
@Entity
@Table(name = "players")
public class Player {
    @Id
    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "name")
    private String name;

    @Column(name = "last_season")
    private String lastSeason;

    @Column(name = "current_club_id")
    private Long currentClubId;

    @Column(name = "player_code")
    private String playerCode;

    @Column(name = "country_of_birth")
    private String countryOfBirth;

    @Column(name = "city_of_birth")
    private String cityOfBirth;

    @Column(name = "country_of_citizenship")
    private String countryOfCitizenship;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @Column(name = "sub_position")
    private String subPosition;

    @Column(name = "position")
    private String position;

    @Column(name = "foot")
    private String foot;

    @Column(name = "height_in_cm")
    private Long heightInCm;

    @Column(name = "market_value_in_eur")
    private Long marketValueInEur;

    @Column(name = "highest_market_value_in_eur")
    private Long highestMarketValueInEur;

    @Column(name = "contract_expiration_date")
    private String contractExpirationDate;

    @Column(name = "agent_name")
    private String agentName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "url")
    private String url;

    @Column(name = "current_club_domestic_competition_id")
    private Long currentClubDomesticCompetitionId;

    @Column(name = "current_club_name")
    private String currentClubName;

    public Player() {
    }

    public Player(Long playerId, String firstName, String lastName, String name, String lastSeason, Long currentClubId, String playerCode, String countryOfBirth, String cityOfBirth, String countryOfCitizenship, String dateOfBirth, String subPosition, String position, String foot, Long heightInCm, Long marketValueInEur, Long highestMarketValueInEur, String contractExpirationDate, String agentName, String imageUrl, String url, Long currentClubDomesticCompetitionId, String currentClubName) {
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
        this.lastSeason = lastSeason;
        this.currentClubId = currentClubId;
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
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
        this.currentClubName = currentClubName;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(String lastSeason) {
        this.lastSeason = lastSeason;
    }

    public Long getCurrentClubId() {
        return currentClubId;
    }

    public void setCurrentClubId(Long currentClubId) {
        this.currentClubId = currentClubId;
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

    public Long getHeightInCm() {
        return heightInCm;
    }

    public void setHeightInCm(Long heightInCm) {
        this.heightInCm = heightInCm;
    }

    public Long getMarketValueInEur() {
        return marketValueInEur;
    }

    public void setMarketValueInEur(Long marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public Long getHighestMarketValueInEur() {
        return highestMarketValueInEur;
    }

    public void setHighestMarketValueInEur(Long highestMarketValueInEur) {
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

    public Long getCurrentClubDomesticCompetitionId() {
        return currentClubDomesticCompetitionId;
    }

    public void setCurrentClubDomesticCompetitionId(Long currentClubDomesticCompetitionId) {
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
    }

    public String getCurrentClubName() {
        return currentClubName;
    }

    public void setCurrentClubName(String currentClubName) {
        this.currentClubName = currentClubName;
    }
}
