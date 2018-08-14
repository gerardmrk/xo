import flattenTranslations from "@client/utils/flatten-translations";

describe.skip("utils:flatten-translations", () => {
  let translationsObj: object;
  beforeAll(() => {
    translationsObj = {};
  });

  it("d", () => {
    expect(flattenTranslations(translationsObj));
  });
});
