package com.progettotweb.springbootserver.services;

import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.repositories.ClubPageableRepository;
import com.progettotweb.springbootserver.repositories.ClubRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubPageableRepository clubPageableRepository;

    public ClubService(ClubRepository clubRepository, ClubPageableRepository clubPageableRepository) {
        this.clubRepository = clubRepository;
        this.clubPageableRepository = clubPageableRepository;
    }


    public Optional<Club> getClubById(Long id) {
        return clubRepository.findById(id);
    }



    public Club saveClub(Club club) {
        return clubRepository.save(club);
    }

    public void deleteClubById(Long id) {
        clubRepository.deleteById(id);
    }
    public List<Club> findAll(int page, int pagesize){
        Pageable paging = PageRequest.of(page, pagesize);
        return clubRepository.findAll(paging).getContent();
    }



}
