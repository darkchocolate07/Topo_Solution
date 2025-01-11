import pandas as pd
import json


class DataProcessor:
    """
    Handles processing and cleaning of datasets.
    """

    def __init__(self, data):
        self.data = data

    def process_json(self):
        df = self.data["json"]
        df["hired_date"] = pd.to_datetime(
            df["hired_date"].fillna("1900-01-01"), errors="coerce"
        )
        df["revenue"] = df["revenue"].fillna(0).infer_objects().astype(int)
        self.data["json"] = df

    def process_csv(self):
        df = self.data["csv"]
        df["Revenue"] = df["Revenue"].astype(float)
        self.data["csv"] = df

    def process_pdf(self):
        self.data["pdf"] = self.data["pdf"]

    def process_ppt(self):
        df = self.data["ppt"]
        self.data["ppt"] = df.rename(columns=lambda x: x.strip())

    def convert_timestamps(self):
        """
        Converts datetime columns to strings for JSON serialization.
        """
        for key, df in self.data.items():
            for column in df.columns:
                if pd.api.types.is_datetime64_any_dtype(df[column]):
                    df[column] = df[column].astype(str)
        return self.data


class UnifiedDataset:
    """
    Combines all processed datasets into a unified JSON structure.
    """

    def __init__(self, data):
        self.data = data

    def save_to_json(self, output_file):
        unified_dataset = {
            key: df.to_dict(orient="records") for key, df in self.data.items()
        }
        with open(output_file, "w") as f:
            json.dump(unified_dataset, f, indent=4)
        print(f"Unified dataset saved to {output_file}")
