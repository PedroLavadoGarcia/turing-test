import AppFooter from "../../components/common/AppFooter.vue";
import { render } from "@testing-library/vue";

describe("FooterComponent", () => {
  test("displays current year ", async () => {
    const { getByText } = render(AppFooter);

    const currentYearElement = getByText("2016-2024");

    expect(currentYearElement).toBeInTheDocument();
  });
});
