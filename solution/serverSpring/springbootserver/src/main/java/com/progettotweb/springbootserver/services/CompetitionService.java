package com.progettotweb.springbootserver.services;

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

    public Competition getCompetitionById(Long id) {
        return competitionRepository.findById(id).orElse(null);
    }


    public Competition saveCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    public void deleteCompetitionById(Long id) {
        competitionRepository.deleteById(id);
    }
}