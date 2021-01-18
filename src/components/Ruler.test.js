import React from "react";
import renderer from "react-test-renderer";
import Ruler from "./Ruler";

describe("<Ruler />", () => {
  it("snapshot", () => {
    const tree = renderer
      .create(
        <Ruler
          segmentNum={10}
          rulerWidth={50}
          segmentWidth={10}
          segmentSpacing={5}
          spacerWidth={20}
          minAge={18}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
