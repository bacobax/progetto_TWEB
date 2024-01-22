from typing import Any, List, Union
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
        #{ "drop_id": "appearance_id", "name": "new_appearances.csv"},
        #{"drop_id": "game_event_id", "name": "game_events.csv"},
        #{ "drop_id": "game_lineups_id", "name": "game_lineups.csv"},
        #{ "drop_id": None, "name": "new_player_valuations.csv"},
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
        if d["drop_id"] is not None:
            df = df.drop(d["drop_id"], axis=1)
            
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


def map_id_players():
    """
    Maps the player IDs in the 'new_players.csv' file to new IDs generated using ObjectId.
    Saves the mapping dictionary in a JSON file.
    """
    players = read_csv("new_players.csv")

    players_id = [str(pippo) for pippo in list(np.unique(players["player_id"].values))]
    new_ids = [str(ObjectId()) for _ in range(len(players_id))]  # Generate new IDs

    players_id_dict = dict(zip(players_id, new_ids))

    # Save the dictionary in .json file
    with open(JSON_DATA_FOLDER + "players_id_mapping.json", "w") as file:
        json.dump(players_id_dict, file)


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

                


def clean_foreign_keys(dataset_p_k: pd.DataFrame, p_k: str, dataset_f_k: pd.DataFrame, f_k: str) -> pd.DataFrame:
    """
    Removes rows from a dataset that have foreign keys that do not exist in the corresponding primary key dataset.

    Args:
        dataset_p_k (pd.DataFrame): The dataset containing the primary key column.
        p_k (str): The name of the primary key column in `dataset_p_k`.
        dataset_f_k (pd.DataFrame): The dataset containing the foreign key column.
        f_k (str): The name of the foreign key column in `dataset_f_k`.

    Returns:
        pd.DataFrame: The filtered dataset that only contains rows with valid foreign keys.
    """
    # Create a set of unique values from the primary key column in `dataset_p_k`
    p_keys = set(dataset_p_k[p_k])

    # Create a set of unique values from the foreign key column in `dataset_f_k`
    f_keys = set(dataset_f_k[f_k])

    # Find the foreign keys that do not have a corresponding value in the primary key set
    invalid_f_keys = f_keys - p_keys

    print(f"Ci sono chiavi invalide: {len(invalid_f_keys)}")

    # Filter out the rows in `dataset_f_k` that have invalid foreign keys
    new_dataset_f_k = dataset_f_k[~dataset_f_k[f_k].isin(invalid_f_keys)]

    return new_dataset_f_k