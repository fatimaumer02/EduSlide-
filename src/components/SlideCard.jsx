export default function SlideCard({ slide }) {
  return (
    <div className="card">
      <h4>{slide.title}</h4>
      <ul>
        {slide.bullets.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
