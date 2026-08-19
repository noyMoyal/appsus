import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
export function DynamicCmp(props) {

   const cmpMap = {
    NoteTxt: <NoteTxt {...props} />,
    NoteImg: <NoteImg {...props} />,
    NoteVideo: <NoteVideo {...props} />,
  }
  return cmpMap[props.cmpType]
}
