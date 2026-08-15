export function NoteTxt({ info, isEditMode, onChangeInfo }) {
    
      console.log('NoteTxt got:', info, 'isEditMode:', isEditMode)

    if (isEditMode) {
        return (
            <textarea
                name="txt"
                value={info.txt}
                onChange={onChangeInfo}
            />
        )
    }

    return <p>{info.txt}</p>
}