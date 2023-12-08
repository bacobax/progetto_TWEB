import json
import time
import pandas as pd
import numpy as np
from bson import ObjectId
from faker import Faker
DATA_FOLDER = "../../datasets/"
JSON_DATA_FOLDER = DATA_FOLDER + "json/"

fake = Faker()

read_csv = lambda file_name: pd.read_csv(DATA_FOLDER + file_name)


null_columns = lambda df: list(df.columns[df.isnull().any()])

datasets = [
        {"drop_id": None, "name": "new_games.csv"},
        { "drop_id": "appearance_id", "name": "new_appearances.csv"},
        {"drop_id": "game_event_id", "name": "game_events.csv"},
        { "drop_id": "game_lineups_id", "name": "game_lineups.csv"},
        { "drop_id": None, "name": "new_player_valuations.csv"},
    ]

def dropping_useless_ids(column_to_drop, df):
    """
    Drops the specified IDs from the DataFrame.

    This function drops the specified IDs from the DataFrame if the "drop_id" key in the dictionary "d" is not None.
    It returns the modified DataFrame.

    

    Args:
        d (dict): A dictionary containing the configuration parameters.
        df (pandas.DataFrame): The DataFrame to be modified.

    Returns:
        pandas.DataFrame: The modified DataFrame.
    """
    if column_to_drop is not None:
        return df.drop(column_to_drop, axis=1)
    return df

def csv_to_json():
    """
    Converts CSV files to JSON format.

    This function iterates over a list of datasets and converts each CSV file to JSON format.
    It reads the CSV file, drops useless IDs, and saves the resulting DataFrame as a JSON file.

    datasets is a list of object with this format:
    {
        "drop_id": "id_to_drop",\n
        "name": "file_name.csv"
    }
    
    Args:
        None

    Returns:
        None
    """
    for d in datasets:
        df = read_csv(d["name"])
        dropping_useless_ids(d["drop_id"],df)
        df.to_json(JSON_DATA_FOLDER + d["name"].replace(".csv", ".json"), orient="records")


#!TROPPO TEMPO DI ESECUZIONE

def map_id_games():
    """
    Maps the game IDs in the 'new_games.csv' file to new IDs generated using ObjectId.
    Saves the mapping dictionary in a JSON file.
    """
    games = read_csv("new_games.csv")

    games_id = [str(pippo) for pippo in list(np.unique(games["game_id"].values))]
    new_ids = [str(ObjectId()) for _ in range(len(games_id))]  # Generate new IDs

    games_id_dict = dict(zip(games_id, new_ids))

    # Save the dictionary in .json file
    with open(JSON_DATA_FOLDER + "games_id_mapping.json", "w") as file:
        json.dump(games_id_dict, file)



def get_dict_from_json(file_name):
    dict = None
    with open(JSON_DATA_FOLDER + file_name, "r") as file:
        dict = json.load(file)
    return dict



    


# def game_id_converting_to_mongodb_Object_id(d):
   
#     mapped_games_id = get_dict_from_json("games_id_mapping.json")

#     #for each key, foreach dataset, replace every cell containing the game_id with the new id

#     df = read_csv(d["name"])
#     print("processing " + d["name"])
#     for k in mapped_games_id.keys():
#         df["game_id"] = df["game_id"].astype(str)
#         df.loc[df["game_id"] == k, "game_id"] = mapped_games_id[k]


#     if d["drop_id"] is not None:
#         df = df.drop(d["drop_id"], axis=1)
#     df.to_json(JSON_DATA_FOLDER + d["name"].replace(".csv", ".json"), orient="records")

                


