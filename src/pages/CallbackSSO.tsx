import React, { useState } from 'react';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const client = new OAuth2Client({
    clientId: `${import.meta.env.VITE_CLIENT_ID}`,
    clientSecret: `${import.meta.env.VITE_SECRET_ID}`,
    redirectUri: "http://localhost:5173/auth/sso-response-callback",
});

function CallbackSSO() {
    const [userInfo, setUserInfo] = useState("");

    async function handleCallbackSSO() {
        const searchParams = new URLSearchParams(window.location.search);
        const code: any = searchParams.get('code');

        try {
        const tokenResponse = await client.getToken(code);
        const accessToken = tokenResponse.tokens.access_token;

        const res: any  = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }).then((response)=> {
            console.log("res", response.data)
            setUserInfo(response.data);
        })

        } catch (err) {
        console.error(err);
        }
    }

    return (
        <div>
        <button onClick={handleCallbackSSO}>Callback SSO</button>
        {userInfo && (
            <div>
            <p>Login success</p>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
            </div>
        )}
        </div>
        
    );
}
export default CallbackSSO