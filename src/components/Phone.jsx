export default function Phone({ children }) {
  return (
    <div className="phone">
      <div className="bg">
        <div className="bg-vignette" />
      </div>
      {children}
    </div>
  )
}
