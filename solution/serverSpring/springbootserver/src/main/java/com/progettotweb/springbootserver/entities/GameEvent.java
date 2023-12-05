package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;

import java.sql.Date;

//game_events(game_event_id,date,game_id,minute,type,club_id,player_id,description,player_in_id,player_assist_id)

@Entity
@Table(name = "game_events")
public class GameEvent {
    @Id
    @Column(name = "game_event_id")
    private Long gameEventId;

    @Column(name = "date")
    private Date date;

    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "minute")
    private Long minute;

    @Column(name = "type")
    private String type;

    @Column(name = "club_id")
    private Long clubId;

    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "description")
    private String description;

    @Column(name = "player_in_id")
    private Long playerInId;

    @Column(name = "player_assist_id")
    private Long playerAssistId;

    public GameEvent() {
    }

    public GameEvent(Long gameEventId, Date date, Long gameId, Long minute, String type, Long clubId, Long playerId, String description, Long playerInId, Long playerAssistId) {
        this.gameEventId = gameEventId;
        this.date = date;
        this.gameId = gameId;
        this.minute = minute;
        this.type = type;
        this.clubId = clubId;
        this.playerId = playerId;
        this.description = description;
        this.playerInId = playerInId;
        this.playerAssistId = playerAssistId;
    }

    public Long getGameEventId() {
        return gameEventId;
    }

    public void setGameEventId(Long gameEventId) {
        this.gameEventId = gameEventId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public Long getMinute() {
        return minute;
    }

    public void setMinute(Long minute) {
        this.minute = minute;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPlayerInId() {
        return playerInId;
    }

    public void setPlayerInId(Long playerInId) {
        this.playerInId = playerInId;
    }

    public Long getPlayerAssistId() {
        return playerAssistId;
    }

    public void setPlayerAssistId(Long playerAssistId) {
        this.playerAssistId = playerAssistId;
    }
}
