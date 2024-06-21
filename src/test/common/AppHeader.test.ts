import { render } from "@testing-library/vue";
import AppHeader from "../../components/common/AppHeader.vue";

describe("AppHeader", () => {
  test("displays title", async () => {
    const listNav = [
      { name: "Home", to: "/" },
      { name: "About", to: "/about" },
      { name: "Contact", to: "/contact" },
    ];

    const { getByText } = render(AppHeader, {
      props: {
        listNav,
      },
    });
    const appBarTitle = getByText("Turing Test");
    expect(appBarTitle).toBeInTheDocument();
  });
});
