package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.services.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClubController {

    private final ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    record PaginateResponse(List<Club> items, String nextPageURL){};

    @CrossOrigin(origins = "*")
    @GetMapping("/api/clubs")
    public PaginateResponse getClubs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "100") int pagesize
    ) {
        int searchPage = page-1;
        List<Club> entities = clubService.findAll(searchPage, pagesize);
        int nextPage = page + 1;
        String nextPageURL = "http://localhost:8081/api/clubs?page=" + nextPage + "&pagesize=" + pagesize;

        return new PaginateResponse(entities, nextPageURL);
    }

    //route clubs/:id
    @CrossOrigin(origins = "*")
    @GetMapping("/api/clubs/{id}")
    public Club getClubById(
            @PathVariable(required = true) Long id
    ) {

        Club club = clubService.getClubById(id).orElse(null);

        return club;
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/api/clubs/name/{name}")
    public List<Club> getClubByContainsName(
            @PathVariable(required = true) String name
    ) {

        List<Club> clubs = clubService.getClubByNameContains(name);

        return clubs;
    }


}
