const axios = require("axios");

const apiKey = process.env.CLAUDE_API_KEY;
const baseURL = "https://api.anthropic.com/v1/messages";

// Check if API key is available
if (!apiKey) {
  console.error("ClaudeService: CLAUDE_API_KEY environment variable is not set!");
}

const getDocumentSchemas = () => {
  return {
    id_card: {
      fields: {
        firstName: "First name or given name",
        lastName: "Last name or surname",
        middleName: "Middle name or initial",
        dateOfBirth: "Date of birth",
        gender: "Gender or sex",
        nationality: "Nationality or citizenship",
        documentNumber: "Document number or ID number",
        issueDate: "Issue date",
        expiryDate: "Expiry date or expiration date",
        issuingAuthority: "Issuing authority or country",
        address: "Address",
        photo: "Photo or image",
      },
    },
    insurance_card: {
      fields: {
        memberName: "Member name or policyholder name",
        memberId: "Member ID or policy number",
        groupNumber: "Group number",
        planType: "Plan type or coverage type",
        effectiveDate: "Effective date",
        expiryDate: "Expiry date or end date",
        insuranceProvider: "Insurance provider or company name",
        copay: "Copay amount",
        deductible: "Deductible amount",
        rxBin: "RX BIN number",
        rxPCN: "RX PCN number",
        rxGroup: "RX Group number",
      },
    },
    medical_record: {
      fields: {
        patientName: "Patient name",
        dateOfService: "Date of service or visit date",
        diagnosis: "Diagnosis or medical condition",
        treatment: "Treatment or procedure",
        medication: "Medication or prescription",
        doctorName: "Doctor or physician name",
        hospitalName: "Hospital or facility name",
        labResults: "Lab results or test results",
        vitalSigns: "Vital signs",
        allergies: "Allergies or allergic reactions",
        notes: "Medical notes or comments",
      },
    },
    driver_license: {
      fields: {
        firstName: "First name or given name",
        lastName: "Last name or surname",
        middleName: "Middle name or initial",
        dateOfBirth: "Date of birth",
        gender: "Gender or sex",
        address: "Address",
        licenseNumber: "License number or DL number",
        issueDate: "Issue date",
        expiryDate: "Expiry date or expiration date",
        issuingState: "Issuing state or authority",
        restrictions: "Restrictions or endorsements",
        class: "License class or type",
      },
    },
  };
};

const buildMappingPrompt = (textractResults, schema) => {
  const keyValuePairs = textractResults.keyValuePairs || {};
  const fullText = textractResults.text || "";

  const expectedFields = Object.entries(schema.fields)
    .map(([key, description]) => `${key}: ${description}`)
    .join("\n");

  return `You are an expert document parser. I have extracted text from a document using AWS Textract and need you to map the extracted fields to a standardized schema.

EXTRACTED TEXT:
${fullText}

EXTRACTED KEY-VALUE PAIRS:
${JSON.stringify(keyValuePairs, null, 2)}

EXPECTED FIELDS TO MAP TO:
${expectedFields}

INSTRUCTIONS:
1. Analyze the extracted text and key-value pairs
2. Map the extracted information to the expected fields
3. Use your understanding of document types to intelligently match fields
4. If a field is not found, leave it as null
5. For dates, try to standardize the format to YYYY-MM-DD if possible
6. For names, separate first, middle, and last names appropriately
7. Return ONLY a valid JSON object with the mapped fields

RESPONSE FORMAT:
{
  "firstName": "extracted value or null",
  "lastName": "extracted value or null",
  ...
}

Return only the JSON object, no additional text or explanations.`;
};

const parseClaudeResponse = (response) => {
  try {
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in Claude response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Clean up the response - remove null values and empty strings
    const cleaned = {};
    Object.entries(parsed).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        cleaned[key] = value;
      }
    });

    return cleaned;
  } catch (error) {
    console.error("ClaudeService [parseClaudeResponse] Error:", error);
    throw new Error("Failed to parse AI response");
  }
};

const mapDocumentFields = (textractResults, documentType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!apiKey) {
        return reject(new Error("Claude API key is not configured"));
      }

      const schemas = getDocumentSchemas();
      const schema = schemas[documentType];

      if (!schema) {
        return reject(new Error(`Unknown document type: ${documentType}`));
      }

      const prompt = buildMappingPrompt(textractResults, schema);

      console.log("ClaudeService: Making API request to:", baseURL);
      console.log("ClaudeService: API Key present:", !!apiKey);
      console.log("ClaudeService: API Key length:", apiKey ? apiKey.length : 0);

      const requestData = {
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      };

      console.log("ClaudeService: Request data:", JSON.stringify(requestData, null, 2));

      const response = await axios.post(baseURL, requestData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        timeout: 30000, // 30 second timeout
      });

      console.log("ClaudeService: Response received, status:", response.status);
      const result = response.data.content[0].text;
      const parsedResult = parseClaudeResponse(result);
      resolve(parsedResult);
    } catch (error) {
      console.error("ClaudeService [mapDocumentFields] Error:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
      }
      reject(new Error("Failed to process document with AI"));
    }
  });
};

const detectDocumentType = (textractResults) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!apiKey) {
        console.warn("ClaudeService: API key not available, using default document type");
        return resolve("id_card"); // Default fallback
      }

      const prompt = `Analyze the following document text and determine what type of document this is. 

EXTRACTED TEXT:
${textractResults.text || ""}

KEY-VALUE PAIRS:
${JSON.stringify(textractResults.keyValuePairs || {}, null, 2)}

DOCUMENT TYPES:
- id_card: Government-issued ID cards, passports, national IDs
- insurance_card: Health insurance cards, medical insurance
- medical_record: Medical reports, lab results, doctor notes
- driver_license: Driver's license or driving permit

Return ONLY the document type as a string (e.g., "id_card", "insurance_card", etc.). If uncertain, return "id_card" as default.`;

      console.log("ClaudeService: Making document type detection request");

      const requestData = {
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      };

      const response = await axios.post(baseURL, requestData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        timeout: 30000, // 30 second timeout
      });

      console.log("ClaudeService: Document type detection response received, status:", response.status);
      const result = response.data.content[0].text.trim().toLowerCase();

      // Validate the response
      const validTypes = ["id_card", "insurance_card", "medical_record", "driver_license"];
      if (validTypes.includes(result)) {
        resolve(result);
      } else {
        resolve("id_card"); // Default fallback
      }
    } catch (error) {
      console.error("ClaudeService [detectDocumentType] Error:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
      }
      resolve("id_card"); // Default fallback
    }
  });
};

module.exports = {
  mapDocumentFields,
  detectDocumentType,
};
