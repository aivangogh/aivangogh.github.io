
export function ContainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-8/12 mx-auto">{children}</div>
    </>
  );
}
