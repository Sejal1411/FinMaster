import { Inngest } from "inngest";

export const inngest = new Inngest({ 
    id: "finmaster", 
    name: "Finmaster", 
    retryFunction: async (attempt) => ({
        delay: Math.pow(2, attempt) * 1000,
        maxAttempts: 2,
    }),
});