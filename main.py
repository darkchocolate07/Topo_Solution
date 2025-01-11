from DataHandler.data_ingestion import DataIngestion
from DataHandler.data_processing import DataProcessor
import json

if __name__ == "__main__":
    # Define dataset types and their file paths
    datasets = ["json", "csv", "pdf", "ppt"]
    dataset_paths = {
        "json": "datasets/dataset1.json",
        "csv": "datasets/dataset2.csv",
        "pdf": "datasets/dataset3.pdf",
        "ppt": "datasets/dataset4.pptx",
    }
    output_file = "unified_dataset.json"

    # Step 1: Ingest data
    ingestion = DataIngestion()
    for dataset in datasets:
        load_method = getattr(ingestion, f"load_{dataset}", None)  # Dynamically call the appropriate load method
        if callable(load_method):
            load_method(dataset_paths[dataset])
    data = ingestion.get_data()

    # Step 2: Process data
    processor = DataProcessor(data)
    for dataset in datasets:
        process_method = getattr(processor, f"process_{dataset}", None)  # Dynamically call the appropriate process method
        if callable(process_method):
            process_method()
    processed_data = processor.convert_timestamps()

    # Step 3: Combine all datasets into a unified JSON structure
    unified_dataset = {
        key: df.to_dict(orient="records") for key, df in processed_data.items()
    }

    # Step 4: Save the unified dataset
    with open(output_file, "w") as f:
        json.dump(unified_dataset, f, indent=4)

    # Notify user
    print(f"Unified dataset saved to {output_file}")


