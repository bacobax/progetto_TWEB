package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    //findByQueryParams method

    @Query(value = "SELECT :fields FROM players p ORDER BY :sortby LIMIT :limit", nativeQuery = true)
    List<Player> findByQueryParams(String sortby, String fields, int limit);
}
