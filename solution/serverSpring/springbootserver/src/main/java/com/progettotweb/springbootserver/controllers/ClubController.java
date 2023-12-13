package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.services.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/clubs")
    public List<Club> getEntities(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int pagesize
    ) {

        List<Club> entities = clubService.findAll(page, pagesize);

        return entities;
    }

    //route clubs/:id
    @GetMapping("/clubs/:id")
    public Club getClubById(
            @RequestParam(required = true) Long id
    ) {

        Club club = clubService.getClubById(id).orElse(null);

        return club;
    }


}
