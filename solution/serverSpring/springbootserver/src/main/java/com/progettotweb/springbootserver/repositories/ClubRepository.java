package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * This is the repository interface for Club.
 * It extends JpaRepository and provides methods for database operations on Club objects.
 */
@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    /**
     * Retrieves Club objects that contain the given name.
     * @param name The name to search for
     * @return A list of Club objects that contain the given name
     */
    @Query("SELECT c FROM Club c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Club> findByNameContains(String name);

    /**
     * Retrieves the names of Club objects based on their IDs.
     * @param clubIds The IDs of the Club objects
     * @return A list of Club objects with the given IDs
     */
    @Query("SELECT c FROM Club c WHERE c.clubId IN :clubIds")
    List<Club> findClubsNamesByIds(List<Long> clubIds);

    /**
     * Updates the total market value of a Club object.
     * @param clubId The ID of the Club object to update
     * @param totalMarketValue The new total market value
     */
    @Modifying
    @Transactional
    @Query("UPDATE Club c SET c.totalMarketValue = :totalMarketValue WHERE c.clubId = :clubId")
    void updateTotalMarketValue(Long clubId, Long totalMarketValue);
}