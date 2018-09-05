import * as $protobuf from "protobufjs";
/** Namespace internal. */
export namespace internal {

    /** Properties of a RendererParams. */
    interface IRendererParams {

        /** RendererParams url */
        url?: (string|null);

        /** RendererParams lang */
        lang?: (string|null);
    }

    /** Represents a RendererParams. */
    class RendererParams implements IRendererParams {

        /**
         * Constructs a new RendererParams.
         * @param [properties] Properties to set
         */
        constructor(properties?: internal.IRendererParams);

        /** RendererParams url. */
        public url: string;

        /** RendererParams lang. */
        public lang: string;

        /**
         * Creates a new RendererParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RendererParams instance
         */
        public static create(properties?: internal.IRendererParams): internal.RendererParams;

        /**
         * Encodes the specified RendererParams message. Does not implicitly {@link internal.RendererParams.verify|verify} messages.
         * @param message RendererParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: internal.IRendererParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RendererParams message, length delimited. Does not implicitly {@link internal.RendererParams.verify|verify} messages.
         * @param message RendererParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: internal.IRendererParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RendererParams message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RendererParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): internal.RendererParams;

        /**
         * Decodes a RendererParams message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RendererParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): internal.RendererParams;

        /**
         * Verifies a RendererParams message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RendererParams message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RendererParams
         */
        public static fromObject(object: { [k: string]: any }): internal.RendererParams;

        /**
         * Creates a plain object from a RendererParams message. Also converts values to other types if specified.
         * @param message RendererParams
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: internal.RendererParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RendererParams to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RendererResponse. */
    interface IRendererResponse {

        /** RendererResponse statusCode */
        statusCode?: (number|null);

        /** RendererResponse error */
        error?: (string|null);

        /** RendererResponse redirectTo */
        redirectTo?: (string|null);

        /** RendererResponse renderedHead */
        renderedHead?: (Uint8Array|null);

        /** RendererResponse renderedBody */
        renderedBody?: (Uint8Array|null);

        /** RendererResponse renderedStyles */
        renderedStyles?: (Uint8Array|null);

        /** RendererResponse renderedScripts */
        renderedScripts?: (Uint8Array|null);

        /** RendererResponse ttr */
        ttr?: (number|null);
    }

    /** Represents a RendererResponse. */
    class RendererResponse implements IRendererResponse {

        /**
         * Constructs a new RendererResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: internal.IRendererResponse);

        /** RendererResponse statusCode. */
        public statusCode: number;

        /** RendererResponse error. */
        public error: string;

        /** RendererResponse redirectTo. */
        public redirectTo: string;

        /** RendererResponse renderedHead. */
        public renderedHead: Uint8Array;

        /** RendererResponse renderedBody. */
        public renderedBody: Uint8Array;

        /** RendererResponse renderedStyles. */
        public renderedStyles: Uint8Array;

        /** RendererResponse renderedScripts. */
        public renderedScripts: Uint8Array;

        /** RendererResponse ttr. */
        public ttr: number;

        /**
         * Creates a new RendererResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RendererResponse instance
         */
        public static create(properties?: internal.IRendererResponse): internal.RendererResponse;

        /**
         * Encodes the specified RendererResponse message. Does not implicitly {@link internal.RendererResponse.verify|verify} messages.
         * @param message RendererResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: internal.IRendererResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RendererResponse message, length delimited. Does not implicitly {@link internal.RendererResponse.verify|verify} messages.
         * @param message RendererResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: internal.IRendererResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RendererResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RendererResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): internal.RendererResponse;

        /**
         * Decodes a RendererResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RendererResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): internal.RendererResponse;

        /**
         * Verifies a RendererResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RendererResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RendererResponse
         */
        public static fromObject(object: { [k: string]: any }): internal.RendererResponse;

        /**
         * Creates a plain object from a RendererResponse message. Also converts values to other types if specified.
         * @param message RendererResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: internal.RendererResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RendererResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
