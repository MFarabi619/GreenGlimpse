CREATE TABLE YTDEmissions (
                              id INT PRIMARY KEY,
                              CompanyID INT NOT NULL,
                              Year INT NOT NULL,
                              Scope INT NOT NULL,
                              Category ENUM('Transportation', 'Electricity', 'Manufacturing', 'Storage', 'Waste', 'Other') NOT NULL,
                              CO2e DECIMAL(10, 2) NOT NULL,
                              CH4 DECIMAL(10, 2) NOT NULL,
                              N2O DECIMAL(10, 2) NOT NULL,
                              HFC DECIMAL(10, 2) NOT NULL,
                              Total DECIMAL(10, 2) NOT NULL,
                              LastUpdated DATETIME NOT NULL,
                              INDEX idx_CompanyID (CompanyID),
                              INDEX idx_Year (Year),
                              INDEX idx_Category (Category)
);
