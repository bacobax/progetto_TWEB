package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
//player_valuations(player_id,last_season,
// datetime,date,dateweek,market_value_in_eur,
// n,current_club_id,
// player_club_domestic_competition_id)
@Entity
@Table(name = "player_valuations")
public class PlayerValuation {
    @Id
    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "market_value_in_eur")
    private BigDecimal marketValueInEur;


    @Column(name = "current_club_id")
    private Long currentClubId;

    @Column(name = "player_club_domestic_competition_id")
    private Long playerClubDomesticCompetitionId;

    @Column(name = "last_season")
    private String lastSeason;

    public PlayerValuation() {
    }

    public PlayerValuation(Long playerId, BigDecimal marketValueInEur, Long currentClubId, Long playerClubDomesticCompetitionId, String lastSeason) {
        this.playerId = playerId;
        this.marketValueInEur = marketValueInEur;
        this.currentClubId = currentClubId;
        this.playerClubDomesticCompetitionId = playerClubDomesticCompetitionId;
        this.lastSeason = lastSeason;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public BigDecimal getMarketValueInEur() {
        return marketValueInEur;
    }

    public void setMarketValueInEur(BigDecimal marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public Long getCurrentClubId() {
        return currentClubId;
    }

    public void setCurrentClubId(Long currentClubId) {
        this.currentClubId = currentClubId;
    }

    public Long getPlayerClubDomesticCompetitionId() {
        return playerClubDomesticCompetitionId;
    }

    public void setPlayerClubDomesticCompetitionId(Long playerClubDomesticCompetitionId) {
        this.playerClubDomesticCompetitionId = playerClubDomesticCompetitionId;
    }

    public String getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(String lastSeason) {
        this.lastSeason = lastSeason;
    }
}
