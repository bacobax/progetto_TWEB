package com.progettotweb.springbootserver.controllers;

import com.progettotweb.springbootserver.ClubIDAndTotalMarketValue;
import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.services.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
/**
 * This is the controller class for Club.
 * It contains methods for handling HTTP requests related to Club objects.
 */
public class ClubController {

    // The service for Club objects
    private final ClubService clubService;

    /**
     * Constructor for the ClubController class.
     * @param clubService The service for Club objects
     */
    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    // Record for paginated response
    record PaginateResponse(List<Club> items, String nextPageURL){};

    /**
     * Handles GET requests to retrieve all Club objects in a paginated format.
     * @param page The page number to retrieve
     * @param pagesize The number of Club objects per page
     * @return A PaginateResponse object containing the Club objects for the given page and the URL for the next page
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/api/club")
    public PaginateResponse getClubs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "100") int pagesize
    ) {
        int searchPage = page-1;
        List<Club> entities = clubService.findAll(searchPage, pagesize);
        int nextPage = page + 1;
        String nextPageURL = "http://localhost:8080/api/club?page=" + nextPage + "&pagesize=" + pagesize;

        return new PaginateResponse(entities, nextPageURL);
    }

    /**
     * Handles GET requests to retrieve a Club object by its ID.
     * @param id The ID of the Club object
     * @return The Club object with the given ID, or null if no such object exists
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/api/club/{id}")
    public Club getClubById(
            @PathVariable(required = true) Long id
    ) {

        Club club = clubService.getClubById(id).orElse(null);

        return club;
    }

    /**
     * Handles GET requests to retrieve Club objects that contain the given name.
     * @param name The name to search for
     * @return A list of Club objects that contain the given name
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/api/club/name/{name}")
    public List<Club> getClubByContainsName(
            @PathVariable(required = true) String name
    ) {

        List<Club> clubs = clubService.getClubByNameContains(name);

        return clubs;
    }

    // Record for Club ID and name
    record ClubIDAndName(Long club_id, String name){}

    /**
     * Handles POST requests to retrieve the names of Club objects based on their IDs.
     * @param clubIds The IDs of the Club objects
     * @return A list of ClubIDAndName objects, each containing a Club ID and name
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/api/club/names")
    public List<ClubIDAndName> getClubNameById(
            @RequestBody(required = true) List<Long> clubIds
    ) {

        List<Club> clubs = clubService.findClubsNamesByIds(clubIds);
        return clubs.stream().map(club -> new ClubIDAndName(club.getClubId(), club.getName())).toList();
    }

    /**
     * Handles PUT requests to update the total market value of Club objects.
     * @param clubIdsAndTotalMarketValue A list of ClubIDAndTotalMarketValue objects, each containing a Club ID and the new total market value
     */
    @CrossOrigin(origins = "*")
    @PutMapping("/api/club/totalMarketValue")
    public void updateClubTotalMarketValue(
            @RequestBody(required = true) List<ClubIDAndTotalMarketValue> clubIdsAndTotalMarketValue
    ) {

        clubService.updateClubsTotalMarketValue(clubIdsAndTotalMarketValue);
    }

}