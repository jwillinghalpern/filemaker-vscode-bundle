// Vendored from https://github.com/jwillinghalpern/fm-json-to-jsonsetelement (v1.1.0, ISC).
// Previously consumed as an npm git dependency; inlined so the build has no private
// dependencies and CI needs no credentials.
//
// Kept byte-for-byte close to upstream so it stays diffable; `curly` is disabled
// rather than reformatting the brace-less if/else chain.
/* eslint-disable curly */

/**
 * converts a javascript string to a Filemaker-compatible string
 *
 * @param {string} str
 * @returns {string} Filemaker-safe string
 */
function toFmString(str: string): string {
  return str
    .replace(/\n/g, '¶')
    .replace(/\r/g, '¶')
    .replace(/\t/g, '\t')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
}

interface ObjectWithStringKeys {
  [key: string]: any;
}

// TODO: we could probably avoid using concat. We should. Se below.
// TODO: add handling for keys containing dots or square brackets (both [ and ])

/**
 * generate the elements to go inside the set element expression
 * called from jsonToJsonSetElement
 *
 * @param {ObjectWithStringKeys} [json={}]
 * @param {string} [parentKey='']
 * @returns {string[]}
 */
function jsonCreateElements(
  json: ObjectWithStringKeys = {},
  parentKey: string = ''
): string[] {
  const keys = Object.keys(json);
  let res: string[] = [];
  const dotsOrBrackets = /\.|\[|\]/;
  keys.forEach((key) => {
    const keyText = Array.isArray(json)
      ? `${parentKey}[${key}]`
      : dotsOrBrackets.test(key)
      ? `${parentKey}['${key}']`
      : parentKey !== ''
      ? `${parentKey}.${key}`
      : key;

    const val = json[key];
    if (typeof val === 'string')
      res.push(`[ "${keyText}" ; "${toFmString(val)}" ; JSONString ]`);
    else if (typeof val === 'number')
      res.push(`[ "${keyText}" ; ${val} ; JSONNumber ]`);
    else if (typeof val === 'boolean')
      res.push(`[ "${keyText}" ; ${val ? 'True' : 'False'} ; JSONBoolean ]`);
    else if (val === null) res.push(`[ "${keyText}" ; "" ; JSONNull ]`);
    else if (typeof val === 'object')
      res.push(...jsonCreateElements(val, keyText));
    else throw new Error(`unsupported type: ${typeof val}`);
  });
  return res;
}

/**
 * convert json string or object/array to a filemaker JSONSetElement expression
 *
 * @export
 * @param {(string | ObjectWithStringKeys)} json the json or object to convert
 * @returns {string} Filemaker JSONSetElement expression or error text
 */
export function jsonToJsonSetElement(
  json: string | ObjectWithStringKeys
): string {
  let obj;
  if (json instanceof Object) {
    obj = json;
  } else {
    try {
      obj = JSON.parse(json);
    } catch (error) {
      throw new Error('? * invalid json');
    }
  }
  if (Array.isArray(obj) && json.length === 0) return '"[]"';
  else if (Object.keys(obj).length === 0) return '"{}"';

  const elements = jsonCreateElements(obj).join(';\n\t');
  const baseJson = Array.isArray(obj) ? '[]' : '{}';
  return `JSONSetElement ( "${baseJson}" ;\n\t` + elements + `\n)`;
}
