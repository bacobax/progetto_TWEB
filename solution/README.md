# progetto_TWEB

# Database Split Strategy for Football Statistics App

## Objective

The goal of this document is to outline the strategic allocation of data across MongoDB and PostgreSQL servers for the development of a Football Statistics application. This division is motivated by distinct characteristics and optimal functionalities offered by each database management system (DBMS).

## Database Splitting Strategy

### MongoDB Allocation

MongoDB, a document-based NoSQL database, is allocated for storing data entities exhibiting the following characteristics:

1. **Dynamic Player Statistics (Appearances):**
   - MongoDB is chosen for the `appearances` collection due to its flexibility in handling dynamic updates to player statistics during matches or across different seasons. The schema-less nature of MongoDB allows for seamless modifications and additions to player statistics.
2. **Match-Specific Information (Club Games):**
   - The `club_games` collection, housing match-specific details, benefits from MongoDB's document-oriented structure. This facilitates efficient storage and retrieval of diverse match-related data.

### PostgreSQL Allocation

PostgreSQL, a robust relational database system, is designated for managing data entities with structured relationships and complex querying requirements:

1. **Structured Club Information (Clubs):**
   - The `clubs` table is stored in PostgreSQL due to its well-defined, structured nature. PostgreSQL's relational model ensures efficient storage and querying capabilities for club-related attributes and relationships.
2. **Event Tracking and Relationships (Game Events):**
   - The `game_events` table is housed in PostgreSQL to leverage its relational capabilities, especially in managing various event types tied to clubs and players. This allows for complex queries and analyses involving multiple entities.
3. **Structured Entities with Relationships:**
   - PostgreSQL accommodates tables like `competitions`, `games`, `players`, `player_valuations`, and `game_lineups` due to their structured nature and interdependencies. Utilizing PostgreSQL ensures strong data integrity and supports complex relational queries involving these entities.

## Assumptions on the Datasets

1. **Similar Attributes in `games` and `club_games`:** There appears to be some overlap in attributes between the `games` and `club_games` tables, possibly indicating a duplication of certain details for performance optimization or query simplification purposes.
2. **Domestic Competition ID per Club:** The `domestic_competition_id` for each club is assumed to refer to the latest competition in which the club participated. This assumption facilitates quick reference to the most recent domestic competition involvement for each club. Meaning that if one club played the same competition in two different moment in history, only the last one's reference will be stored

## Justification

The decision to split the databases is based on distinct features and optimal functionalities offered by MongoDB and PostgreSQL:

- **MongoDB Advantages:** Ideal for handling dynamic, evolving data structures, scalability, and flexibility for frequent updates.
- **PostgreSQL Advantages:** Robust support for structured, relational data, complex queries, and transactional operations ensuring data integrity and ACID compliance.

## Conclusion

The strategic allocation of data across MongoDB and PostgreSQL servers aims to optimize data storage, retrieval, and manipulation for the Football Statistics application. This approach ensures both flexibility and relational integrity based on the nature of the stored information.
