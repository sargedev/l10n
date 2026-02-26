
namespace l10n {

    interface SymbolTable {
        [key: string]: string;
    }

    export class Locale {
        code: string;
        name: string;
        sname: string;
        symbols: SymbolTable;

        constructor(code: string, name: string, sname: string, symbols?: SymbolTable) {
            this.code = code;
            this.name = name;
            this.sname = sname;
            this.symbols = symbols || {};
        }

        get(name: string) {
            return this.symbols[name];
        }

        register(name: string, value: string) {
            this.symbols[name] = value;
        }
    }

    let LOCALE: Locale = null;

    export function setLocale(locale: Locale) {
        LOCALE = locale;
    }

    export function removeLocale() {
        LOCALE = null;
    }

    export function getLocale() {
        return LOCALE;
    }

    export function isLocaleSet(): boolean {
        return !!LOCALE;
    }

    export function t(name: string, args?: string[]) {
        if (!LOCALE) throw "Language locale is undefined";
        return tl(LOCALE, name, args);
    }

    export function tl(locale: Locale, name: string, args?: string[]) {
        let result = locale.get(name);
        if (!result) throw `Identifier '${name}' not found in locale '${locale.code}'`;
        return text.format(result, args || []);
    }
}