# tests/test_data_processing.py
import pandas as pd
from DataHandler.data_processing import DataProcessor

def test_process_json():
    sample_data = {
        "json": pd.DataFrame({
            "hired_date": ["2023-01-01", None],
            "revenue": [None, 1000]
        })
    }
    processor = DataProcessor(sample_data)
    processor.process_json()

    processed_data = processor.data["json"]
    assert not processed_data["hired_date"].isnull().any()
    assert processed_data["revenue"].isnull().sum() == 0
