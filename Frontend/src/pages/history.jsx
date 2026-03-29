
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

import { IconButton } from '@mui/material';
export default function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("[History] No token found in localStorage");
                    setMeetings([]);
                    return;
                }
                
                const history = await getHistoryOfUser();
                console.log("[History] Fetched history:", history);
                
                if (history && Array.isArray(history)) {
                    history.forEach((meeting, idx) => {
                        console.log(`[History] Meeting ${idx}:`, {
                            code: meeting.meetingCode,
                            date: meeting.date,
                            messageCount: meeting.messages?.length || 0
                        });
                    });
                    setMeetings(history);
                } else if (history) {
                    setMeetings([history]);
                } else {
                    console.log("[History] No history returned");
                    setMeetings([]);
                }
            } catch (err) {
                console.error("[History] Error fetching history:", err);
                setMeetings([]);
            }
        }

        fetchHistory();
    }, [])

    let formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }

    return (
        <div style={{ padding: '20px' }}>

            <IconButton onClick={() => {
                routeTo("/home")
            }} style={{ marginBottom: '20px' }}>
                <HomeIcon />
            </IconButton >
            {
                (meetings && Array.isArray(meetings) && meetings.length !== 0) ? meetings.map((e, i) => {
                    return (

                        <Card key={i} variant="outlined" style={{ marginBottom: '20px' }}>

                            <CardContent>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom>
                                    Meeting Code: {e.meetingCode}
                                </Typography>

                                <Typography sx={{ mb: 2 }} color="text.secondary">
                                    Date & Time: {formatDateTime(e.date)}
                                </Typography>

                                <Typography sx={{ fontSize: 14, fontWeight: 'bold', marginTop: '15px', marginBottom: '10px' }}>
                                    Messages: ({e.messages?.length || 0})
                                </Typography>

                                {e.messages && Array.isArray(e.messages) && e.messages.length > 0 ? (
                                    <Box sx={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e0e0e0', padding: '10px', borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                                        {e.messages.map((msg, msgIndex) => (
                                            <Box key={msgIndex} sx={{ marginBottom: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px', borderLeft: '3px solid #1976d2' }}>
                                                <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: '#1976d2' }}>
                                                    {msg.sender || "Unknown"}
                                                </Typography>
                                                <Typography sx={{ fontSize: 13, color: '#333', marginTop: '4px' }}>
                                                    {msg.data || "No message"}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                ) : (
                                    <Typography sx={{ fontSize: 13, color: 'text.secondary', fontStyle: 'italic' }}>
                                        No messages for this meeting
                                    </Typography>
                                )}
                            </CardContent>

                        </Card>

                    )
                }) : <Typography>No meeting history found</Typography>

            }

        </div>
    )
}
