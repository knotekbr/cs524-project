import { Outlet } from "react-router-dom";

import { NestedNavBar, NestedNavBarProps } from "~components/layout/NestedNavBar";
import { PageWrapper } from "~components/layout/PageWrapper";

const adminNavLinks: NestedNavBarProps["links"] = [
  { label: "Question Management", to: "questions" },
  { label: "Game Management", to: "games" },
];

export default function AdminBasePage() {
  return (
    <PageWrapper>
      <NestedNavBar links={adminNavLinks} />
      <Outlet />
    </PageWrapper>
  );
}
