package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.entities.Player;
import com.progettotweb.springbootserver.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/players")
    public List<Player> getEntities(

            @RequestParam(defaultValue = "100") int pagenumber,
            @RequestParam(defaultValue = "100") int pagesize

    ) {

        List<Player> entities = playerService.getAllPlayers(pagenumber,pagesize);

        return entities;
    }


}
