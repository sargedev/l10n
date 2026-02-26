
/**
 * Provides library for localizing text in user projects
 */
//% color="#d10247" weight=0 icon="\uf1ab" block="Localization"
namespace l10n {

    export enum LocaleAttribute {
        Code,
        Name,
        //% block="Native name"
        Sname
    }

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

    //% blockId="l10n_newLocale"
    //% block="create language with code $code name $name || native name $sname"
    //% blockSetVariable=myLang
    //% code.defl="en-US"
    //% name.defl="English (US)"
    //% sname.defl="English (US)"
    //% weight=100
    /**
     * Creates new locale object
     * @param code Language code (ID)
     * @param name Language name in english
     * @param sname Native language name
     * @returns Locale object
     */
    export function newLocale(code: string, name: string, sname?: string): Locale {
        return new Locale(code, name, sname || name);
    }

    //% blockId="l10n_setKey"
    //% block="set $key in $locale = $value"
    //% locale.defl=myLang
    //% locale.shadow=variables_get
    //% key.defl="key"
    //% value.defl="value"
    //% weight=90
    /**
     * Sets key in language to a translated value
     * @param locale Language to update
     * @param key Key name
     * @param value Translation value (formatted string)
     */
    export function setKey(locale: Locale, key: string, value: string) {
        locale.register(key, value);
    }

    //% blockId=l10n_setLocale
    //% block="set language to $locale"
    //% locale.defl=myLang
    //% locale.shadow=variables_get
    //% weight=80
    /**
     * Sets current language
     * @param locale Language to set
     */
    export function setLocale(locale: Locale) {
        LOCALE = locale;
    }

    //% blockId=l10n_removeLocale
    //% block="unset current language"
    //% weight=50
    /**
     * Remove currently set language
     */
    export function removeLocale() {
        LOCALE = null;
    }

    //% blockId=l10n_getLocale
    //% block="get current language"
    //% weight=40
    /**
     * Gets currently set language
     * @returns Locale object
     */
    export function getLocale() {
        return LOCALE;
    }

    //% blockId="l10n_getLocaleAttribute"
    //% block="get $locale $attribute"
    //% locale.defl=myLang
    //% locale.shadow=variables_get
    //% weight=30
    /**
     * Get attribute of locale object
     * @param locale Locale object
     * @param attribute Enum member representing attribute (Code/Name/Native name)
     * @returns String value
     */
    export function getLocaleAttribute(locale: Locale, attribute: LocaleAttribute) {
        if (attribute == LocaleAttribute.Code) return locale.code;
        if (attribute == LocaleAttribute.Name) return locale.name;
        if (attribute == LocaleAttribute.Sname) return locale.sname;
        throw "Invalid attribute access";
    }

    //% blockId=l10n_isLocaleSet
    //% block="is language set"
    //% weight=20
    /**
     * Returns true if currently set locale object is a non-null value
     * @returns Boolean
     */
    export function isLocaleSet(): boolean {
        return !!LOCALE;
    }

    //% blockId=l10n_t
    //% block="localized $name || with args $args"
    //% name.defl="key"
    //% weight=70
    /**
     * Translate value by key in currently set language
     * @param name Key name
     * @param args (Optional) arguments to pass into formatted string
     * @returns Translated string
     */
    export function t(name: string, args?: string[]) {
        if (!LOCALE) throw "Language locale is undefined";
        return tl(LOCALE, name, args);
    }

    //% blockId=l10n_tl
    //% block="localized $name in language $locale || with args $args"
    //% locale.defl=myLang
    //% locale.shadow=variables_get
    //% name.defl="key"
    //% weight=60
    /**
     * Translate value by key in given language
     * @param locale Language to use
     * @param name Key name
     * @param args (Optional) arguments to pass into formatted string
     * @returns Translated string
     */
    export function tl(locale: Locale, name: string, args?: string[]) {
        let result = locale.get(name);
        if (!result) throw `Identifier '${name}' not found in locale '${locale.code}'`;
        return text.format(result, args || []);
    }
}