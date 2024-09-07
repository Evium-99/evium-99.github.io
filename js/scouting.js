import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://cwlpwogrvudkcjesaynb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHB3b2dydnVka2NqZXNheW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2NzU5OTAsImV4cCI6MjA0MTI1MTk5MH0.mpgEs6w4-rcDpq3A5Mq3B_0am5xGboSalhOt9a8vDpo');
const accordionData = document.getElementById("accordionData");
const submitAddMatchRequest = document.getElementById("submitAddMatchRequest");
// const = document.getElementById("");
const signOutButton = document.getElementById("signOutButton");
const exampleModalDefault = document.getElementById("exampleModalDefault");
const matchNotesData = document.getElementById("matchNotesData");
const validationServer04 = document.getElementById("validationServer04");
const validationServer01 = document.getElementById("validationServer01");
const validationServerP = document.getElementById("validationServerP");
const validationServerOp1 = document.getElementById("validationServerOp1");
const validationServerOp2 = document.getElementById("validationServerOp2");
const addMatchButton = document.getElementById("addMatchButton");
const closeAddMatchModalButton = document.getElementById("closeAddMatchModalButton");

async function getTableData() {
    supabase.from('CurrentMatchSchedule').select('*').then((response) => {
        return response;
    });
}
async function addRow(mn, pt, o1, o2, mthn, ar) {
    supabase.from('CurrentMatchSchedule').insert([{
        matchNumber: mn,
        partnerTeam: pt,
        opponentOne: o1,
        opponentTwo: o2,
        matchNotes: mthn,
        allianceRed: ar
    },]).select().then((info) => {
        console.log(info);
        if (info.status == 409) {
            alert("This match already exists!");
        }
    });
}

// async function login(un, pw) {
//     supabase.auth.signInWithPassword({email: un, password: pw}).then((stuff) => {
//         console.log(stuff);
//     });
// }

// Check if user is logged in and update session id if so
supabase.auth.getSession().then((authData) => {
    if (authData.data.session == null) {
        window.location.href = 'login.html';
    }
});

// Get Data and put it in the accordion
supabase.from('CurrentMatchSchedule').select('*').then((response) => {
    console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
        let allianceStuff;
        if (response.data[i].allianceRed) {
            allianceStuff = "<p class='h4'>Alliance Color: <span class='badge rounded-pill bg-danger'>Red</span></p>";
        } else {
            allianceStuff = "<p class='h4'>Alliance Color: <span class='badge rounded-pill bg-info'>Blue</span></p>";
        }
        let matchData = "<p class='h3'>You're teamed with: " + response.data[i].partnerTeam + "<br>Your opponents are: " + response.data[i].opponentOne + " & " + response.data[i].opponentTwo + "</p><br><p>" + response.data[i].matchNotes + "</p>" + allianceStuff;
        accordionData.innerHTML = accordionData.innerHTML + '<div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + response.data[i].id + '" aria-expanded="true" aria-controls="collapse' + response.data[i].id + '">Match: ' + response.data[i].matchNumber + '</button></h2><div id="collapse' + response.data[i].id + '" class="accordion-collapse collapse" data-bs-parent="#accordionData"><div class="accordion-body">' + matchData + '</div></div></div>';
    }
});

signOutButton.addEventListener("click", function() {
    supabase.auth.signOut().then((info) => {console.log(info)});
})

addMatchButton.addEventListener("click", function() {
    exampleModalDefault.style.display = "block";
});

closeAddMatchModalButton.addEventListener("click", function() {
    exampleModalDefault.style.display = "none";
});

submitAddMatchRequest.addEventListener("click", function() {
    let alliance;
    // Check if Alliance is selected
    if (validationServer04.value == "choose") {
        alert("Choose an Alliance!");
        alliance = true;
    } else {
        if (validationServer04.value == "true") {
            alliance = true;
        } else if (validationServer04.value == "false") {
            alliance = false;
        }
        // Validate Numbers
        if (Number(validationServer01.value) == NaN) {
            alert("Match number must be number");
        } else if ((Number(validationServer01.value) < 0) ||(Number(validationServer01.value) > 99999)) {
            alert("Invalid Match Number!");
        } else {
            if (Number(validationServerP.value) == NaN) {
                alert("Partner team number must be number");
            } else if ((Number(validationServerP.value) < 0) ||(Number(validationServerP.value) > 99999)) {
                alert("Invalid partner team Number!");
            } else {
                if (Number(validationServerOp1.value) == NaN) {
                    alert("Opponent 1 team number must be number");
                } else if ((Number(validationServerOp1.value) < 0) ||(Number(validationServerOp1.value) > 99999)) {
                    alert("Invalid Opponent 1 team Number!");
                } else {
                    if (Number(validationServerOp2.value) == NaN) {
                        alert("Opponent 2 team number must be number");
                    } else if ((Number(validationServerOp2.value) < 0) ||(Number(validationServerOp2.value) > 99999)) {
                        alert("Invalid Opponent 2 team Number!");
                    } else {
                        if ((validationServerP.value == validationServerOp1.value) || (validationServerOp1.value == validationServerOp2.value) || (validationServerOp2.value == validationServerP.value)) {
                            alert("You cannot compete against your partner. You cannot have two of the same opponents.");
                        } else {
                            // Submit Numbers
                            addRow(
                                validationServer01.value,
                                validationServerP.value,
                                validationServerOp1.value,
                                validationServerOp2.value,
                                matchNotesData.value, alliance
                            );
                            
                            // Close Modal
                            exampleModalDefault.style.display = "none";
                        }
                    }
                }
            }
        }
    }
});
