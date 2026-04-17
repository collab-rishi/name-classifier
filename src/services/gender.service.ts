import axios from "axios";
import { ApiError } from "../utils/ApiError";

export class GenderService {
  private static readonly API_URL = "https://api.genderize.io";

  
  static async classifyName(name: string) {
    try {
      const response = await axios.get(`${this.API_URL}?name=${name}`);
      const { gender, probability, count } = response.data;

      if (gender === null || count === 0) {
        throw new ApiError(404, "No prediction available for the provided name");
      }

      const is_confident = probability >= 0.7 && count >= 100;

      return {
        name,
        gender,
        probability,
        sample_size: count,
        is_confident,
        processed_at: new Date().toISOString(), 
      };
    } catch (error: any) {
      if (error instanceof ApiError) throw error;

      
      throw new ApiError(502, "External API service unavailable or returned an error");
    }
  }
}