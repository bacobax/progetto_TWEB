package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.services.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubController {

    private final ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping("/clubs")
    public List<Club> getEntities(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String fields,
            @RequestParam(defaultValue = "100") int limit
    ) {

        List<Club> entities = clubService.findByQueryParams(sortBy, fields, limit);

        return entities;
    }


}
