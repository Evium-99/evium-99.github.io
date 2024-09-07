import { createClient } from '/@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://cwlpwogrvudkcjesaynb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHB3b2dydnVka2NqZXNheW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2NzU5OTAsImV4cCI6MjA0MTI1MTk5MH0.mpgEs6w4-rcDpq3A5Mq3B_0am5xGboSalhOt9a8vDpo');
const signinButton = document.getElementById("signinButton");
const usernameElement = document.getElementById("usernameElement");
const passwordElement = document.getElementById("passwordElement");

// Check if user is logged in and update session id if so
supabase.auth.getSession().then((authData) => {
    if (authData.data.session != null) {
        window.location.href = 'scouting.html';
    }
});

signinButton.addEventListener("click", function() {
    supabase.auth.signInWithPassword({email: usernameElement.value, password: passwordElement.value})
});
