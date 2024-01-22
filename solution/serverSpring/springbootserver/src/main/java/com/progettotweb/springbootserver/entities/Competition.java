package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//competitions(competition_id,competition_code,name,sub_type,type,
// country_id,country_name,domestic_league_code,confederation,url)

/**
 * This is the entity class for Competition.
 * It contains the mapping between the database and the Java object.
 *
 */
@Entity
@Table(name = "competitions")
public class Competition {

    /**
     * The unique identifier of the competition.
     */
    @Id
    @Column(name = "competition_id")
    private String competitionId;

    /**
     * The code of the competition.
     */
    @Column(name = "competition_code")
    private String competitionCode;

    /**
     * The name of the competition.
     */
    @Column(name = "name")
    private String name;

    /**
     * The subtype of the competition.
     */
    @Column(name = "sub_type")
    private String subType;

    /**
     * The type of the competition.
     */
    @Column(name = "type")
    private String type;

    /**
     * The identifier of the country where the competition is held.
     */
    @Column(name = "country_id")
    private String countryId;

    /**
     * The name of the country where the competition is held.
     */
    @Column(name = "country_name", nullable = true)
    private String countryName;

    /**
     * The code of the domestic league associated with the competition.
     */
    @Column(name = "domestic_league_code", nullable = true)
    private String domesticLeagueCode;

    /**
     * The confederation associated with the competition.
     */
    @Column(name = "confederation")
    private String confederation;

    /**
     * The URL of the competition.
     */
    @Column(name = "url")
    private String url;

    /**
     * Constructs a new Competition with a randomly generated ID.
     */
    public Competition() {
        this.competitionId = UUID.randomUUID().toString();
    }

    /**
     * Returns the unique identifier of the competition.
     *
     * @return the competition's ID
     */
    public String getCompetitionId() {
        return competitionId;
    }

    /**
     * Sets the unique identifier of the competition.
     *
     * @param competitionId the competition's ID
     */
    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    /**
     * Returns the code of the competition.
     *
     * @return the competition's code
     */
    public String getCompetitionCode() {
        return competitionCode;
    }

    /**
     * Sets the code of the competition.
     *
     * @param competitionCode the competition's code
     */
    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }

    /**
     * Returns the name of the competition.
     *
     * @return the competition's name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the competition.
     *
     * @param name the competition's name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns the subtype of the competition.
     *
     * @return the competition's subtype
     */
    public String getSubType() {
        return subType;
    }

    /**
     * Sets the subtype of the competition.
     *
     * @param subType the competition's subtype
     */
    public void setSubType(String subType) {
        this.subType = subType;
    }

    /**
     * Returns the type of the competition.
     *
     * @return the competition's type
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the type of the competition.
     *
     * @param type the competition's type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Returns the identifier of the country where the competition is held.
     *
     * @return the competition's country ID
     */
    public String getCountryId() {
        return countryId;
    }

    /**
     * Sets the identifier of the country where the competition is held.
     *
     * @param countryId the competition's country ID
     */
    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    /**
     * Returns the name of the country where the competition is held.
     *
     * @return the competition's country name
     */
    public String getCountryName() {
        return countryName;
    }

    /**
     * Sets the name of the country where the competition is held.
     *
     * @param countryName the competition's country name
     */
    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    /**
     * Returns the code of the domestic league associated with the competition.
     *
     * @return the competition's domestic league code
     */
    public String getDomesticLeagueCode() {
        return domesticLeagueCode;
    }

    /**
     * Sets the code of the domestic league associated with the competition.
     *
     * @param domesticLeagueCode the competition's domestic league code
     */
    public void setDomesticLeagueCode(String domesticLeagueCode) {
        this.domesticLeagueCode = domesticLeagueCode;
    }

    /**
     * Returns the confederation associated with the competition.
     *
     * @return the competition's confederation
     */
    public String getConfederation() {
        return confederation;
    }

    /**
     * Sets the confederation associated with the competition.
     *
     * @param confederation the competition's confederation
     */
    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    /**
     * Returns the URL of the competition.
     *
     * @return the competition's URL
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the URL of the competition.
     *
     * @param url the competition's URL
     */
    public void setUrl(String url) {
        this.url = url;
    }
    /**
     * Returns a string representation of the Competition object.
     *
     * @return a string representation of the Competition object
     */
    @Override
    public String toString() {
        return "Competition{" +
                "competitionId='" + competitionId + '\'' +
                ", competitionCode='" + competitionCode + '\'' +
                ", name='" + name + '\'' +
                ", subType='" + subType + '\'' +
                ", type='" + type + '\'' +
                ", countryId='" + countryId + '\'' +
                ", countryName='" + countryName + '\'' +
                ", domesticLeagueCode='" + domesticLeagueCode + '\'' +
                ", confederation='" + confederation + '\'' +
                ", url='" + url + '\'' +
                '}';
    }

    /**
     * Constructs a new Competition with the specified details.
     *
     * @param competitionId the unique identifier of the competition
     * @param competitionCode the code of the competition
     * @param name the name of the competition
     * @param subType the subtype of the competition
     * @param type the type of the competition
     * @param countryId the identifier of the country where the competition is held
     * @param countryName the name of the country where the competition is held
     * @param domesticLeagueCode the code of the domestic league associated with the competition
     * @param confederation the confederation associated with the competition
     * @param url the URL of the competition
     */
    public Competition(String competitionId, String competitionCode, String name, String subType, String type, String countryId, String countryName, String domesticLeagueCode, String confederation, String url) {
        this.competitionId = competitionId;
        this.competitionCode = competitionCode;
        this.name = name;
        this.subType = subType;
        this.type = type;
        this.countryId = countryId;
        this.countryName = countryName;
        this.domesticLeagueCode = domesticLeagueCode;
        this.confederation = confederation;
        this.url = url;
    }

}