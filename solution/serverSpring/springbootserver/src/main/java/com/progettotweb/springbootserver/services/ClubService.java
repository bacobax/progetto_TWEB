package com.progettotweb.springbootserver.services;

import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.repositories.ClubRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {

    private final ClubRepository clubRepository;

    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    public Club getClubById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }



    public Club saveClub(Club club) {
        return clubRepository.save(club);
    }

    public void deleteClubById(Long id) {
        clubRepository.deleteById(id);
    }








}
