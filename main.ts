
/**
 * Provides library for localizing text in user projects
 */
//% color="#d10247" weight=0 icon="\uf1ab" block="Localization"
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

    //% blockId=l10n_setLocale
    //% block="set language to $locale"
    //% locale.defl=myLang
    //% locale.shadow=variables_get
    export function setLocale(locale: Locale) {
        LOCALE = locale;
    }

    //% blockId=l10n_removeLocale
    //% block="unset current language"
    export function removeLocale() {
        LOCALE = null;
    }

    //% blockId=l10n_getLocale
    //% block="get current language"
    export function getLocale() {
        return LOCALE;
    }

    //% blockId=l10n_isLocaleSet
    //% block="is language set"
    export function isLocaleSet(): boolean {
        return !!LOCALE;
    }

    //% blockId=l10n_t
    //% block="localized $name || with args $args"
    export function t(name: string, args?: string[]) {
        if (!LOCALE) throw "Language locale is undefined";
        return tl(LOCALE, name, args);
    }

    //% blockId=l10n_tl
    //% block="localized $name in language $locale || with args $args"
    //% locale.defl=myLang
    //% locale.shadow=variables_get
    export function tl(locale: Locale, name: string, args?: string[]) {
        let result = locale.get(name);
        if (!result) throw `Identifier '${name}' not found in locale '${locale.code}'`;
        return text.format(result, args || []);
    }
}