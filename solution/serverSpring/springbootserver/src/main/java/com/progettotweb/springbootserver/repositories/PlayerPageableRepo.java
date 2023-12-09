package com.progettotweb.springbootserver.repositories;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.progettotweb.springbootserver.entities.Player;

import java.util.List;


public interface PlayerPageableRepo extends PagingAndSortingRepository<Player, Long>{

}
