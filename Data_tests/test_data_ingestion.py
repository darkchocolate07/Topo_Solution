import pytest
from DataHandler.data_ingestion import DataIngestion
import pandas as pd


# Test case 1: Valid JSON file
def test_load_json_with_valid_file():
    ingestion = DataIngestion()
    ingestion.load_json('./datasets/dataset1.json')  # Valid file

    data = ingestion.get_data()

    # Assert that 'json' is in the data dictionary
    assert 'json' in data
    # Assert that 'json' data is a DataFrame
    assert isinstance(data['json'], pd.DataFrame)
    # Assert that the DataFrame is not empty
    assert not data['json'].empty


# Test case 2: Invalid file extension
def test_load_json_with_invalid_extension():
    ingestion = DataIngestion()
    with pytest.raises(ValueError) as excinfo:
        ingestion.load_json('./datasets/dataset3.pdf')  # Invalid file

    # Assert that the error message contains 'Invalid file extension'
    assert "Invalid file extension" in str(excinfo.value)


# Test case 3: Missing or non-existent file
def test_load_json_with_non_existent_file():
    ingestion = DataIngestion()
    with pytest.raises(FileNotFoundError) as excinfo:
        ingestion.load_json('./datasets/non_existent.json')  # File does not exist

    # Assert that the error message contains 'No such file or directory'
    assert "File ./datasets/non_existent.json does not exist." in str(excinfo.value)
