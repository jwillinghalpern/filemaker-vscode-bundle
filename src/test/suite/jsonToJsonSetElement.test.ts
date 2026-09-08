// Vendored from https://github.com/jwillinghalpern/fm-json-to-jsonsetelement (v1.1.0, ISC).
// Converted from mocha's BDD ui (describe/it) to the TDD ui (suite/test) this repo uses.
//
// The odd property names below (`a.b`, `y[.]z`, ...) are deliberate fixtures for the
// key-escaping tests, so the camelCase naming rule does not apply.
/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable no-undef */
import * as assert from 'assert';
import { jsonToJsonSetElement } from '../../jsonToJsonSetElement';

suite('jsonToJsonSetElement', () => {
  test('should return "{}" for empty object.', () => {
    assert.equal(jsonToJsonSetElement({}), '"{}"');
  });
  test('should return "[]" for empty array.', () => {
    assert.equal(jsonToJsonSetElement([]), '"[]"');
  });
  test('should throw for invalid json.', () => {
    assert.throws(() => jsonToJsonSetElement('invalid json here'));
  });
  test('should accept stringified JSON object.', () => {
    assert.equal(
      jsonToJsonSetElement(JSON.stringify({ a: 123 })),
      'JSONSetElement ( "{}" ;\n\t[ "a" ; 123 ; JSONNumber ]\n)'
    );
  });
  test('should accept stringified JSON array.', () => {
    assert.equal(
      jsonToJsonSetElement(JSON.stringify(['hello'])),
      'JSONSetElement ( "[]" ;\n\t[ "[0]" ; "hello" ; JSONString ]\n)'
    );
  });
  test('should convert \\n and \\r to ¶', () => {
    assert.equal(
      jsonToJsonSetElement(['hello\n\rworld']),
      'JSONSetElement ( "[]" ;\n\t[ "[0]" ; "hello¶¶world" ; JSONString ]\n)'
    );
  });
  test('should return bracket notation for keys with dots or square brackets', () => {
    // dots
    assert.equal(
      jsonToJsonSetElement({ 'a.b': 123 }),
      `JSONSetElement ( "{}" ;\n\t[ "['a.b']" ; 123 ; JSONNumber ]\n)`
    );
    assert.equal(
      jsonToJsonSetElement({ '.....': 123 }),
      `JSONSetElement ( "{}" ;\n\t[ "['.....']" ; 123 ; JSONNumber ]\n)`
    );
    // brackets
    assert.equal(
      jsonToJsonSetElement({ 'a[b]': 123 }),
      `JSONSetElement ( "{}" ;\n\t[ "['a[b]']" ; 123 ; JSONNumber ]\n)`
    );
    assert.equal(
      jsonToJsonSetElement({ 'a[b': 123 }),
      `JSONSetElement ( "{}" ;\n\t[ "['a[b']" ; 123 ; JSONNumber ]\n)`
    );
    assert.equal(
      jsonToJsonSetElement({ 'a]b': 123 }),
      `JSONSetElement ( "{}" ;\n\t[ "['a]b']" ; 123 ; JSONNumber ]\n)`
    );
    // nested
    assert.equal(
      jsonToJsonSetElement({ 'y.z': { 'a.b': 123 } }),
      `JSONSetElement ( "{}" ;\n\t[ "['y.z']['a.b']" ; 123 ; JSONNumber ]\n)`
    );
    assert.equal(
      jsonToJsonSetElement({ 'y[.]z': { 'a[.]b': 123 } }),
      `JSONSetElement ( "{}" ;\n\t[ "['y[.]z']['a[.]b']" ; 123 ; JSONNumber ]\n)`
    );
    // might as well test single quotes too
    assert.equal(
      jsonToJsonSetElement({ "abc'.def": 123 }),
      `JSONSetElement ( "{}" ;\n\t[ "['abc'.def']" ; 123 ; JSONNumber ]\n)`
    );
  });

  suite('data type handling', () => {
    test('should detect null', () => {
      assert.equal(
        jsonToJsonSetElement([null]),
        'JSONSetElement ( "[]" ;\n\t[ "[0]" ; "" ; JSONNull ]\n)'
      );
      assert.equal(
        jsonToJsonSetElement({ key: null }),
        'JSONSetElement ( "{}" ;\n\t[ "key" ; "" ; JSONNull ]\n)'
      );
    });
    test('should detect strings', () => {
      assert.equal(
        jsonToJsonSetElement(['hello']),
        'JSONSetElement ( "[]" ;\n\t[ "[0]" ; "hello" ; JSONString ]\n)'
      );
      assert.equal(
        jsonToJsonSetElement({ key: 'hello' }),
        'JSONSetElement ( "{}" ;\n\t[ "key" ; "hello" ; JSONString ]\n)'
      );
    });
    test('should detect numbers', () => {
      assert.equal(
        jsonToJsonSetElement([123]),
        'JSONSetElement ( "[]" ;\n\t[ "[0]" ; 123 ; JSONNumber ]\n)'
      );
      assert.equal(
        jsonToJsonSetElement({ key: 123 }),
        'JSONSetElement ( "{}" ;\n\t[ "key" ; 123 ; JSONNumber ]\n)'
      );
    });
    test('should detect boolean', () => {
      assert.equal(
        jsonToJsonSetElement([false]),
        'JSONSetElement ( "[]" ;\n\t[ "[0]" ; False ; JSONBoolean ]\n)'
      );
      assert.equal(
        jsonToJsonSetElement({ key: false }),
        'JSONSetElement ( "{}" ;\n\t[ "key" ; False ; JSONBoolean ]\n)'
      );
      assert.equal(
        jsonToJsonSetElement([true]),
        'JSONSetElement ( "[]" ;\n\t[ "[0]" ; True ; JSONBoolean ]\n)'
      );
      assert.equal(
        jsonToJsonSetElement({ key: true }),
        'JSONSetElement ( "{}" ;\n\t[ "key" ; True ; JSONBoolean ]\n)'
      );
    });
  });

  /* eslint-disable comma-dangle */
  test('should handle complex JSON', () => {
    const input = {
      arr: [null, 1, 'two'],
      bool: true,
      nil: null,
      num: 123,
      obj: {
        sub1: 'val1',
        sub2: 'val2',
        sub3: {
          a: 1,
          b: 2,
          subsub: {
            subsubsub: [
              {
                a: 'test',
                b: [1, { hi: 'ho' }],
              },
            ],
          },
        },
      },
      str: '""string\rwith\nreturns and tab\tcr\rbs\\dq"',
    };
    /* eslint-enable comma-dangle */

    assert.equal(
      jsonToJsonSetElement(input),
      `JSONSetElement ( "{}" ;
\t[ "arr[0]" ; "" ; JSONNull ];
\t[ "arr[1]" ; 1 ; JSONNumber ];
\t[ "arr[2]" ; "two" ; JSONString ];
\t[ "bool" ; True ; JSONBoolean ];
\t[ "nil" ; "" ; JSONNull ];
\t[ "num" ; 123 ; JSONNumber ];
\t[ "obj.sub1" ; "val1" ; JSONString ];
\t[ "obj.sub2" ; "val2" ; JSONString ];
\t[ "obj.sub3.a" ; 1 ; JSONNumber ];
\t[ "obj.sub3.b" ; 2 ; JSONNumber ];
\t[ "obj.sub3.subsub.subsubsub[0].a" ; "test" ; JSONString ];
\t[ "obj.sub3.subsub.subsubsub[0].b[0]" ; 1 ; JSONNumber ];
\t[ "obj.sub3.subsub.subsubsub[0].b[1].hi" ; "ho" ; JSONString ];
\t[ "str" ; "\\"\\"string¶with¶returns and tab\tcr¶bs\\\\dq\\"" ; JSONString ]
)`
    );
  });

  // TODO: should we return top-level array elements as pure, unquoted, unbracketed numbers?
  //   eg: JSONSetElement ( "[]" ; [ 0 ; "" ; JSONNull ] )
  //   vs: JSONSetElement ( "[]" ; [ "[0]"" ; "" ; JSONNull ] )
});
