export class Utilities {

    /**
     * Converts XML string to XMLDocument (if XMLDocument support by the interpretor/language).
     * 
     * If not supported, returns XML string.
     * @param xml XML string to convert
     */
    public static FromXmlStringToXMLDocument(xml: string): XMLDocument | string {
        if (typeof XMLDocument === "undefined" || typeof DOMParser === "undefined")
            return xml;

        let document = new XMLDocument();
        let parser = new DOMParser();
        document = parser.parseFromString(xml, "application/xml");
        return document;
    }
    /**
     * Converts XMLDocument (if XMLDocument support by the interpretor/language) to XML string
     * 
     * If not supported, returns XML string.
     * @param xml XML string to convert
     */
    public static FromXMLDocumentToXMLString(xml: XMLDocument | string): string {
        if (typeof xml === "string")
            return xml;

        if (typeof XMLDocument !== "undefined" && typeof XMLSerializer !== "undefined")
            return new XMLSerializer().serializeToString(xml);

        return (xml.textContent !== null) ? xml.textContent : ""; // ??
    }


    /**
     * Converts a string to camelCase
     * @param str String to convert
     * @return Camel cased string
     */
    public static ToCamelCase(str: string): string {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }



}