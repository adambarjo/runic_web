type classNameConditional = { [className: string]: boolean | undefined };

export function partition(array: any[], isValid: (item: any) => boolean) {
  return array.reduce(
    ([pass, fail], item: any) =>
      isValid(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
    [[], []],
  );
}

export function classNames(
  ...classNames: (string | classNameConditional)[]
): string {
  const [classNameStrings, classNameConditionals] = partition(
    classNames,
    (n) => typeof n === "string",
  );

  return classNameStrings
    .join(" ")
    .concat(
      classNameConditionals.reduce(
        (a: string[], c: classNameConditional) =>
          [a, ...Object.keys(c).filter((k) => c[k])].join(" "),
        "",
      ),
    )
    .trim();
}
