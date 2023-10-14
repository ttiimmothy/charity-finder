import { Header } from "../../components/Header";
import { ErrorComponent } from "../../components/errors/ErrorComponent";

export function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header />
      <div className="layout-content-inner">
        <div className="flex card flex-col items-center gap-5 sm:p-8">
          <ErrorComponent />
          <div className="font-semibold text-900 text-center text-4xl border-t-2 surface-border pt-5">
            Page Not Found
          </div>
        </div>
      </div>
    </>
  );
}
