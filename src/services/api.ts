const API_BASE = import.meta.env.DEV
    ? "/api-proxy"
    : "https://api.statch.io";

export type SignupResult =
    | { success: true }
    | { success: false; errorCode: string };

export const ApiService = {
    BETA_SIGNUP_URL: `${API_BASE}/api/Service/signup-to-beta-test`,
    MAX_RETRIES: 3,

    async signupToBeta(email: string, locale: string): Promise<SignupResult> {
        const body = JSON.stringify({ email, locale });

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

                if (response.ok) {
                    return { success: true };
                }

                // Try to extract error code from response body
                try {
                    const data = await response.json();
                    const errorCode = data?.errorCode || data?.error || data?.code || "unknown";
                    return { success: false, errorCode };
                } catch {
                    return { success: false, errorCode: "unknown" };
                }
            } catch (error) {
                console.warn(
                    `Statch API: Attempt ${attempt}/${this.MAX_RETRIES} failed:`,
                    error
                );

                if (attempt < this.MAX_RETRIES) {
                    const delay = 500 * Math.pow(2, attempt - 1);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                    console.error("Statch API: All retry attempts failed.");
                    return { success: false, errorCode: "network_error" };
                }
            }
        }

        return { success: false, errorCode: "unknown" };
    },
};
