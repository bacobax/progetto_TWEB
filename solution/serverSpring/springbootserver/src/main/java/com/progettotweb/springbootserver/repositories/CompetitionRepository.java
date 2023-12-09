package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String>{

}
