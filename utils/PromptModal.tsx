// Import necessary dependencies
import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import VectorIcon from '@/assets/Vector.svg';
import InsertIcon from '@/assets/Insert.svg';
import RegenerateIcon from '@/assets/Regenerate.svg';

// Define the IPrompts interface
/**
 * Interface for prompts
 * @property {string} role - Role of the prompt (user/system)
 * @property {string} message - Message of the prompt
 */
interface IPrompts {
    role: string,
    message: string,
}

// Define the modal style
/**
 * Style object for the modal
 */
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column'
};

// Define the PromptModal component
/**
 * PromptModal component
 * @param {object} props - Component props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.handleClose - Function to close the modal
 */

const PromptModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
    // State to store prompts
    const [prompts, setPrompts] = useState<IPrompts[]>([]);

    // State to store user input
    const [userPrompt, setUserPrompt] = useState<string>("");

    // Method to generate AI response
    /**
     * Generate AI response based on user input
     */
    const handleGenerate = () => {
        // Check if user input is not empty
        if (userPrompt && userPrompt.length > 0) {
            // Create a new prompt with user input and AI response
            const data = [
                { role: "user", message: userPrompt },
                { role: "system", message: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask." }
            ];

            // Update prompts state
            setPrompts(prev => [...prev, ...data]);
        }

        // Reset user input
        setUserPrompt("");
    };

    // Method to insert AI response into text box
    /**
     * Insert AI response into text box
     */
    const handleInsert = () => {
        // Remove placeholder text
        const placeHolder = document.querySelector(".msg-form__placeholder");
        placeHolder?.remove();

        // Get text box element
        const textBox = document.querySelector(".msg-form__contenteditable");

        // Check if text box exists
        if (textBox) {
            // Insert AI response into text box
            textBox.textContent = prompts[prompts.length - 1]?.message;

            // Update cursor position
            const range = document.createRange();
            range.selectNodeContents(textBox);
            range.collapse(false);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        // Reset user input and prompts
        setUserPrompt("");
        setPrompts([]);

        // Close modal
        handleClose();
    };

    return (
        // Render the Modal component
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/* Container for modal content */}
            <Box sx={style}>
                {/* Render prompts */}
                {
                    prompts && prompts.length > 0 && prompts.map((prompt, index) =>
                        // Typography component for each prompt
                        <Typography
                            key={index}
                            sx={{ maxWidth: "max-content", alignSelf: prompt.role === "user" ? 'end' : 'start', fontSize: "14px", fontWeight: '400', color: "#666D80", bgcolor: prompt.role === "user" ? "#DFE1E7" : "#DBEAFE", padding: 1, paddingX: 2, marginBottom: 2, borderRadius: 2 }}
                        >
                            {prompt.message}
                        </Typography>
                    )
                }
                {/* User input field */}
                <input
                    type="text"
                    placeholder="Your prompt"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    style={{ fontSize: "14px", borderRadius: "6px", marginBottom: 2 }}
                />

                {/* Render buttons */}
                {prompts && prompts.length === 0 ?
                    // Generate button
                    <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <button
                            type="button"
                            onClick={handleGenerate}
                            style={{ backgroundColor: "#3B82F6", color: "#fff", fontSize: "14px", fontWeight: "600", borderRadius: 4, padding: 6, marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "112px", cursor: "pointer" }}
                        >
                            <img src={VectorIcon} alt="icon" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                            <span style={{ textAlign: "center" }}>Generate</span>
                        </button>
                    </div> :
                    // Insert and Regenerate buttons
                    <div style={{ display: 'flex', justifyContent: "flex-end", gap: 4 }}>
                        <button
                            type="button"
                            onClick={handleInsert}
                            style={{ color: "#666D80", border: "2px solid #666D80", fontSize: "14px", fontWeight: "600", borderRadius: 4, padding: 6, marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80px", cursor: "pointer", marginRight: 4 }}
                        >
                            <img src={InsertIcon} alt="icon" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            <span>Insert</span>
                        </button>
                        <button
                            type="button"
                            style={{ backgroundColor: "#3B82F6", color: "#fff", fontSize: "14px", fontWeight: "600", borderRadius: 4, padding: 6, marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "112px", cursor: "pointer" }}
                        >
                            <img src={RegenerateIcon} alt="icon" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            <span>Regenerate</span>
                        </button>
                    </div>
                }
            </Box>
        </Modal>
    );
};

export default PromptModal;

