export const ApiService = {
    BETA_SIGNUP_URL: "https://dev-api.statch.io/api/Service/signup-to-beta-test",

    async signupToBeta(email: string, platform: string): Promise<boolean> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        try {
            const response = await fetch(this.BETA_SIGNUP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    platform: platform
                }),
                signal: controller.signal
            });
            return response.ok;
        } catch (error) {
            console.error("API Error:", error);
            return false;
        } finally {
            clearTimeout(timeout);
        }
    }
};
