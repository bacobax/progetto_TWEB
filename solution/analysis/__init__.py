import pandas as pd
from pymongo import MongoClient
import psycopg2

db_constants = {
    'host': 'localhost',
    'port': 27017,
    'db': 'progetto_TWEB',
}

"""
a function that read from mongodb and return a dataframe in pandas
"""


def read_from_mongo(collection, query={}, host=db_constants['host'], port=db_constants['port'], db=db_constants['db']):
    # Connect to MongoDB
    conn = MongoClient(host, port)
    db = conn[db]
    # Make a query to the specific DB and Collection
    cursor = db[collection].find(query)
    # Expand the cursor and construct the DataFrame
    df = pd.DataFrame(list(cursor))
    # Delete the _id

    return df


"""
a function that read from postgresql and return a dataframe in pandas

"""
postgres_constants = {
    'host': 'localhost',
    'port': 5432,
    'db': 'goal-grapher',
}

clubs_columns = ["_id", "average_age", "club_code", "coach_name", "domestic_competition_id", "foreigners_number", "foreigners_percentage", "last_season", "name", "national_team_players", "net_transfer_record", "squad_size", "stadium_name", "stadium_seats", "total_market_value", "url"]
competitions_columns = ["competition_code" , "_id" , "confederation" , "country_id", "country_name", "domestic_league_code", "name", "sub_type", "type", "url"]


def read_from_postgre(table, query=None, host=postgres_constants['host'], port=postgres_constants['port'], db=postgres_constants['db']):

    if query is None:
        query = {}
    conn = psycopg2.connect(host=host, port=port, database=db, user="postgres", password="")
    cur = conn.cursor()
    cur.execute("SELECT * FROM " + table)
    rows = cur.fetchall()
    df = pd.DataFrame(rows)
    return df

