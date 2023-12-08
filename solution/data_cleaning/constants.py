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

mongodb_datasets = [
    {
        "name" : "new_appearances.csv",
        "dropping_id" : "appearance_id"
     },
     {
         "name" : "new_games.csv",
        "dropping_id" : None
     },
    {
        "name" : "game_events.csv",
        "dropping_id" : "game_event_id"
    },
    {
        "name" : "game_lineups.csv",
        "dropping_id" : "game_lineups_id"
    },
    {
        "name" : "new_player_valuations.csv",
        "dropping_id" : None
    },
    
]

def csv_to_json():
    for file_name in mongodb_datasets:
        df = read_csv(file_name["name"])
        if file_name["dropping_id"] is not None:
            df= df.drop(file_name["dropping_id"], axis=1)
        df.to_json(JSON_DATA_FOLDER + file_name["name"].replace(".csv", ".json"), orient="records")


#!TROPPO TEMPO DI ESECUZIONE

def game_id_converting_to_mongodb_Object_id():
    games = read_csv("new_games.csv")
    appearances = read_csv("new_appearances.csv")
    game_events = read_csv("game_events.csv")
    game_lineups = read_csv("game_lineups.csv")

    datasets = [
        {"d": appearances, "drop_id": "appearance_id", "name": "new_appearances.csv"},
        {"d": game_events, "drop_id": "game_event_id", "name": "game_events.csv"},
        {"d": game_lineups, "drop_id": "game_lineups_id", "name": "game_lineups.csv"},
        {"d": games, "drop_id": None, "name": "new_games.csv"}
    ]

    for d in datasets:
        d["d"].to_json(JSON_DATA_FOLDER + "pre_" + d["name"].replace(".csv", ".json"), orient="records")

    games_id = np.unique(games["game_id"].values)


    new_ids = [str(ObjectId()) for _ in range(len(games_id))]  # Generate new IDs
    c=0

    for old_value, new_id in zip(games_id, new_ids):
        #start time
        start = time.time()
        for d in datasets:
            
            mask = d["d"]["game_id"] == old_value
            d["d"].loc[mask, "game_id"] = new_id
        
        end = time.time()
        total = end-start
        #print end time
        c+=1
        print(f"REMAINING: {len(games_id)-c} | TIME: {total}")

    for d in datasets:
        if d["drop_id"] is not None:
            d["d"] = d["d"].drop(d["drop_id"], axis=1)
        d["d"].to_json(JSON_DATA_FOLDER + d["name"].replace(".csv", ".json"), orient="records")
