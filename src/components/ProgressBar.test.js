import React from "react";
import renderer from "react-test-renderer";
import ProgressBar from "./ProgressBar";

describe("<ProgressBar />", () => {
  it("snapshot", () => {
    const tree = renderer
      .create(<ProgressBar value={10} min={0} max={100} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
