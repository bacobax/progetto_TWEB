# progetto_TWEB

# Database Split Strategy for Football Statistics App

## Objective

The goal of this document is to outline the strategic allocation of data across MongoDB and PostgreSQL servers for the development of a Football Statistics application. This division is motivated by distinct characteristics and optimal functionalities offered by each database management system (DBMS).

## Database Splitting Strategy

### PostgreSQL (RDBMS) for Stable Structured Data:

- **Tables Stored:** Clubs, Competitions, Players
- **Reasoning:** These tables contain relatively stable, structured data with consistent schemas. PostgreSQL's relational model and SQL capabilities are well-suited for maintaining data integrity and executing complex queries efficiently. The data change rate is lower, leading to more static schemas.

### MongoDB (NoSQL) for Dynamic, Changing Data:

- **Collections Stored:** Apparences, Game Events, Game Lineups, Player Valuations, Games
- **Rationale:** These collections house data with varying structures or frequent changes in schema. MongoDB's document-oriented nature and flexibility in handling unstructured or semi-structured data make it ideal for accommodating dynamic data structures, where change rates are higher and schemas might evolve over time.

### Decision Justification Based on Change Rate:

- **Data Volatility:** PostgreSQL is chosen for relatively stable data with lower change rates, ensuring consistency and reliability in a more static schema environment.
  
- **Schema Evolution:** MongoDB's flexibility suits the dynamic nature of data, where schemas might evolve frequently or have diverse structures due to higher change rates.
  
- **Adaptability to Change:** MongoDB's document-based storage easily adapts to evolving schema, allowing for seamless updates without compromising data integrity.

## Conclusion

The strategic allocation of data across MongoDB and PostgreSQL servers aims to optimize data storage, retrieval, and manipulation for the Football Statistics application. This approach ensures both flexibility and relational integrity based on the nature of the stored information.
