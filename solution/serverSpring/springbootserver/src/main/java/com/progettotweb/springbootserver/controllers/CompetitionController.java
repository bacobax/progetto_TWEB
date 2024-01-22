package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.entities.Competition;
import com.progettotweb.springbootserver.services.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CompetitionController is a REST controller that handles HTTP requests related to competitions.
 */
@RestController
public class CompetitionController {
    private final CompetitionService competitionService;

    /**
     * Constructs a new CompetitionController with the specified CompetitionService.
     *
     * @param competitionService the service to be used for handling competition-related operations
     */
    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    /**
     * Handles GET requests to retrieve all competitions.
     *
     * @param sortBy the field to sort the results by (optional)
     * @param fields the fields to include in the results (optional)
     * @param limit the maximum number of results to return (default is 100)
     * @return a list of competitions
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/api/competitions")
    public List<Competition> getEntities(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String fields,
            @RequestParam(defaultValue = "100") int limit
    ) {

        List<Competition> entities = competitionService.getAllCompetitions();

        return entities;
    }

    /**
     * Handles GET requests to retrieve a competition by its ID.
     *
     * @param id the ID of the competition to retrieve
     * @return the competition with the specified ID
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/api/competitions/:id")
    public Competition getCompetitionById(
            @RequestParam(required = true) String id
    ) {

        Competition competition = competitionService.getCompetitionById(id);

        System.out.println(competition);
        return competition;
    }

    /**
     * A record that represents a competition's ID and name.
     */
    record CompetitionIDAndName(String competition_id, String name){}

    /**
     * Handles POST requests to retrieve the names of competitions by their IDs.
     *
     * @param competitionIds the IDs of the competitions to retrieve the names of
     * @return a list of records, each containing a competition's ID and name
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/api/competitions/names")
    public List<CompetitionIDAndName> getCompetitionNameById(
            @RequestBody(required = true) List<String> competitionIds
    ) {

        List<Competition> competitions = competitionService.findCompetitionNameById(competitionIds);
        return competitions.stream().map(competition -> new CompetitionIDAndName(competition.getCompetitionId(), competition.getName())).toList();
    }

    /**
     * Handles GET requests to retrieve the names of all competitions.
     *
     * @return a list of records, each containing a competition's ID and name
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/api/competitions/names")
    public List<CompetitionIDAndName> getAllCompetitionNames() {
        List<Competition> competitions = competitionService.getAllCompetitions();
        return competitions.stream().map(competition -> new CompetitionIDAndName(competition.getCompetitionId(), competition.getName())).toList();
    }

}