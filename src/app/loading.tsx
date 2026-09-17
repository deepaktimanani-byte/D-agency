export default function Loading() {
  return (
    <main
      className="flex-1 bg-surface"
      aria-busy="true"
      aria-label="Loading page"
    >
      <section className="section-pad bg-bg-mint">
        <div className="container-main mx-auto max-w-2xl animate-pulse text-center">
          <div className="mx-auto mb-5 h-4 w-28 rounded-full bg-navy/10" />
          <div className="mx-auto h-12 max-w-xl rounded-xl bg-navy/10" />
          <div className="mx-auto mt-4 h-5 max-w-lg rounded-lg bg-navy/10" />
        </div>
      </section>
      <section className="section-pad">
        <div className="container-main grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl border border-border-light bg-surface-2"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
