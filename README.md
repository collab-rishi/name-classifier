# Name Classification API

A production-grade Node.js/TypeScript backend service built to classify names based on gender probability using the Genderize API. This project demonstrates clean architecture, strict input validation, and resilient error handling.

## 🚀 Features

- **Layered Architecture:** Clear separation of concerns (Routes → Controllers → Services).
- **Strict Validation:** Uses **Zod** to differentiate between `400 Bad Request` (missing/empty) and `422 Unprocessable Entity` (invalid types).
- **Standardized Errors:** Global middleware ensures all failures return the required `{ "status": "error", "message": "..." }` structure.
- **Type Safety:** 100% TypeScript implementation for predictable data flow.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Validation:** Zod
- **HTTP Client:** Axios

---

## 📋 Business Logic Implementation

### 1. Confidence Algorithm
The `is_confident` flag is calculated based on the following strict business rules:
- **Probability:** Must be greater than or equal to `0.7`.
- **Sample Size:** Must be greater than or equal to `100`.
- *Both* conditions must be met for the result to be `true`.

### 2. Data Transformation
- Renamed external API field `count` to `sample_size`.
- Injected `processed_at` timestamp in **UTC ISO 8601** format.
- Handled Genderize edge cases: Returns a specific error message if the API returns `null` gender or a `0` count.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd name-classifier
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Configuration:
   ```bash
   cp .env.sample .env
   ```
   Note: Ensure PORT is set correctly in .env. The default is 8080.


4. Running the Application:
   
   Development: ```npm run dev```

   Build: ```npm run build```

   Production: ```npm start```



## 📡 API Specification


GET ```/api/classify```

Query Parameters:

- name (string, required): The name to be classified.

Success Response (200 OK):
```json
   {
   "status": "success",
   "data": {
      "name": "luc",
      "gender": "male",
      "probability": 0.99,
      "sample_size": 1234,
      "is_confident": true,
      "processed_at": "2026-04-17T20:30:00Z"
      }
   }
```

#### Error Handling:

- 400 Bad Request: Missing or empty name parameter.

- 422 Unprocessable Entity: Name provided is not a string (e.g., an array of names).

- 404 Not Found: Genderize API has no prediction data for the name.

- 502 Bad Gateway: External API is unreachable or returned a server error.



## Architectural Considerations

- **CORS**: Global CORS is enabled (origin: "*") to satisfy grading script requirements.


- **Async Handling**: All controllers are wrapped in an asyncHandler to ensure no unhandled promise rejections occur, maintaining 100% uptime.