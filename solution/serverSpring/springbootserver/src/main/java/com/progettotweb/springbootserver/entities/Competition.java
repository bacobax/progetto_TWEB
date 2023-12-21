package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//competitions(competition_id,competition_code,name,sub_type,type,
// country_id,country_name,domestic_league_code,confederation,url)
@Entity
@Table(name = "competitions")
public class Competition {

    @Id
    @Column(name = "competition_id")
    private String competitionId;

    @Column(name = "competition_code")
    private String competitionCode;


    @Column(name = "name")

    private String name;

    @Column(name = "sub_type")
    private String subType;

    @Column(name = "type")
    private String type;

    @Column(name = "country_id")
    private String countryId;

    @Column(name = "country_name" , nullable = true)
    private String countryName;

    @Column(name = "domestic_league_code" , nullable = true)
    private String domesticLeagueCode;

    @Column(name = "confederation")
    private String confederation;

    @Column(name = "url")
    private String url;





    public Competition() {
        this.competitionId = UUID.randomUUID().toString();
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public String getCompetitionCode() {
        return competitionCode;
    }

    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getDomesticLeagueCode() {
        return domesticLeagueCode;
    }

    public void setDomesticLeagueCode(String domesticLeagueCode) {
        this.domesticLeagueCode = domesticLeagueCode;
    }

    public String getConfederation() {
        return confederation;
    }

    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

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