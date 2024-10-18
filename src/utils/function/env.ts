import { config } from "dotenv"
config();

interface EnvConfig {
    string: string;
    number: number;
    boolean: boolean;
}

export function GetEnv<T extends keyof EnvConfig = "string">(
    key: string,
    type?: T
): EnvConfig[T] | undefined {
    const value = process.env[key];

    if (value === undefined || value === "") {
        return undefined;
    }

    if (type === "number") {
        const parsedNumber = parseInt(value, 10);
        return isNaN(parsedNumber) ? undefined : parsedNumber as EnvConfig[T];
    }

    if (type === "boolean") {
        if (value.toLowerCase() == "true") return true as EnvConfig[T];
        if (value.toLowerCase() == "false") return false as EnvConfig[T];
        return undefined;
    }

    return value as EnvConfig[T];
}
