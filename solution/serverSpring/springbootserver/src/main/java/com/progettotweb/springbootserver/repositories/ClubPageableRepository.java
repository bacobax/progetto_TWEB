package com.progettotweb.springbootserver.repositories;

import com.progettotweb.springbootserver.entities.Club;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ClubPageableRepository extends PagingAndSortingRepository<Club, Long> {

}
