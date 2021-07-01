interface IMailConfig {
    driver: "ethereal" | "ses";
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || "ethereal",
    defaults: {
        from: {
            email: "bruno.s@brunodev.org",
            name: "Bruno dev",
        },
    },
} as IMailConfig;
