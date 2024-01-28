export default function Section({ title, children, ...props }) {
  // children prop을 받아 <Section> 태그 사이에 포함되는 모든 내용을 받아올 수 있다
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
