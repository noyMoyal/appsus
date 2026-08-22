const { useState } = React

export function LongTxt({ txt = '' }) {
    const [isLongTxtShown, setIsLongTxtShown] = useState(false)

    function onToggleTxt() {
        setIsLongTxtShown(prevIsShown => !prevIsShown)
    }

    if (!txt) return null

    return (
        <div className="long-txt">
            <p>
                {isLongTxtShown
                    ? txt
                    : txt.substring(0, 100) + (txt.length > 100 ? '...' : '')}
            </p>

            {txt.length > 100 && (
                <button onClick={onToggleTxt}>
                    {isLongTxtShown ? 'Show Less' : 'Read More'}
                </button>
            )}
        </div>
    )
}