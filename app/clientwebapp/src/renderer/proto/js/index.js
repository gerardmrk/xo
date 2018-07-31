/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.RendererParams = (function() {
  /**
   * Properties of a RendererParams.
   * @exports IRendererParams
   * @interface IRendererParams
   * @property {string|null} [url] RendererParams url
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
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * RendererParams url.
   * @member {string} url
   * @memberof RendererParams
   * @instance
   */
  RendererParams.prototype.url = "";

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
    if (!writer) writer = $Writer.create();
    if (message.url != null && message.hasOwnProperty("url"))
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.url);
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
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.RendererParams();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.url = reader.string();
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
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
    if (typeof message !== "object" || message === null) return "object expected";
    if (message.url != null && message.hasOwnProperty("url"))
      if (!$util.isString(message.url)) return "url: string expected";
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
    if (object instanceof $root.RendererParams) return object;
    var message = new $root.RendererParams();
    if (object.url != null) message.url = String(object.url);
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
    if (!options) options = {};
    var object = {};
    if (options.defaults) object.url = "";
    if (message.url != null && message.hasOwnProperty("url")) object.url = message.url;
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
   * @property {string|null} [headElements] RendererResponse headElements
   * @property {string|null} [bodyContent] RendererResponse bodyContent
   * @property {string|null} [criticalStyles] RendererResponse criticalStyles
   * @property {string|null} [renderedModules] RendererResponse renderedModules
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
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * RendererResponse headElements.
   * @member {string} headElements
   * @memberof RendererResponse
   * @instance
   */
  RendererResponse.prototype.headElements = "";

  /**
   * RendererResponse bodyContent.
   * @member {string} bodyContent
   * @memberof RendererResponse
   * @instance
   */
  RendererResponse.prototype.bodyContent = "";

  /**
   * RendererResponse criticalStyles.
   * @member {string} criticalStyles
   * @memberof RendererResponse
   * @instance
   */
  RendererResponse.prototype.criticalStyles = "";

  /**
   * RendererResponse renderedModules.
   * @member {string} renderedModules
   * @memberof RendererResponse
   * @instance
   */
  RendererResponse.prototype.renderedModules = "";

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
    if (!writer) writer = $Writer.create();
    if (message.headElements != null && message.hasOwnProperty("headElements"))
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.headElements);
    if (message.bodyContent != null && message.hasOwnProperty("bodyContent"))
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.bodyContent);
    if (message.criticalStyles != null && message.hasOwnProperty("criticalStyles"))
      writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.criticalStyles);
    if (message.renderedModules != null && message.hasOwnProperty("renderedModules"))
      writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.renderedModules);
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
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.RendererResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.headElements = reader.string();
          break;
        case 2:
          message.bodyContent = reader.string();
          break;
        case 3:
          message.criticalStyles = reader.string();
          break;
        case 4:
          message.renderedModules = reader.string();
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
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
    if (typeof message !== "object" || message === null) return "object expected";
    if (message.headElements != null && message.hasOwnProperty("headElements"))
      if (!$util.isString(message.headElements)) return "headElements: string expected";
    if (message.bodyContent != null && message.hasOwnProperty("bodyContent"))
      if (!$util.isString(message.bodyContent)) return "bodyContent: string expected";
    if (message.criticalStyles != null && message.hasOwnProperty("criticalStyles"))
      if (!$util.isString(message.criticalStyles)) return "criticalStyles: string expected";
    if (message.renderedModules != null && message.hasOwnProperty("renderedModules"))
      if (!$util.isString(message.renderedModules)) return "renderedModules: string expected";
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
    if (object instanceof $root.RendererResponse) return object;
    var message = new $root.RendererResponse();
    if (object.headElements != null) message.headElements = String(object.headElements);
    if (object.bodyContent != null) message.bodyContent = String(object.bodyContent);
    if (object.criticalStyles != null) message.criticalStyles = String(object.criticalStyles);
    if (object.renderedModules != null) message.renderedModules = String(object.renderedModules);
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
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.headElements = "";
      object.bodyContent = "";
      object.criticalStyles = "";
      object.renderedModules = "";
    }
    if (message.headElements != null && message.hasOwnProperty("headElements"))
      object.headElements = message.headElements;
    if (message.bodyContent != null && message.hasOwnProperty("bodyContent"))
      object.bodyContent = message.bodyContent;
    if (message.criticalStyles != null && message.hasOwnProperty("criticalStyles"))
      object.criticalStyles = message.criticalStyles;
    if (message.renderedModules != null && message.hasOwnProperty("renderedModules"))
      object.renderedModules = message.renderedModules;
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
