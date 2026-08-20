export function RateByTextbox({ val, onSelected }) {

    function handleChange({ target }) {
        onSelected(+target.value)
    }

    return (
        <input
            type="number"
            min="1"
            max="5"
            value={val}
            onChange={handleChange}
        />
    )
}