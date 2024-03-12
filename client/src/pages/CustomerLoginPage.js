import React, { useState } from "react";
import "../styles/CustomerLoginPage.css";
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerLoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerAllergies, setCustomerAllergies] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:9000/customer/", {customerName}, {customerAllergies});
      navigate("/menu");
      console.log(customerAllergies.toString());
    }
    
    catch (err) {
      console.log(err);
    }
  };
  const handleAllergyChange = (allergy) => {
    if (customerAllergies.includes(allergy)) {
      setCustomerAllergies(customerAllergies.filter((a) => a !== allergy));
    } else {
      setCustomerAllergies([...customerAllergies, allergy]);
    }
    console.log(customerAllergies);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
      <Helmet>
        <title>Oaxaca | Customer Login</title>
      </Helmet>
      </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        <label> Allergies:</label>
        <div>
          <input
            type="checkbox"
            id="allergy1"
            value="Dairy"
            checked={customerAllergies.includes("Dairy")}
            onChange={() => handleAllergyChange("Dairy")}
          />
          <label htmlFor="allergy1">Dairy</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="allergy2"
            value="Gluten"
            checked={customerAllergies.includes("Gluten")}
            onChange={() => handleAllergyChange("Gluten")}
          />
          <label htmlFor="allergy2">Gluten</label>
          <div>
          <input
            type="checkbox"
            id="allergy1"
            value="Nuts"
            checked={customerAllergies.includes("Nuts")}
            onChange={() => handleAllergyChange("Nuts")}
          />
          <label htmlFor="allergy1">Nuts</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="allergy2"
            value="Shellfish"
            checked={customerAllergies.includes("Shellfish")}
            onChange={() => handleAllergyChange("Shellfish")}
          />
          <label htmlFor="allergy2">Shellfish</label>
        </div>
          <div className="text-right">
            <button className="login-button" type="submit">
              Guest Login
            </button>
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default CustomerLoginPage;