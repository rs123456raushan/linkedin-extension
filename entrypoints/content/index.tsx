// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import AIIcon from "@/assets/AI.svg"; // AI icon image
import PromptModal from "@/utils/PromptModal"; // PromptModal component

// Define a content script that matches LinkedIn pages
export default defineContentScript({
    matches: ["https://*.linkedin.com/*"],
    main(ctx) {
        // Create an integrated UI
        const ui = createIntegratedUi(ctx, {
            position: 'inline', // Position the UI inline
            onMount: handleUiMount, // Handle UI mount event
        });
        ui.mount(); // Mount the UI
    }
});

// Handle UI mount event
function handleUiMount() {
    // Create a mutation observer to detect changes in the DOM
    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, {
        childList: true, // Observe child elements
        subtree: true // Observe subtree
    });
}

// Handle mutations detected by the observer
async function handleMutations() {
    // Check if the container element already exists
    if (document.getElementById('container')) return;

    // Create a container element
    const container = document.createElement('div');
    container.id = 'container'; // Set container ID

    // Render the Content component inside the container
    if (container) {
        ReactDOM.createRoot(container!).render(
            <React.StrictMode>
                <Content />
            </React.StrictMode>,
        );
    }
}

// Define the Content component
const Content = () => {
    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    // Use effect to handle text box focus and blur events
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Get the text box element
            const textBox = document.querySelector(".msg-form__contenteditable");

            // If text box exists, add event listeners
            if (textBox) {
                textBox.addEventListener("focus", handleFocus); // Handle focus event
                textBox.addEventListener("blur", handleBlur); // Handle blur event
                clearInterval(intervalId); // Stop checking once the class is found
            }
        }, 1000); // Check every second

        // Clean up on unmount
        return () => clearInterval(intervalId);
    }, []);

    // Method to mount AI icon
    const handleFocus = () => {
        // Get the text box element
        const textBox = document.querySelector(".msg-form__contenteditable");

        // Create a container for the AI icon
        const container = document.createElement("div");
        container.className = "ai-icon";
        container.setAttribute("style", "position:absolute; bottom:0; right:1rem;");

        // Create the AI icon image
        const imgElement = document.createElement("img");
        imgElement.src = AIIcon;
        imgElement.alt = "ai-icon";
        imgElement.setAttribute("style", "width: 32px; height: 32px; cursor:pointer;");

        // Add click event listener to open modal
        imgElement.addEventListener("click", () => {
            setShowModal(true);
        });

        // Append the AI icon to the text box
        container.appendChild(imgElement);
        textBox?.appendChild(container);
    };

    // Method to unmount AI icon
    const handleBlur = () => {
        // Get the text box element
        const textBox = document.querySelector(".msg-form__contenteditable");

        // Get the AI icon container
        const container = textBox?.querySelector(".ai-icon");

        // Remove the AI icon container
        container?.remove();
    };

    // Render the component
    return (
        <div>
            {/* Render the PromptModal component */}
            <PromptModal open={showModal} handleClose={() => setShowModal(false)} />
        </div>
    );
};
