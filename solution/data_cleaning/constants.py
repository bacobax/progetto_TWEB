import pandas as pd

DATA_FOLDER = "../../datasets/"


def read_csv(file_name):
    return pd.read_csv(DATA_FOLDER + file_name)

