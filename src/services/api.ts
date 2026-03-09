export const ApiService = {
    BETA_SIGNUP_URL: "https://dev-api.statch.io/api/Service/signup-to-beta-test",

    async signupToBeta(email: string, platform: string): Promise<boolean> {
        try {
            const response = await fetch(this.BETA_SIGNUP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    platform: platform
                })
            });
            return response.ok;
        } catch (error) {
            console.error("API Error:", error);
            return false;
        }
    }
};
