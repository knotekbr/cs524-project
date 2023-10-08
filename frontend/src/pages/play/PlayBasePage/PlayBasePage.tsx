import { Outlet } from "react-router-dom";

import { NestedNavBar, type NestedNavBarProps } from "~components/layout/NestedNavBar";
import { PageWrapper } from "~components/layout/PageWrapper";

const playNavLinks: NestedNavBarProps["links"] = [
  { label: "Create Game", to: "new" },
  { label: "Join Game", to: "join" },
];

export default function PlayBasePage() {
  return (
    <PageWrapper>
      <NestedNavBar links={playNavLinks} />
      <Outlet />
    </PageWrapper>
  );
}
