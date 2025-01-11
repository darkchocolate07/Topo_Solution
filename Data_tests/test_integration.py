# tests/test_integration.py
from DataHandler.data_ingestion import DataIngestion
from DataHandler.data_processing import DataProcessor

def test_end_to_end():
    # Step 1: Load data
    ingestion = DataIngestion()
    ingestion.load_json('./datasets/dataset1.json')
    ingestion.load_csv('./datasets/dataset2.csv')
    data = ingestion.get_data()

    # Step 2: Process data
    processor = DataProcessor(data)
    processor.process_json()
    processor.process_csv()

    processed_data = processor.data
    assert "json" in processed_data
    assert "csv" in processed_data
    assert not processed_data["json"].empty
    assert not processed_data["csv"].empty
