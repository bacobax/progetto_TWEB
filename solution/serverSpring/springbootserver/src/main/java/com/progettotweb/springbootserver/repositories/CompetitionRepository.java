package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String>{
    @Query(value = "SELECT :fields FROM Competition c ORDER BY :sortby LIMIT :limit")
    List<Competition> findByQueryParams(String sortby, List<String> fields, int limit);

    //get touples (competitionID, competitionName) foreach competitionID given (list of competitionID)
    @Query(value = "SELECT c FROM Competition c WHERE c.competitionId IN :competitionIds")
    List<Competition> findCompetitionNameById(List<String> competitionIds);

}
