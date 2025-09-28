export function Footer({ name }) {
  return (
    <footer className="mx-auto mt-14 max-w-5xl px-6 pb-12 text-center text-xs text-slate-500">
      Friends forever · {new Date().getFullYear()} · For {name}
    </footer>
  );
}
