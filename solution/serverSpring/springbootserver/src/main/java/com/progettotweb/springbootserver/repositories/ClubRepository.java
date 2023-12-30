package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    @Query("SELECT c FROM Club c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Club> findByNameContains(String name);

    @Query("SELECT c FROM Club c WHERE c.clubId IN :clubIds")
    List<Club> findClubsNamesByIds(List<Long> clubIds);

    @Modifying
    @Transactional
    @Query("UPDATE Club c SET c.totalMarketValue = :totalMarketValue WHERE c.clubId = :clubId")
    void updateTotalMarketValue(Long clubId, Long totalMarketValue);
}
