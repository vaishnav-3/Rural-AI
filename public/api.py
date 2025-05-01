# api.py (Fixed Version)
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
from flask import Flask, request, jsonify
import numpy as np

# Load dataset
df = pd.read_csv("data/Maharashtra.csv")

def preprocess_data(df):
    from sklearn.preprocessing import LabelEncoder, MinMaxScaler
    
    # Drop unnecessary columns
    df.drop(columns=["File Upload Date", "Address"], errors='ignore', inplace=True)
    
    # Encode categorical variables
    label_encoders = {}
    for col in ["State", "District", "Block", "Habitation Name", "Facility Name", "Facility Category", "Facility Subcategory"]:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
    
    # Aggregate facility count per village
    facility_counts = df.groupby("Habitation ID")["Facility Name"].count().reset_index()
    facility_counts.rename(columns={"Facility Name": "Facility Count"}, inplace=True)
    df = df.merge(facility_counts, on="Habitation ID", how="left")
    
    # Normalize numerical features
    scaler = MinMaxScaler()
    df[["Lattitude", "Longitude", "Facility Count"]] = scaler.fit_transform(df[["Lattitude", "Longitude", "Facility Count"]])
    
    return df

df = preprocess_data(df)

# Define input (X) and target (y)
X = df[["State", "District", "Block", "Lattitude", "Longitude", "Facility Category", "Facility Count"]]
y = df["Facility Count"] * 100  # Scale score to 0-100 range

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost Model
xgb_model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=50, learning_rate=0.1, random_state=42)
xgb_model.fit(X_train, y_train)

# Evaluate model
mae = mean_absolute_error(y_test, xgb_model.predict(X_test))
print(f"Model Trained! MAE: {mae}")

# Save model
joblib.dump(xgb_model, "backend/readiness_model.pkl")

# Flask API to serve predictions
app = Flask(__name__)

# Load trained model
model = joblib.load("backend/readiness_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    required_keys = ["State", "District", "Block", "Lattitude", "Longitude", "Facility Category", "Facility Count"]
    
    # Validate input data
    if not all(key in data for key in required_keys):
        return jsonify({"error": "Missing required input fields"}), 400

    # Convert to NumPy array for prediction
    input_features = np.array([
        data["State"], data["District"], data["Block"],
        data["Lattitude"], data["Longitude"], data["Facility Category"], data["Facility Count"]
    ]).reshape(1, -1)

    readiness_score = model.predict(input_features)[0]
    
    return jsonify({"readiness_score": float(readiness_score)})

if __name__ == '__main__':
    app.run(debug=True)
