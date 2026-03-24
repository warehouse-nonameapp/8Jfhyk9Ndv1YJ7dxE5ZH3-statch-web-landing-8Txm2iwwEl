const API_BASE = import.meta.env.DEV
    ? "/api-proxy"
    : "https://dev-api.statch.io";

export const ApiService = {
    BETA_SIGNUP_URL: `${API_BASE}/api/Service/signup-to-beta-test`,
    MAX_RETRIES: 3,

    async signupToBeta(email: string): Promise<boolean> {
        const body = JSON.stringify({ email });

        for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
            try {
                const response = await fetch(this.BETA_SIGNUP_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body,
                    mode: "cors",
                    credentials: "omit",
                });
                return response.ok;
            } catch (error) {
                console.warn(
                    `Statch API: Attempt ${attempt}/${this.MAX_RETRIES} failed:`,
                    error
                );

                if (attempt < this.MAX_RETRIES) {
                    // Exponential backoff: 500ms, 1500ms
                    const delay = 500 * Math.pow(2, attempt - 1);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                    console.error("Statch API: All retry attempts failed.");
                    return false;
                }
            }
        }

        return false;
    },
};
