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

        List<Competition> entities = competitionService.findByQueryParams(sortBy, fields, limit);

        return entities;
    }
}
