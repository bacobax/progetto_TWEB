package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String>{
    @Query(value = "SELECT :fields FROM competitions c ORDER BY :sortby LIMIT :limit", nativeQuery = true)
    List<Competition> findByQueryParams(String sortby, List<String> fields, int limit);
}
