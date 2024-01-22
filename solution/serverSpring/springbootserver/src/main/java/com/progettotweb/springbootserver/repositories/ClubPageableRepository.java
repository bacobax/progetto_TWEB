package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Club;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * ClubPageableRepository is a Spring Data repository for the Club entity.
 * It extends PagingAndSortingRepository to provide methods to retrieve entities
 * with pagination and sorting capabilities.
 */
public interface ClubPageableRepository extends PagingAndSortingRepository<Club, Long> {
    // Additional methods to manipulate Club entities can be added here
}