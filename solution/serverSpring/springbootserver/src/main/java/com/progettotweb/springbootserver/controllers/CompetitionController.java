package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.entities.Competition;
import com.progettotweb.springbootserver.services.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompetitionController {
    private final CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }



    @GetMapping("/competitions")
    public List<Competition> getEntities(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String fields,
            @RequestParam(defaultValue = "100") int limit
    ) {

        List<Competition> entities = competitionService.getAllCompetitions();

        return entities;
    }


    @GetMapping("/competitions/:id")
    public Competition getCompetitionById(
            @RequestParam(required = true) String id
    ) {

        Competition competition = competitionService.getCompetitionById(id);


        return competition;
    }

    // route /competitions/:id/clubs
    /*@GetMapping("/competitions/:id/clubs")
    public List<Competition> getClubsByCompetitionId(
            @RequestParam(required = true) String id
    ) {

        Competition competition = competitionService.getCompetitionById(id);


        return competition.getClubs();
    }*/

}
