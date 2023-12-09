package com.progettotweb.springbootserver.services;

import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.entities.Competition;
import com.progettotweb.springbootserver.repositories.CompetitionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {

    private final CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }

    public Competition getCompetitionById(String id) {
        return competitionRepository.findById(id).orElse(null);
    }


    public Competition saveCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    public void deleteCompetitionById(String id) {
        competitionRepository.deleteById(id);
    }
    public List<Competition> findByQueryParams(String sortby, String fields, int limit){
        return competitionRepository.findByQueryParams(sortby, fields, limit);
    }
}