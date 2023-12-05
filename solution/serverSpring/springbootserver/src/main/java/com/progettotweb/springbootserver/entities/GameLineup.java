package com.progettotweb.springbootserver.entities;

import jakarta.persistence.*;
//game_lineups(game_lineups_id,game_id,club_id,type,number,player_id,player_name,team_captain,position)

@Entity
@Table(name = "game_lineups")
public class GameLineup {
    @Id
    @Column(name = "game_lineups_id")
    private Long gameLineupsId;

    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "club_id", referencedColumnName = "club_id")
    private Club club;

    @Column(name = "type")
    private String type;

    @Column(name = "number")
    private Long number;

    @ManyToOne
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    private Player player;

    @Column(name = "player_name")
    private String playerName;

    @Column(name = "team_captain")
    private Boolean teamCaptain;

    @Column(name = "position")
    private String position;

    public GameLineup() {
    }


    public GameLineup(Long gameLineupsId, Game game, Club club, String type, Long number, Player player, String playerName, Boolean teamCaptain, String position) {
        this.gameLineupsId = gameLineupsId;
        this.game = game;
        this.club = club;
        this.type = type;
        this.number = number;
        this.player = player;
        this.playerName = playerName;
        this.teamCaptain = teamCaptain;
        this.position = position;
    }

    public Long getGameLineupsId() {
        return gameLineupsId;
    }

    public void setGameLineupsId(Long gameLineupsId) {
        this.gameLineupsId = gameLineupsId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public Boolean getTeamCaptain() {
        return teamCaptain;
    }

    public void setTeamCaptain(Boolean teamCaptain) {
        this.teamCaptain = teamCaptain;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}