import axios from "axios";
import { ApiError } from "../utils/ApiError";

export class GenderService {
  private static readonly API_URL = "https://api.genderize.io";

  static async classifyName(name: string) {
    try {
      const response = await axios.get(`${this.API_URL}?name=${name}`, {
      
        headers: {
          "User-Agent": "NameClassifier/1.0",
          "Accept": "application/json"
        },
        timeout: 5000 
      });

      const { gender, probability, count, name: returnedName } = response.data;

      
      if (gender === null || count === 0) {
        throw new ApiError(404, "No prediction available for the provided name");
      }

      const is_confident = probability >= 0.7 && count >= 100;

      return {
        name: returnedName || name,
        gender,
        probability,
        sample_size: count,
        is_confident,
        processed_at: new Date().toISOString(),
      };
    } catch (error: any) {
      
      if (error instanceof ApiError) throw error;

      
      if (axios.isAxiosError(error)) {
        console.error("Genderize API Debug:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });

       
        if (error.response?.status === 429) {
          throw new ApiError(429, "External API rate limit reached. Please try again later.");
        }
      } else {
        console.error("Internal Service Error:", error.message);
      }

      
      throw new ApiError(502, "External API service unavailable or returned an error");
    }
  }
}