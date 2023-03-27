// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { google } from 'googleapis';


// interface CustomWindow extends Window, typeof globalThis => void { 
//     google: any;
// }
// const exchangeCodeForToken = async (code: string) => {
//     const clientId = '388694033625-kgoqddepu8ugthv6b1spnr29ipjqei6i.apps.googleusercontent.com'; // Replace with your actual Google API client ID
//     const clientSecret = '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'; // Replace with your actual Google API client secret
//     const redirectUri = 'http://localhost:5173/auth/sso-response-callback'; // Replace with your actual redirect URI
//     let oauth2Client;
//     if (typeof window !== 'undefined') {
//         oauth2Client = new (window as CustomWindow).google.auth.OAuth2(
//             clientId,
//             clientSecret,
//             redirectUri
//         );;
//     } else {
//         // Handle running in a Node.js environment
//     }
    
//     const { tokens } = await oauth2Client.getToken(code);
//     return tokens.access_token;
// };

// const getUserInfo = async (accessToken: string) => {
//     const url = 'https://www.googleapis.com/oauth2/v2/userinfo?fields=email,verified_email,picture';
//     const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     const data = await response.data;
//     return data;
// };


// const CallbackSSO = () => {
//     const location = useLocation();

//     useEffect(() => {
//         const searchParams = new URLSearchParams(location.search);
//         const code = searchParams.get('code');
//         if (code) {
//         exchangeCodeForToken(code)
//             .then(getUserInfo)
//             .then((userInfo) => {
//             const { email, verified_email, picture } = userInfo;
//             console.log('email:', email);
//             console.log('verified_email:', verified_email);
//             console.log('picture:', picture);
//             })
//             .catch((error) => {
//             console.error(error);
//             });
//         }
//     }, [location.search]);


//     return (
//         <div>Query parameter value:</div>
//     )
// }

// export default CallbackSSO;
