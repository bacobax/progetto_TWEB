package com.progettotweb.springbootserver;

/**
 * A record that represents a club's ID and total market value.
 * @param _id The unique identifier of the club
 * @param totalMarketValue The total market value of the club
 */
public record ClubIDAndTotalMarketValue(
    /**
     * The unique identifier of the club.
     */
    Long _id,

    /**
     * The total market value of the club.
     */
    Long totalMarketValue) {
}
