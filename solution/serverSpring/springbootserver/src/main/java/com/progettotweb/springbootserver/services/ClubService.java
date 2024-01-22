package com.progettotweb.springbootserver.services;

import com.progettotweb.springbootserver.ClubIDAndTotalMarketValue;
import com.progettotweb.springbootserver.entities.Club;
import com.progettotweb.springbootserver.repositories.ClubPageableRepository;
import com.progettotweb.springbootserver.repositories.ClubRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
/**
 * This is the service class for Club.
 * It contains methods for CRUD operations on Club objects and additional operations.
 */
@Service
public class ClubService {

    // The repository for Club objects
    private final ClubRepository clubRepository;
    // The pageable repository for Club objects
    private final ClubPageableRepository clubPageableRepository;

    /**
     * Constructor for the ClubService class.
     * @param clubRepository The repository for Club objects
     * @param clubPageableRepository The pageable repository for Club objects
     */
    public ClubService(ClubRepository clubRepository, ClubPageableRepository clubPageableRepository) {
        this.clubRepository = clubRepository;
        this.clubPageableRepository = clubPageableRepository;
    }

    /**
     * Retrieves a Club object by its ID.
     * @param id The ID of the Club object
     * @return The Club object with the given ID, or an empty Optional if no such object exists
     */
    public Optional<Club> getClubById(Long id) {
        return clubRepository.findById(id);
    }

    /**
     * Saves a Club object.
     * @param club The Club object to save
     * @return The saved Club object
     */
    public Club saveClub(Club club) {
        return clubRepository.save(club);
    }

    /**
     * Deletes a Club object by its ID.
     * @param id The ID of the Club object to delete
     */
    public void deleteClubById(Long id) {
        clubRepository.deleteById(id);
    }

    /**
     * Retrieves all Club objects in a paginated format.
     * @param page The page number to retrieve
     * @param pagesize The number of Club objects per page
     * @return A list of Club objects for the given page
     */
    public List<Club> findAll(int page, int pagesize){
        Sort sort = Sort.by(Sort.Direction.DESC, "totalMarketValue");
        Pageable paging = PageRequest.of(page, pagesize, sort);
        return clubPageableRepository.findAll(paging).getContent();
    }

    /**
     * Retrieves Club objects that contain the given name.
     * @param name The name to search for
     * @return A list of Club objects that contain the given name
     */
    public List<Club> getClubByNameContains(String name){
        return clubRepository.findByNameContains(name);
    }

    /**
     * Retrieves the names of Club objects based on their IDs.
     * @param clubIds The IDs of the Club objects
     * @return A list of Club objects with the given IDs
     */
    public List<Club> findClubsNamesByIds(List<Long> clubIds) {
        return clubRepository.findClubsNamesByIds(clubIds);
    }

    /**
     * Updates the total market value of Club objects.
     * @param clubsIDAndTotalMarketValue A list of ClubIDAndTotalMarketValue objects, each containing a Club ID and the new total market value
     */
    public void updateClubsTotalMarketValue(List<ClubIDAndTotalMarketValue> clubsIDAndTotalMarketValue) {
        for (ClubIDAndTotalMarketValue clubIDAndTotalMarketValue : clubsIDAndTotalMarketValue) {
            clubRepository.updateTotalMarketValue(clubIDAndTotalMarketValue._id(), clubIDAndTotalMarketValue.totalMarketValue());
        }
    }

}
