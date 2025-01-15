import { useContext } from "react"
import { AttemptContext } from "./AttemptContext";

export const useAttempt = () => {
    const context = useContext(AttemptContext);
    if (!context) {
        throw new Error("useAttempt must be used within a AnswerProvider");
    }
    return context;
}