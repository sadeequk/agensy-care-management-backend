const axios = require("axios");

const apiKey = process.env.CLAUDE_API_KEY;
const baseURL = "https://api.anthropic.com/v1/messages";

// testing
if (!apiKey) {
  console.error("ClaudeService: CLAUDE_API_KEY environment variable is not set!");
}

const getDocumentSchemas = () => {
  return {
    id_card: {
      fields: {
        first_name: "First name or given name",
        last_name: "Last name or surname",
        date_of_birth: "Date of birth",
        gender: "Gender or sex",
        nationality: "Nationality or citizenship",
        document_number: "Document number or ID number",
        issue_date: "Issue date",
        expiry_date: "Expiry date or expiration date",
        issuing_authority: "Issuing authority or country",
        address: "Address",
      },
    },
    insurance_card: {
      fields: {
        member_name: "Member name or policyholder name",
        member_id: "Member ID or policy number",
        group_number: "Group number",
        plan_type: "Plan type or coverage type",
        effectiveDate: "Effective date",
        expiry_date: "Expiry date or end date",
        insurance_provider: "Insurance provider or company name",
        copay: "Copay amount",
        deductible: "Deductible amount",
        rxBin: "RX BIN number",
        rxPCN: "RX PCN number",
        rxGroup: "RX Group number",
      },
    },
    medical_record: {
      fields: {
        patient_name: "Patient name",
        date_of_service: "Date of service or visit date",
        diagnosis: "Diagnosis or medical condition",
        treatment: "Treatment or procedure",
        medication_name: "Medication or prescription",
        doctor_name: "Doctor or physician name",
        hospital_name: "Hospital or facility name",
        lab_results: "Lab results or test results",
        vital_signs: "Vital signs",
        allergies: "Allergies or allergic reactions",
        notes: "Medical notes or comments",
      },
    },
    driver_license: {
      fields: {
        first_name: "First name or given name",
        last_name: "Last name or surname",
        middle_name: "Middle name or initial",
        date_of_birth: "Date of birth",
        gender: "Gender or sex",
        address: "Address",
        license_number: "License number or DL number",
        issue_date: "Issue date",
        expiry_date: "Expiry date or expiration date",
        issuing_state: "Issuing state or authority",
        restrictions: "Restrictions or endorsements",
        class_type: "License class or type",
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

exports.mapDocumentFields = (textractResults, documentType) => {
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
      console.log("ClaudeService: Document type:", documentType);

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

      // console.log("ClaudeService: Request data:", JSON.stringify(requestData, null, 2));

      const response = await axios.post(baseURL, requestData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        timeout: 30000, // 30 second timeout
      });

      // console.log("ClaudeService: Response received, status:", response.status);
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
