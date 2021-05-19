import axios from "axios";

export default axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
  timeoutErrorMessage: "Request timeout. Server took too long to respond.",
});
