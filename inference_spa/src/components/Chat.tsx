/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IMessageProps, Message } from './Message';
import { Configuration, InferenceApi, Request } from 'InferenceSPA/api';
import { v4 as uuidV4 } from 'uuid';

/**
 * Creates the chat component. The chat component is a box that contains a list of messages exchanged, and a text field
 * to send new messages.
 * @returns A JSX.Element representing the chat component.
 */
export default function Chat(): React.JSX.Element {
    // Names of chat participants.
    const aiName: string = 'AI';
    const humanName: string = 'Human';

    // The configuration for the inference API client.
    const apiConfig = new Configuration({basePath: 'https://localhost:44393'});
    // The inference API client.
    const inferenceApi = new InferenceApi(apiConfig);

    // The message that is currently being typed, which will be sent when the user presses the send button or hits the
    // enter key.
    const [activeMessageText, setActiveMessageText] = React.useState<string>('');
    // The list of messages that have been sent and received.
    const [messages, setMessages] = React.useState<IMessageProps[]>([]);
    // Indicates whether the chat is waiting for a response from the AI.
    const [waitingForResponse, setWaitingForResponse] = React.useState<boolean>(false);

    /**
     * Posts a message to the chat feed.
     * @param postSender A string representing the sender of the message.
     * @param postMessage A string representing the message.
     * @returns void
     */
    function postMessage(postSender: string, postMessage: string): void {
        setMessages((prevMessages) => [
            ...prevMessages,
            {sender: postSender, message: postMessage, humanName: humanName, id: uuidV4()}
        ]);
    }

    /**
     * Posts a message from the AI to the chat feed.
     * @param postAiMessage A string representing the message.
     * @returns void
     */
    function postAiMessage(postAiMessage: string): void {
        postMessage(aiName, postAiMessage);
    }

    /**
     * Posts a message from the user to the chat feed. If the message from the text field is not empty, it is sent.
     * @returns A promise that resolves when the message has been sent.
     */
    async function postUserMessage(): Promise<void> {
        if (activeMessageText === '' || activeMessageText.trim() === '') {
            return;
        }

        postMessage(humanName, activeMessageText);
        setActiveMessageText('');

        const response = await sendRequest({text: activeMessageText});
        postAiMessage(response);
        setActiveMessageText('');
    }

    /**
     * Sends a request to the inference API.
     * @param request A Request representing the request to send.
     * @returns A promise that resolves when the request has been sent.
     */
    async function sendRequest(request: Request): Promise<string> {
        setWaitingForResponse(true);
        try {
            const response = await inferenceApi.inferencePost(request);
            return response.data.text ?? '';
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setWaitingForResponse(false);
        }
    }

    /**
     * Handles the click event for the send button. If the user clicks the button, the message is sent.
     * @returns void
     */
    function clickHandler(): void {
        postUserMessage()
            .then();
    }

    /**
     * Handles the key down event for the text field. If the user presses the enter key, the message is sent.
     * @param event The key down event.
     * @returns void
     */
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (!(event.key === 'Enter' && !event.shiftKey)) {
            return;
        }

        // Prevent the default action to stop adding a new line.
        event.preventDefault();
        postUserMessage()
            .then();
    }

    return (
        <Box data-testid='chat-feed-box' sx={{pb: '3.5rem', pt: '1rem'}} height='100vh' display='flex'
             flexDirection='column' flex={1} overflow='auto'>
            <Box data-testid='chat-messages-box' id='messages' flex={1} overflow='auto'>
                {messages.map((message) => (
                    <Message key={message.id} id={message.id} sender={message.sender} message={message.message}
                             humanName={message.humanName}/>
                ))}
            </Box>
            <TextField data-testid='chat-textfield'
                       inputRef={textFieldRef => textFieldRef?.focus()}
                       id='human-message'
                       label={waitingForResponse ? 'Waiting for response...' : 'Ask something...'}
                       sx={{bottom: 0}}
                       disabled={waitingForResponse}
                       fullWidth={true}
                       multiline
                       onChange={(
                           event) =>
                           setActiveMessageText(event.target.value
                           )}
                       onKeyDown={handleKeyDown}
                       rows={4}
                       value={activeMessageText}
                       variant='filled'
                       slotProps={{
                           input: {
                               endAdornment: (
                                   <InputAdornment position='end'>
                                       <IconButton data-testid='chat-sendbutton' onClick={clickHandler}>
                                           <SendIcon/>
                                       </IconButton>
                                   </InputAdornment>
                               ),
                           },
                           htmlInput: {'data-testid': 'chat-textfield-input'}
                       }}
            />
        </Box>
    );
}