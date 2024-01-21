package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This is the repository interface for Competition.
 * It extends JpaRepository and provides methods for database operations on Competition objects.
 */
@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String>{

    /**
     * Retrieves Competition objects based on query parameters.
     * @param sortby The field to sort by
     * @param fields The fields to include in the result
     * @param limit The maximum number of results to return
     * @return A list of Competition objects that match the query parameters
     */
    @Query(value = "SELECT :fields FROM Competition c ORDER BY :sortby LIMIT :limit")
    List<Competition> findByQueryParams(String sortby, List<String> fields, int limit);

    /**
     * Retrieves the names of Competition objects based on their IDs.
     * @param competitionIds The IDs of the Competition objects
     * @return A list of Competition objects with the given IDs
     */
    //get touples (competitionID, competitionName) foreach competitionID given (list of competitionID)
    @Query(value = "SELECT c FROM Competition c WHERE c.competitionId IN :competitionIds")
    List<Competition> findCompetitionNameById(List<String> competitionIds);

}