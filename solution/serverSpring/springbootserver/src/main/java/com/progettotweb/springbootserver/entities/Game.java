package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;
//games(game_id,competition_id,
// season,round,date,home_club_id,
// away_club_id,home_club_goals,
// away_club_goals,home_club_position,
// away_club_position,home_club_manager_name,
// away_club_manager_name,stadium,
// attendance,referee,url,
// home_club_formation,away_club_formation,
// home_club_name,away_club_name,aggregate,
// competition_type)
@Entity
@Table(name = "games")
public class Game {
    @Id
    @Column(name = "game_id")
    private Long gameId;

    @ManyToOne
    @JoinColumn(name = "competition_id", referencedColumnName = "competition_id")
    private Competition competition;

    @Column(name = "season")
    private String season;

    @Column(name = "round")
    private String round;

    @Column(name = "date")
    private String date;

    @ManyToOne
    @JoinColumn(name = "home_club_id", referencedColumnName = "club_id")
    private Club homeClub;

    @ManyToOne
    @JoinColumn(name = "away_club_id", referencedColumnName = "club_id")
    private Club awayClub;

    @Column(name = "home_club_goals")
    private Long homeClubGoals;

    @Column(name = "away_club_goals")
    private Long awayClubGoals;

    @Column(name = "home_club_position")
    private Long homeClubPosition;

    @Column(name = "away_club_position")
    private Long awayClubPosition;

    @Column(name = "home_club_manager_name")
    private String homeClubManagerName;

    @Column(name = "away_club_manager_name")
    private String awayClubManagerName;

    @Column(name = "stadium")
    private String stadium;

    @Column(name = "attendance")
    private Long attendance;

    @Column(name = "referee")
    private String referee;

    @Column(name = "url")
    private String url;

    @Column(name = "home_club_formation")
    private String homeClubFormation;

    @Column(name = "away_club_formation")
    private String awayClubFormation;

    @Column(name = "home_club_name")
    private String homeClubName;

    @Column(name = "away_club_name")
    private String awayClubName;

    @Column(name = "aggregate")
    private String aggregate;

    @Column(name = "competition_type")
    private String competitionType;

    public Game() {
    }

    public Game(Long gameId, Competition competition, String season, String round, String date, Club homeClub, Club awayClub, Long homeClubGoals, Long awayClubGoals, Long homeClubPosition, Long awayClubPosition, String homeClubManagerName, String awayClubManagerName, String stadium, Long attendance, String referee, String url, String homeClubFormation, String awayClubFormation, String homeClubName, String awayClubName, String aggregate, String competitionType) {
        this.gameId = gameId;
        this.competition = competition;
        this.season = season;
        this.round = round;
        this.date = date;
        this.homeClub = homeClub;
        this.awayClub = awayClub;
        this.homeClubGoals = homeClubGoals;
        this.awayClubGoals = awayClubGoals;
        this.homeClubPosition = homeClubPosition;
        this.awayClubPosition = awayClubPosition;
        this.homeClubManagerName = homeClubManagerName;
        this.awayClubManagerName = awayClubManagerName;
        this.stadium = stadium;
        this.attendance = attendance;
        this.referee = referee;
        this.url = url;
        this.homeClubFormation = homeClubFormation;
        this.awayClubFormation = awayClubFormation;
        this.homeClubName = homeClubName;
        this.awayClubName = awayClubName;
        this.aggregate = aggregate;
        this.competitionType = competitionType;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getRound() {
        return round;
    }

    public void setRound(String round) {
        this.round = round;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Club getHomeClub() {
        return homeClub;
    }

    public void setHomeClub(Club homeClub) {
        this.homeClub = homeClub;
    }

    public Club getAwayClub() {
        return awayClub;
    }

    public void setAwayClub(Club awayClub) {
        this.awayClub = awayClub;
    }

    public Long getHomeClubGoals() {
        return homeClubGoals;
    }

    public void setHomeClubGoals(Long homeClubGoals) {
        this.homeClubGoals = homeClubGoals;
    }

    public Long getAwayClubGoals() {
        return awayClubGoals;
    }

    public void setAwayClubGoals(Long awayClubGoals) {
        this.awayClubGoals = awayClubGoals;
    }

    public Long getHomeClubPosition() {
        return homeClubPosition;
    }

    public void setHomeClubPosition(Long homeClubPosition) {
        this.homeClubPosition = homeClubPosition;
    }

    public Long getAwayClubPosition() {
        return awayClubPosition;
    }

    public void setAwayClubPosition(Long awayClubPosition) {
        this.awayClubPosition = awayClubPosition;
    }

    public String getHomeClubManagerName() {
        return homeClubManagerName;
    }

    public void setHomeClubManagerName(String homeClubManagerName) {
        this.homeClubManagerName = homeClubManagerName;
    }

    public String getAwayClubManagerName() {
        return awayClubManagerName;
    }

    public void setAwayClubManagerName(String awayClubManagerName) {
        this.awayClubManagerName = awayClubManagerName;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public Long getAttendance() {
        return attendance;
    }

    public void setAttendance(Long attendance) {
        this.attendance = attendance;
    }

    public String getReferee() {
        return referee;
    }

    public void setReferee(String referee) {
        this.referee = referee;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getHomeClubFormation() {
        return homeClubFormation;
    }

    public void setHomeClubFormation(String homeClubFormation) {
        this.homeClubFormation = homeClubFormation;
    }

    public String getAwayClubFormation() {
        return awayClubFormation;
    }

    public void setAwayClubFormation(String awayClubFormation) {
        this.awayClubFormation = awayClubFormation;
    }

    public String getHomeClubName() {
        return homeClubName;
    }

    public void setHomeClubName(String homeClubName) {
        this.homeClubName = homeClubName;
    }

    public String getAwayClubName() {
        return awayClubName;
    }

    public void setAwayClubName(String awayClubName) {
        this.awayClubName = awayClubName;
    }

    public String getAggregate() {
        return aggregate;
    }

    public void setAggregate(String aggregate) {
        this.aggregate = aggregate;
    }

    public String getCompetitionType() {
        return competitionType;
    }

    public void setCompetitionType(String competitionType) {
        this.competitionType = competitionType;
    }
}
