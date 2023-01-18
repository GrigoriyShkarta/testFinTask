import {useEffect, useRef} from "react";
import {ITicker} from "../models/ITicker";

function usePrevious(value: ITicker[]) {
    const ref = useRef<ITicker[]>();
    useEffect(() => {
        ref.current = value;
    },[value]);
    return ref.current;
}
export default usePrevious;