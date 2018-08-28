/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.RendererParams = (function() {

    /**
     * Properties of a RendererParams.
     * @exports IRendererParams
     * @interface IRendererParams
     * @property {string|null} [url] RendererParams url
     * @property {string|null} [lang] RendererParams lang
     */

    /**
     * Constructs a new RendererParams.
     * @exports RendererParams
     * @classdesc Represents a RendererParams.
     * @implements IRendererParams
     * @constructor
     * @param {IRendererParams=} [properties] Properties to set
     */
    function RendererParams(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RendererParams url.
     * @member {string} url
     * @memberof RendererParams
     * @instance
     */
    RendererParams.prototype.url = "";

    /**
     * RendererParams lang.
     * @member {string} lang
     * @memberof RendererParams
     * @instance
     */
    RendererParams.prototype.lang = "";

    /**
     * Creates a new RendererParams instance using the specified properties.
     * @function create
     * @memberof RendererParams
     * @static
     * @param {IRendererParams=} [properties] Properties to set
     * @returns {RendererParams} RendererParams instance
     */
    RendererParams.create = function create(properties) {
        return new RendererParams(properties);
    };

    /**
     * Encodes the specified RendererParams message. Does not implicitly {@link RendererParams.verify|verify} messages.
     * @function encode
     * @memberof RendererParams
     * @static
     * @param {IRendererParams} message RendererParams message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererParams.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.url != null && message.hasOwnProperty("url"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
        if (message.lang != null && message.hasOwnProperty("lang"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.lang);
        return writer;
    };

    /**
     * Encodes the specified RendererParams message, length delimited. Does not implicitly {@link RendererParams.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RendererParams
     * @static
     * @param {IRendererParams} message RendererParams message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererParams.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RendererParams message from the specified reader or buffer.
     * @function decode
     * @memberof RendererParams
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RendererParams} RendererParams
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererParams.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RendererParams();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.url = reader.string();
                break;
            case 2:
                message.lang = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RendererParams message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RendererParams
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RendererParams} RendererParams
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererParams.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RendererParams message.
     * @function verify
     * @memberof RendererParams
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RendererParams.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.url != null && message.hasOwnProperty("url"))
            if (!$util.isString(message.url))
                return "url: string expected";
        if (message.lang != null && message.hasOwnProperty("lang"))
            if (!$util.isString(message.lang))
                return "lang: string expected";
        return null;
    };

    /**
     * Creates a RendererParams message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RendererParams
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RendererParams} RendererParams
     */
    RendererParams.fromObject = function fromObject(object) {
        if (object instanceof $root.RendererParams)
            return object;
        var message = new $root.RendererParams();
        if (object.url != null)
            message.url = String(object.url);
        if (object.lang != null)
            message.lang = String(object.lang);
        return message;
    };

    /**
     * Creates a plain object from a RendererParams message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RendererParams
     * @static
     * @param {RendererParams} message RendererParams
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RendererParams.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.url = "";
            object.lang = "";
        }
        if (message.url != null && message.hasOwnProperty("url"))
            object.url = message.url;
        if (message.lang != null && message.hasOwnProperty("lang"))
            object.lang = message.lang;
        return object;
    };

    /**
     * Converts this RendererParams to JSON.
     * @function toJSON
     * @memberof RendererParams
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RendererParams.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RendererParams;
})();

$root.RendererResponse = (function() {

    /**
     * Properties of a RendererResponse.
     * @exports IRendererResponse
     * @interface IRendererResponse
     * @property {number|null} [statusCode] RendererResponse statusCode
     * @property {string|null} [error] RendererResponse error
     * @property {string|null} [redirectTo] RendererResponse redirectTo
     * @property {Uint8Array|null} [renderedHead] RendererResponse renderedHead
     * @property {Uint8Array|null} [renderedBody] RendererResponse renderedBody
     * @property {Uint8Array|null} [renderedStyles] RendererResponse renderedStyles
     * @property {Uint8Array|null} [renderedScripts] RendererResponse renderedScripts
     * @property {number|null} [ttr] RendererResponse ttr
     */

    /**
     * Constructs a new RendererResponse.
     * @exports RendererResponse
     * @classdesc Represents a RendererResponse.
     * @implements IRendererResponse
     * @constructor
     * @param {IRendererResponse=} [properties] Properties to set
     */
    function RendererResponse(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RendererResponse statusCode.
     * @member {number} statusCode
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.statusCode = 0;

    /**
     * RendererResponse error.
     * @member {string} error
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.error = "";

    /**
     * RendererResponse redirectTo.
     * @member {string} redirectTo
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.redirectTo = "";

    /**
     * RendererResponse renderedHead.
     * @member {Uint8Array} renderedHead
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedHead = $util.newBuffer([]);

    /**
     * RendererResponse renderedBody.
     * @member {Uint8Array} renderedBody
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedBody = $util.newBuffer([]);

    /**
     * RendererResponse renderedStyles.
     * @member {Uint8Array} renderedStyles
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedStyles = $util.newBuffer([]);

    /**
     * RendererResponse renderedScripts.
     * @member {Uint8Array} renderedScripts
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedScripts = $util.newBuffer([]);

    /**
     * RendererResponse ttr.
     * @member {number} ttr
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.ttr = 0;

    /**
     * Creates a new RendererResponse instance using the specified properties.
     * @function create
     * @memberof RendererResponse
     * @static
     * @param {IRendererResponse=} [properties] Properties to set
     * @returns {RendererResponse} RendererResponse instance
     */
    RendererResponse.create = function create(properties) {
        return new RendererResponse(properties);
    };

    /**
     * Encodes the specified RendererResponse message. Does not implicitly {@link RendererResponse.verify|verify} messages.
     * @function encode
     * @memberof RendererResponse
     * @static
     * @param {IRendererResponse} message RendererResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.statusCode);
        if (message.error != null && message.hasOwnProperty("error"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.error);
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.redirectTo);
        if (message.renderedHead != null && message.hasOwnProperty("renderedHead"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.renderedHead);
        if (message.renderedBody != null && message.hasOwnProperty("renderedBody"))
            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.renderedBody);
        if (message.renderedStyles != null && message.hasOwnProperty("renderedStyles"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.renderedStyles);
        if (message.renderedScripts != null && message.hasOwnProperty("renderedScripts"))
            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.renderedScripts);
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ttr);
        return writer;
    };

    /**
     * Encodes the specified RendererResponse message, length delimited. Does not implicitly {@link RendererResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RendererResponse
     * @static
     * @param {IRendererResponse} message RendererResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RendererResponse message from the specified reader or buffer.
     * @function decode
     * @memberof RendererResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RendererResponse} RendererResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RendererResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.statusCode = reader.int32();
                break;
            case 2:
                message.error = reader.string();
                break;
            case 3:
                message.redirectTo = reader.string();
                break;
            case 4:
                message.renderedHead = reader.bytes();
                break;
            case 5:
                message.renderedBody = reader.bytes();
                break;
            case 6:
                message.renderedStyles = reader.bytes();
                break;
            case 7:
                message.renderedScripts = reader.bytes();
                break;
            case 8:
                message.ttr = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RendererResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RendererResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RendererResponse} RendererResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RendererResponse message.
     * @function verify
     * @memberof RendererResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RendererResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            if (!$util.isInteger(message.statusCode))
                return "statusCode: integer expected";
        if (message.error != null && message.hasOwnProperty("error"))
            if (!$util.isString(message.error))
                return "error: string expected";
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            if (!$util.isString(message.redirectTo))
                return "redirectTo: string expected";
        if (message.renderedHead != null && message.hasOwnProperty("renderedHead"))
            if (!(message.renderedHead && typeof message.renderedHead.length === "number" || $util.isString(message.renderedHead)))
                return "renderedHead: buffer expected";
        if (message.renderedBody != null && message.hasOwnProperty("renderedBody"))
            if (!(message.renderedBody && typeof message.renderedBody.length === "number" || $util.isString(message.renderedBody)))
                return "renderedBody: buffer expected";
        if (message.renderedStyles != null && message.hasOwnProperty("renderedStyles"))
            if (!(message.renderedStyles && typeof message.renderedStyles.length === "number" || $util.isString(message.renderedStyles)))
                return "renderedStyles: buffer expected";
        if (message.renderedScripts != null && message.hasOwnProperty("renderedScripts"))
            if (!(message.renderedScripts && typeof message.renderedScripts.length === "number" || $util.isString(message.renderedScripts)))
                return "renderedScripts: buffer expected";
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            if (!$util.isInteger(message.ttr))
                return "ttr: integer expected";
        return null;
    };

    /**
     * Creates a RendererResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RendererResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RendererResponse} RendererResponse
     */
    RendererResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.RendererResponse)
            return object;
        var message = new $root.RendererResponse();
        if (object.statusCode != null)
            message.statusCode = object.statusCode | 0;
        if (object.error != null)
            message.error = String(object.error);
        if (object.redirectTo != null)
            message.redirectTo = String(object.redirectTo);
        if (object.renderedHead != null)
            if (typeof object.renderedHead === "string")
                $util.base64.decode(object.renderedHead, message.renderedHead = $util.newBuffer($util.base64.length(object.renderedHead)), 0);
            else if (object.renderedHead.length)
                message.renderedHead = object.renderedHead;
        if (object.renderedBody != null)
            if (typeof object.renderedBody === "string")
                $util.base64.decode(object.renderedBody, message.renderedBody = $util.newBuffer($util.base64.length(object.renderedBody)), 0);
            else if (object.renderedBody.length)
                message.renderedBody = object.renderedBody;
        if (object.renderedStyles != null)
            if (typeof object.renderedStyles === "string")
                $util.base64.decode(object.renderedStyles, message.renderedStyles = $util.newBuffer($util.base64.length(object.renderedStyles)), 0);
            else if (object.renderedStyles.length)
                message.renderedStyles = object.renderedStyles;
        if (object.renderedScripts != null)
            if (typeof object.renderedScripts === "string")
                $util.base64.decode(object.renderedScripts, message.renderedScripts = $util.newBuffer($util.base64.length(object.renderedScripts)), 0);
            else if (object.renderedScripts.length)
                message.renderedScripts = object.renderedScripts;
        if (object.ttr != null)
            message.ttr = object.ttr | 0;
        return message;
    };

    /**
     * Creates a plain object from a RendererResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RendererResponse
     * @static
     * @param {RendererResponse} message RendererResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RendererResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.statusCode = 0;
            object.error = "";
            object.redirectTo = "";
            if (options.bytes === String)
                object.renderedHead = "";
            else {
                object.renderedHead = [];
                if (options.bytes !== Array)
                    object.renderedHead = $util.newBuffer(object.renderedHead);
            }
            if (options.bytes === String)
                object.renderedBody = "";
            else {
                object.renderedBody = [];
                if (options.bytes !== Array)
                    object.renderedBody = $util.newBuffer(object.renderedBody);
            }
            if (options.bytes === String)
                object.renderedStyles = "";
            else {
                object.renderedStyles = [];
                if (options.bytes !== Array)
                    object.renderedStyles = $util.newBuffer(object.renderedStyles);
            }
            if (options.bytes === String)
                object.renderedScripts = "";
            else {
                object.renderedScripts = [];
                if (options.bytes !== Array)
                    object.renderedScripts = $util.newBuffer(object.renderedScripts);
            }
            object.ttr = 0;
        }
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            object.statusCode = message.statusCode;
        if (message.error != null && message.hasOwnProperty("error"))
            object.error = message.error;
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            object.redirectTo = message.redirectTo;
        if (message.renderedHead != null && message.hasOwnProperty("renderedHead"))
            object.renderedHead = options.bytes === String ? $util.base64.encode(message.renderedHead, 0, message.renderedHead.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedHead) : message.renderedHead;
        if (message.renderedBody != null && message.hasOwnProperty("renderedBody"))
            object.renderedBody = options.bytes === String ? $util.base64.encode(message.renderedBody, 0, message.renderedBody.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedBody) : message.renderedBody;
        if (message.renderedStyles != null && message.hasOwnProperty("renderedStyles"))
            object.renderedStyles = options.bytes === String ? $util.base64.encode(message.renderedStyles, 0, message.renderedStyles.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedStyles) : message.renderedStyles;
        if (message.renderedScripts != null && message.hasOwnProperty("renderedScripts"))
            object.renderedScripts = options.bytes === String ? $util.base64.encode(message.renderedScripts, 0, message.renderedScripts.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedScripts) : message.renderedScripts;
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            object.ttr = message.ttr;
        return object;
    };

    /**
     * Converts this RendererResponse to JSON.
     * @function toJSON
     * @memberof RendererResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RendererResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RendererResponse;
})();

module.exports = $root;
