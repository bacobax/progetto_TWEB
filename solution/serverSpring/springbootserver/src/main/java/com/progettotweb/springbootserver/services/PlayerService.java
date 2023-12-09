package com.progettotweb.springbootserver.services;

import com.progettotweb.springbootserver.entities.Player;
import com.progettotweb.springbootserver.repositories.PlayerPageableRepo;
import com.progettotweb.springbootserver.repositories.PlayerRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final PlayerPageableRepo playerPageableRepo;


    public PlayerService(PlayerRepository playerRepository, PlayerPageableRepo playerPageableRepo) {
        this.playerRepository = playerRepository;
        this.playerPageableRepo = playerPageableRepo;
    }

    public List<Player> getAllPlayers(int pagenumber, int pagesize) {
        Pageable paging = PageRequest.of(pagenumber, pagesize);
        Page<Player> queryresult = playerPageableRepo.findAll(paging);
        return queryresult.getContent();

    }

    public Player getPlayerById(Long id) {
        return playerRepository.findById(id).orElse(null);
    }

    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    public void deletePlayerById(Long id) {
        playerRepository.deleteById(id);
    }

    public List<Player> findByQueryParams(String sortby, String fields, int limit){
        List<String> fieldsList = List.of(fields.split(","));
        return playerRepository.findByQueryParams(sortby, fieldsList, limit);
    }

}
