/*ColorPicker*/

export function ColorPicker({ onSetStyle }) {
  const colors = [
    '#ffffff',
    '#faafa8',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#b4ddd3',
    '#d4e4ed',
    '#aeccdc',
    '#d3bfdb',
    '#f6e2dd',
    '#e9e3d4',
    '#efeff1',
  ]

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          style={{ backgroundColor: color }}
          onClick={() => onSetStyle({ backgroundColor: color })}
          className="color-block"
        ></div>
      ))}
    </div>
  )
}