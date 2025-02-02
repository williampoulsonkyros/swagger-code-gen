// Generated by "bundle-dts@1.1.4" https://github.com/fishen/bundle-dts#readme."
declare module "swagger-code-generate-eslint/src/config" {
    export interface IConfig {
        /**
         * Code generation directory
         * @default ./apis
         */
        destination?: string;
        /**
         * Naming convention
         */
        rename?: Partial<Record<'method' | 'parameter' | 'response' | 'file', (...args: any) => string>>;
        /**
         * Code template files
         */
        templates?: Partial<Record<'type' | 'index', string>>;
        /**
         * The items you want to ignore
         */
        ignores?: Partial<Record<'definitions' | 'path' | 'body' | 'header' | 'query', string[]>>;
        /**
         * The modules you want to import
         */
        imports?: string[];
        /**
         * The configuration name
         */
        name?: string;
        /**
         * The OpenAPI specification(JSON) 's resource url.
         * @example https://petstore.swagger.io/v2/swagger.json"
         */
        source?: string;
        /**
         * The http request host, if the value is false, no host will be added to the url
         * @example petstore.swagger.io
         */
        host?: string;
        /**
         * host?: string | false;
         *
         * The http request scheme
         * @example https
         */
        scheme?: string;
        /**
         * The system generic types
         */
        systemGenericTypes?: string[];
        /**
         * The type formatter
         */
        typeFormatter?: (t: string) => string;
        /**
         * Custom type mappings
         */
        typeMappings?: Record<string, string>;
        /**
         * Whether to enable the secure property name, the property name will wrapped with double quotes if enabled.
         */
        securePropertyName?: boolean;
    }
    export const defaultConfig: IConfig;
}
declare module "swagger-code-generate-eslint/src/swagger" {
    export type ParamType = 'path' | 'header' | 'body' | 'query';
    export interface ISwaggerInfo {
        version: string;
        title: string;
    }
    export interface ISwaggerDefinitionProperty {
        example?: string;
        format?: string;
        description?: string;
        type?: string;
        $ref?: string;
        items?: ISwaggerDefinitionProperty;
    }
    export interface ISwaggerDefinition {
        properties: Record<string, ISwaggerDefinitionProperty>;
        required?: string[];
        type: string;
        title: string;
        additionalProperties?: Record<'type', any>;
    }
    export interface ISwaggerPathParameter {
        default: any;
        description: string;
        in: ParamType;
        name: string;
        required: boolean;
        type: string;
    }
    export interface ISwaggerPathResponse {
        description: string;
        schema?: ISwaggerDefinitionProperty;
    }
    export interface ISwaggerPath {
        consumes: string[];
        operationId: string;
        parameters: ISwaggerPathParameter[];
        produces: string[];
        responses: Record<number, ISwaggerPathResponse>;
        summary: string;
        tags: string[];
        deprecated?: boolean;
    }
    export interface ISwaggerTag {
        name: string;
        description: string;
    }
    export interface ISwagger {
        basePath: string;
        definitions: Record<string, ISwaggerDefinition>;
        host: string;
        schemes: string[];
        info: ISwaggerInfo;
        paths: Record<string, Record<string, ISwaggerPath>>;
        swagger: string;
        tags: ISwaggerTag[];
    }
}
declare module "swagger-code-generate-eslint/src/property" {
    import { ISwaggerDefinitionProperty } from 'swagger-code-generate-eslint/src/swagger';
    import { IConfig } from 'swagger-code-generate-eslint/src/config';
    import { Definition } from 'definition';
    export class Property {
        name: string;
        type: string;
        description: string;
        default: any;
        example: string;
        deprecated: boolean;
        required: boolean;
        generic: boolean;
        isArray: boolean;
        otherType: boolean;
        constructor(data: ISwaggerDefinitionProperty & {
            name: string;
            default?: any;
            required?: any;
        }, config: IConfig, defs: Definition[]);
    }
}
declare module "swagger-code-generate-eslint/src/definition" {
    import { Property } from 'swagger-code-generate-eslint/src/property';
    import { IConfig } from 'swagger-code-generate-eslint/src/config';
    import { ISwagger, ISwaggerDefinition } from 'swagger-code-generate-eslint/src/swagger';
    export class Definition {
        title: string;
        name: string;
        basePath: string;
        host: string;
        properties?: Property[];
        constructor(data: ISwaggerDefinition, config: IConfig);
        static parse(swagger: ISwagger, config: IConfig): Definition[];
    }
}
declare module "swagger-code-generate-eslint/src/param" {
    import { Property } from 'swagger-code-generate-eslint/src/property';
    import { Method } from 'swagger-code-generate-eslint/src/method';
    import { IConfig } from 'swagger-code-generate-eslint/src/config';
    import { ISwaggerPathParameter, ParamType } from 'swagger-code-generate-eslint/src/swagger';
    import { Definition } from 'definition';
    export class Param {
        name: string;
        type: string;
        in: ParamType;
        properties: Property[];
        typeName: string;
        referenced: boolean;
        required?: boolean;
        description?: string;
        passable: boolean;
        constructor(data: Partial<Param>);
        static from(method: Method, params: ISwaggerPathParameter[], config: IConfig, definitions: Definition[]): Param[];
    }
}
declare module "swagger-code-generate-eslint/src/method" {
    import { Param } from 'swagger-code-generate-eslint/src/param';
    import { IConfig } from 'swagger-code-generate-eslint/src/config';
    import { ISwagger, ISwaggerPath } from 'swagger-code-generate-eslint/src/swagger';
    import { Definition } from 'swagger-code-generate-eslint/src/definition';
    export class Method {
        method: string;
        path: string;
        url: string;
        deprecated: boolean;
        operationId: string;
        summary: string;
        tags?: string[];
        name: string;
        parameters: Param[];
        response: string;
        constructor(data: ISwaggerPath & {
            path: string;
            method: string;
        }, config: IConfig, swagger: ISwagger, definitions: Definition[]);
        static parse(swagger: ISwagger, definitions: Definition[], config: IConfig): Method[];
    }
}
declare module "swagger-code-generate-eslint/src/generator" {
    import { IConfig } from 'swagger-code-generate-eslint/src/config';
    import { Definition } from 'swagger-code-generate-eslint/src/definition';
    export class Generator {
        genericTypes: Map<any, any>;
        config: IConfig;
        constructor(config: IConfig);
        static render(view: any, template: string, filename: string, config: IConfig): any;
        static getType(item: {
            type?: string;
            $ref?: string;
            items?: object;
            schema?: object;
        }, config: IConfig, definitions: Definition[]): string;
        generate(): Promise<any>;
        private isHttpSwaggerSource;
    }
}
declare module "swagger-code-generate-eslint" {
    import { IConfig } from 'swagger-code-generate-eslint/src/config';
    export function generate(config: Record<string, IConfig>): Promise<void>;
    export type { IConfig };
}