interface Logger extends Intl.DateTimeFormatOptions {
    locales: Intl.LocalesArgument;
    timeZone: TimeZone
}


export type TimeZone =
    // Zonas horarias IANA comunes
    | "UTC"
    | "Africa/Abidjan"
    | "Africa/Accra"
    | "Africa/Addis_Ababa"
    | "Africa/Algiers"
    | "Africa/Cairo"
    | "Africa/Casablanca"
    | "America/New_York"
    | "America/Chicago"
    | "America/Denver"
    | "America/Los_Angeles"
    | "America/Anchorage"
    | "America/Halifax"
    | "America/Phoenix"
    | "America/Sao_Paulo"
    | "America/Bogota"
    | "America/Mexico_City"
    | "America/Costa_Rica" // Zona horaria de Costa Rica
    | "Asia/Kolkata"
    | "Asia/Shanghai"
    | "Asia/Tokyo"
    | "Asia/Dubai"
    | "Australia/Sydney"
    | "Europe/London"
    | "Europe/Paris"
    | "Europe/Berlin"
    | "Europe/Madrid"
    | "Europe/Rome"
    | "Europe/Moscow"
    | "Pacific/Auckland"
    // Desplazamientos UTC
    | `UTC${'+' | '-'}${TwoDigit}${TwoDigit}`
    | `UTC${'+' | '-'}${TwoDigit}:${TwoDigit}`
    | `UTC${'+' | '-'}${TwoDigit}`;

type TwoDigit = `${0 | 1 | 2}${number}`; // Representa los dos dígitos para horas (00-23) y minutos (00-59)


