package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    @Query(value = "SELECT (:fields) FROM clubs c ORDER BY :sortby LIMIT :limit", nativeQuery = true)
    List<Club> findByQueryParams(String sortby, String fields, int limit);
}
