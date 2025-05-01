# model_training.py (Train the XGBoost model)
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib

# Load dataset
df = pd.read_csv("data/Maharashtra.csv")

def preprocess_data(df):
    from sklearn.preprocessing import LabelEncoder, MinMaxScaler
    
    # Drop unnecessary columns
    df = df.drop(columns=["File Upload Date", "Address"], errors='ignore')
    
    # Encode categorical variables
    label_encoders = {}
    for col in ["State", "District", "Block", "Habitation Name", "Facility Name", "Facility Category", "Facility Subcategory"]:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
    
    # Count facilities per village
    facility_counts = df.groupby("Habitation ID")["Facility Name"].count().reset_index()
    facility_counts.rename(columns={"Facility Name": "Facility Count"}, inplace=True)
    df = df.merge(facility_counts, on="Habitation ID", how="left")
    
    # Normalize latitude & longitude
    scaler = MinMaxScaler()
    df[["Lattitude", "Longitude"]] = scaler.fit_transform(df[["Lattitude", "Longitude"]])
    
    return df

df = preprocess_data(df)

# Define X and y
X = df[["State", "District", "Block", "Lattitude", "Longitude", "Facility Category", "Facility Count"]]
y = (df["Facility Count"] - df["Facility Count"].min()) / (df["Facility Count"].max() - df["Facility Count"].min()) * 100

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost Model
xgb_model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=30, learning_rate=0.1, random_state=42)
xgb_model.fit(X_train, y_train)

# Evaluate model
mae = mean_absolute_error(y_test, xgb_model.predict(X_test))
print(f"Model Trained! MAE: {mae}")

# Save model
joblib.dump(xgb_model, "backend/readiness_model.pkl")