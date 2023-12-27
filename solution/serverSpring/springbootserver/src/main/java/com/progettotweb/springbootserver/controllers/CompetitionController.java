package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.entities.Competition;
import com.progettotweb.springbootserver.services.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CompetitionController {
    private final CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }



    @GetMapping("/api/competitions")
    public List<Competition> getEntities(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String fields,
            @RequestParam(defaultValue = "100") int limit
    ) {

        List<Competition> entities = competitionService.getAllCompetitions();

        return entities;
    }


    @GetMapping("/api/competitions/:id")
    public Competition getCompetitionById(
            @RequestParam(required = true) String id
    ) {

        Competition competition = competitionService.getCompetitionById(id);


        return competition;
    }

    record CompetitionIDAndName(String competition_id, String name){}
    //get a list of competitionIDs from the body and return a list of touples (competitionID, competitionName)
    @PostMapping("/api/competitions/names")
    public List<CompetitionIDAndName> getCompetitionNameById(
            @RequestBody(required = true) List<String> competitionIds
    ) {

        List<Competition> competitions = competitionService.findCompetitionNameById(competitionIds);
        return competitions.stream().map(competition -> new CompetitionIDAndName(competition.getCompetitionId(), competition.getName())).toList();
    }

    @GetMapping("/api/competitions/names")
    public List<CompetitionIDAndName> getAllCompetitionNames() {
        List<Competition> competitions = competitionService.getAllCompetitions();
        return competitions.stream().map(competition -> new CompetitionIDAndName(competition.getCompetitionId(), competition.getName())).toList();
    }

}

