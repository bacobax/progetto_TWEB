package com.progettotweb.springbootserver.services;

import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.entities.Competition;
import com.progettotweb.springbootserver.repositories.CompetitionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
/**
 * This is the service class for Competition.
 * It contains methods for CRUD operations on Competition objects.
 */
public class CompetitionService {

    // The repository for Competition objects
    private final CompetitionRepository competitionRepository;

    /**
     * Constructor for the CompetitionService class.
     * @param competitionRepository The repository for Competition objects
     */
    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    /**
     * Retrieves all Competition objects.
     * @return A list of all Competition objects
     */
    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }

    /**
     * Retrieves a Competition object by its ID.
     * @param id The ID of the Competition object
     * @return The Competition object with the given ID, or null if no such object exists
     */
    public Competition getCompetitionById(String id) {
        return competitionRepository.findById(id).orElse(null);
    }

    /**
     * Saves a Competition object.
     * @param competition The Competition object to save
     * @return The saved Competition object
     */
    public Competition saveCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    /**
     * Deletes a Competition object by its ID.
     * @param id The ID of the Competition object to delete
     */
    public void deleteCompetitionById(String id) {
        competitionRepository.deleteById(id);
    }

    /**
     * Retrieves Competition objects based on query parameters.
     * @param sortby The field to sort by
     * @param fields The fields to include in the result
     * @param limit The maximum number of results to return
     * @return A list of Competition objects that match the query parameters
     */
    public List<Competition> findByQueryParams(String sortby, String fields, int limit){
        List<String> fieldsList = List.of(fields.split(","));
        return competitionRepository.findByQueryParams(sortby, fieldsList, limit);
    }

    /**
     * Retrieves the names of Competition objects based on their IDs.
     * @param competitionIds The IDs of the Competition objects
     * @return A list of Competition objects with the given IDs
     */
    public List<Competition> findCompetitionNameById(List<String> competitionIds){
        List<Competition> res = competitionRepository.findCompetitionNameById(competitionIds);
        System.out.println(res);
        return res;
    }

}