/* eslint-disable @typescript-eslint/ban-types */
export type AnyObject = Record<string, unknown>;

export type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    RecursiveKeyOfAccess<TKey>
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<TValue, Text extends string> =
  TValue extends object ? Text | `${Text}${RecursiveKeyOfInner<TValue>}` : Text;

type RecursiveKeyOfAccess<TKey extends string | number> = `.${TKey}`;
